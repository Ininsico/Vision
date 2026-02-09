import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class VisionAIService {
    constructor() {
        this.hfToken = process.env.HF_TOKEN;
        this.modelUrl = process.env.HF_MODEL_URL;
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
            const {
                height = 1024,
                width = 1024,
                num_inference_steps = 4,
                guidance_scale = 3.5,
                negativePrompt = ''
            } = parameters;

            console.log(`🎨 Generating image with Vision AI...`);
            console.log(`📝 Prompt: ${prompt}`);

            // Prepare request payload
            const payload = {
                inputs: prompt,
                parameters: {
                    height,
                    width,
                    num_inference_steps,
                    guidance_scale
                }
            };

            // Add negative prompt if provided
            if (negativePrompt) {
                payload.parameters.negative_prompt = negativePrompt;
            }

            // Call Hugging Face API
            const response = await axios.post(
                this.modelUrl,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${this.hfToken}`,
                        'Content-Type': 'application/json'
                    },
                    responseType: 'arraybuffer',
                    timeout: 60000 // 60 second timeout
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
                    height,
                    width,
                    steps: num_inference_steps,
                    guidanceScale: guidance_scale
                }
            };

        } catch (error) {
            console.error('❌ Vision AI generation error:', error.message);

            // Handle specific errors
            if (error.response) {
                throw new Error(`Vision AI API error: ${error.response.status} - ${error.response.statusText}`);
            } else if (error.code === 'ECONNABORTED') {
                throw new Error('Vision AI generation timeout - please try again');
            } else {
                throw new Error(`Vision AI generation failed: ${error.message}`);
            }
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
