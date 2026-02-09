import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wand2, Download, Loader2, Settings } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { generationAPI, setAuthToken } from '../services/api';
import { Button } from '../components/ui/Button';

const Generate = () => {
    const { getToken, isSignedIn } = useAuth();
    const [prompt, setPrompt] = useState('');
    const [negativePrompt, setNegativePrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<any>(null);
    const [error, setError] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Advanced parameters
    const [width, setWidth] = useState(1024);
    const [height, setHeight] = useState(1024);
    const [steps, setSteps] = useState(4);
    const [guidanceScale, setGuidanceScale] = useState(3.5);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt');
            return;
        }

        if (!isSignedIn) {
            setError('Please sign in to generate images');
            return;
        }

        setIsGenerating(true);
        setError('');
        setGeneratedImage(null);

        try {
            // Get Clerk token
            const token = await getToken();
            setAuthToken(token);

            // Generate image
            const result = await generationAPI.generate(prompt, negativePrompt, {
                width,
                height,
                num_inference_steps: steps,
                guidance_scale: guidanceScale
            });

            setGeneratedImage(result.generation);
        } catch (err: any) {
            console.error('Generation error:', err);
            setError(err.response?.data?.message || 'Failed to generate image. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownload = () => {
        if (generatedImage) {
            const link = document.createElement('a');
            link.href = `http://localhost:5000${generatedImage.imageUrl}`;
            link.download = `vision_${generatedImage.id}.png`;
            link.click();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-peach-50 py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-primary-900 mb-4 font-display">
                        Create with <span className="gradient-text">Vision AI</span>
                    </h1>
                    <p className="text-xl text-primary-600 max-w-2xl mx-auto">
                        Transform your ideas into stunning visuals using our advanced AI model
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="card">
                            <h2 className="text-2xl font-bold text-primary-900 mb-4 font-display flex items-center">
                                <Wand2 className="mr-2" size={24} />
                                Describe Your Vision
                            </h2>

                            {/* Prompt Input */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-primary-900 mb-2">
                                    Prompt *
                                </label>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="A majestic dragon flying over mountains at sunset, digital art, highly detailed..."
                                    className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:border-peach-500 focus:outline-none resize-none text-primary-900"
                                    rows={4}
                                />
                            </div>

                            {/* Negative Prompt */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-primary-900 mb-2">
                                    Negative Prompt (Optional)
                                </label>
                                <textarea
                                    value={negativePrompt}
                                    onChange={(e) => setNegativePrompt(e.target.value)}
                                    placeholder="blurry, low quality, distorted..."
                                    className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:border-peach-500 focus:outline-none resize-none text-primary-900"
                                    rows={2}
                                />
                            </div>

                            {/* Advanced Settings Toggle */}
                            <button
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="flex items-center text-peach-600 hover:text-peach-700 font-semibold mb-4"
                            >
                                <Settings size={18} className="mr-2" />
                                {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
                            </button>

                            {/* Advanced Settings */}
                            {showAdvanced && (
                                <div className="space-y-4 p-4 bg-primary-50 rounded-xl mb-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-primary-900 mb-2">
                                                Width: {width}px
                                            </label>
                                            <input
                                                type="range"
                                                min="512"
                                                max="1024"
                                                step="64"
                                                value={width}
                                                onChange={(e) => setWidth(parseInt(e.target.value))}
                                                className="w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-primary-900 mb-2">
                                                Height: {height}px
                                            </label>
                                            <input
                                                type="range"
                                                min="512"
                                                max="1024"
                                                step="64"
                                                value={height}
                                                onChange={(e) => setHeight(parseInt(e.target.value))}
                                                className="w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-primary-900 mb-2">
                                                Steps: {steps}
                                            </label>
                                            <input
                                                type="range"
                                                min="1"
                                                max="8"
                                                step="1"
                                                value={steps}
                                                onChange={(e) => setSteps(parseInt(e.target.value))}
                                                className="w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-primary-900 mb-2">
                                                Guidance: {guidanceScale}
                                            </label>
                                            <input
                                                type="range"
                                                min="1"
                                                max="10"
                                                step="0.5"
                                                value={guidanceScale}
                                                onChange={(e) => setGuidanceScale(parseFloat(e.target.value))}
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Generate Button */}
                            <Button
                                onClick={handleGenerate}
                                disabled={isGenerating || !prompt.trim()}
                                className="w-full"
                                size="lg"
                                variant="primary"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="mr-2 animate-spin" size={20} />
                                        Generating... (8-15s)
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2" size={20} />
                                        Generate Image
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Tips */}
                        <div className="card bg-gradient-to-br from-peach-50 to-primary-50">
                            <h3 className="font-bold text-primary-900 mb-3">💡 Pro Tips</h3>
                            <ul className="space-y-2 text-sm text-primary-700">
                                <li>• Be specific and descriptive in your prompts</li>
                                <li>• Mention art style (e.g., "digital art", "oil painting")</li>
                                <li>• Add quality keywords like "highly detailed", "4k"</li>
                                <li>• Use negative prompts to avoid unwanted elements</li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Output Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="card"
                    >
                        <h2 className="text-2xl font-bold text-primary-900 mb-4 font-display">
                            Generated Image
                        </h2>

                        <div className="aspect-square bg-primary-50 rounded-2xl flex items-center justify-center overflow-hidden">
                            {isGenerating ? (
                                <div className="text-center">
                                    <Loader2 className="w-16 h-16 text-peach-500 animate-spin mx-auto mb-4" />
                                    <p className="text-primary-600 font-medium">Creating your masterpiece...</p>
                                    <p className="text-sm text-primary-500 mt-2">This usually takes 8-15 seconds</p>
                                </div>
                            ) : generatedImage ? (
                                <img
                                    src={`http://localhost:5000${generatedImage.imageUrl}`}
                                    alt={generatedImage.prompt}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="text-center p-8">
                                    <Sparkles className="w-16 h-16 text-primary-300 mx-auto mb-4" />
                                    <p className="text-primary-600 font-medium">Your generated image will appear here</p>
                                </div>
                            )}
                        </div>

                        {generatedImage && (
                            <div className="mt-4 space-y-3">
                                <div className="p-3 bg-primary-50 rounded-xl">
                                    <p className="text-sm text-primary-600 font-medium mb-1">Prompt:</p>
                                    <p className="text-sm text-primary-900">{generatedImage.prompt}</p>
                                </div>

                                <Button
                                    onClick={handleDownload}
                                    className="w-full"
                                    variant="outline"
                                >
                                    <Download className="mr-2" size={18} />
                                    Download Image
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Generate;
