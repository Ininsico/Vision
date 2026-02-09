import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class VisionAIService {
    constructor() {
        this.uploadsDir = path.join(__dirname, '../../uploads');

        // Ensure uploads directory exists
        if (!fs.existsSync(this.uploadsDir)) {
            fs.mkdirSync(this.uploadsDir, { recursive: true });
        }
    }

    /**
     * Generate image using Vision AI (Hugging Face FLUX model)
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
                throw new Error('Missing Hugging Face credentials in .env');
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

            // Prepare request payload matching the Python script structure
            const payload = {
                inputs: prompt,
                parameters: {
                    height: heightNum,
                    width: widthNum,
                    num_inference_steps: stepsNum,
                    guidance_scale: guidanceNum
                }
            };

            // Only add negative prompt if the model supports it (FLUX-schnell might not, but let's keep optional)
            // But let's log the payload to be sure
            console.log('📦 Sending payload:', JSON.stringify(payload, null, 2));

            // Call Hugging Face API
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

            // Save image to disk
            fs.writeFileSync(filepath, response.data);

            console.log(`✅ Image generated successfully: ${filename}`);

            return {
                success: true,
                filename,
                filepath,
                url: `/uploads/${filename}`,
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

            // If we have an error response with data (Buffer), decode it to see the real error
            if (error.response && error.response.data) {
                try {
                    // Convert buffer to string
                    const rawError = error.response.data.toString('utf8');
                    console.error('🔴 Raw API Error Response:', rawError);

                    // Try to parse if it's JSON
                    const errorJson = JSON.parse(rawError);
                    if (errorJson.error) {
                        errorMessage = `API Error: ${errorJson.error}`;
                    } else {
                        errorMessage = `API Error: ${rawError}`;
                    }
                } catch (e) {
                    errorMessage = `API Error: ${error.response.statusText} (Could not parse error body)`;
                }
            }

            console.error('❌ Vision AI generation error:', errorMessage);

            throw new Error(errorMessage);
        }
    }

    /**
     * Delete image file
     * @param {string} filename - Image filename to delete
     */
    deleteImage(filename) {
        try {
            const filepath = path.join(this.uploadsDir, filename);
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
                console.log(`🗑️  Deleted image: ${filename}`);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting image:', error);
            return false;
        }
    }

    /**
     * Get image file path
     * @param {string} filename - Image filename
     */
    getImagePath(filename) {
        return path.join(this.uploadsDir, filename);
    }
}

// Export singleton instance
export default new VisionAIService();
