import axios from 'axios';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class VisionAIService {
    constructor() {
        try {
            // Try to use persistent storage if available (local dev)
            this.uploadsDir = path.join(__dirname, '../../uploads');
            if (!fs.existsSync(this.uploadsDir)) {
                fs.mkdirSync(this.uploadsDir, { recursive: true });
            }
        } catch (error) {
            // Fallback to temp directory for serverless environments (Vercel)
            console.warn('⚠️ Cannot write to local uploads dir, using temp dir:', error.message);
            this.uploadsDir = os.tmpdir();
        }
    }

    /**
     * Generate image using Custom AI Model
     * @param {string} prompt - Text description for image generation
     * @param {object} parameters - Generation parameters
     * @returns {Promise<object>} Generated image data
     */
    async generateImage(prompt, parameters = {}) {
        try {
            // Get credentials lazily (to ensure dotenv has loaded)
            const hfToken = process.env.HF_TOKEN;
            const modelUrl = process.env.HF_MODEL_URL;

            if (!hfToken || !modelUrl) {
                // For development without API keys, return mock data if configured
                if (process.env.NODE_ENV === 'development') {
                    console.warn('⚠️ Missing API keys, returning mock success for development');
                    return {
                        success: true,
                        filename: 'mock-image.png',
                        url: 'https://placehold.co/1024x1024/png', // Sentinel value
                        parameters
                    };
                }
                throw new Error('Missing Custom/Hugging Face credentials in .env');
            }

            const {
                height = 1024,
                width = 1024,
                num_inference_steps = 4,
                guidance_scale = 3.5,
                negativePrompt = ''
            } = parameters;

            console.log(`🎨 Generating image with Vision AI...`);
            console.log(`📝 Prompt: ${prompt}`);

            // Ensure parameters are numbers
            const widthNum = parseInt(width);
            const heightNum = parseInt(height);
            const stepsNum = parseInt(num_inference_steps);
            const guidanceNum = parseFloat(guidance_scale);

            console.log(`🎨 Parameters: ${widthNum}x${heightNum}, Steps: ${stepsNum}, Guidance: ${guidanceNum}`);

            // Prepare request payload matching the model API structure
            const payload = {
                inputs: prompt,
                parameters: {
                    height: heightNum,
                    width: widthNum,
                    num_inference_steps: stepsNum,
                    guidance_scale: guidanceNum,
                    negative_prompt: negativePrompt
                }
            };

            console.log('📦 Sending payload:', JSON.stringify(payload, null, 2));

            // Call AI API
            const response = await axios.post(
                modelUrl,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${hfToken}`,
                        'Content-Type': 'application/json',
                        'Accept': 'image/png'
                    },
                    responseType: 'arraybuffer', // We need this for the image data
                    timeout: 60000
                }
            );

            if (response.status !== 200) {
                throw new Error(`Vision AI API returned status ${response.status}`);
            }

            // Generate unique filename
            const timestamp = Date.now();
            const randomStr = Math.random().toString(36).substring(7);
            const filename = `vision_${timestamp}_${randomStr}.png`;
            const filepath = path.join(this.uploadsDir, filename);

            // Save image to temp disk
            fs.writeFileSync(filepath, response.data);

            console.log(`✅ Image generated successfully: ${filename}`);

            // Convert to Base64 Data URI for immediate persistence & display
            // This bypasses the need for persistent local storage or S3 on Vercel
            const imageBuffer = fs.readFileSync(filepath);
            const base64Image = Buffer.from(imageBuffer).toString('base64');
            const dataURI = `data:image/png;base64,${base64Image}`;

            // Clean up temp file to free resources
            try {
                fs.unlinkSync(filepath);
            } catch (e) {
                console.warn('⚠️ Failed to cleanup temp file:', e.message);
            }

            return {
                success: true,
                filename,
                // Return Data URI to use as the image source directly
                url: dataURI,
                size: response.data.length,
                parameters: {
                    height: heightNum,
                    width: widthNum,
                    steps: stepsNum,
                    guidanceScale: guidanceNum
                }
            };

        } catch (error) {
            let errorMessage = error.message;

            // comprehensive error handling for API responses
            if (error.response && error.response.data) {
                try {
                    const rawError = error.response.data.toString('utf8');
                    console.error('🔴 Raw API Error Response:', rawError);

                    try {
                        const errorJson = JSON.parse(rawError);
                        errorMessage = errorJson.error || `API Error: ${rawError}`;
                    } catch {
                        errorMessage = `API Error: ${rawError}`;
                    }
                } catch (e) {
                    errorMessage = `API Error: ${error.response.statusText}`;
                }
            }

            console.error('❌ Vision AI generation error:', errorMessage);
            throw new Error(errorMessage);
        }
    }

    /**
     * Delete image file (unused in Base64 mode but kept for interface compatibility)
     * @param {string} filename 
     */
    deleteImage(filename) {
        // No-op for Base64 storage
        return true;
    }

    /**
     * Get image file path (unused in Base64 mode)
     */
    getImagePath(filename) {
        return path.join(this.uploadsDir, filename);
    }
}

// Export singleton instance
export default new VisionAIService();
