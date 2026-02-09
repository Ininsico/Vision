import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Code, Zap, Shield, Sparkles, Copy, Check, ChevronRight, Terminal, FileCode } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Docs = () => {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const copyToClipboard = (code: string, id: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const sections = [
        {
            id: 'model-architecture',
            title: 'Model Architecture',
            icon: Sparkles,
            content: [
                {
                    subtitle: 'Transformer-Based Diffusion Model',
                    description: 'Vision AI is built on a state-of-the-art latent diffusion architecture with transformer-based attention mechanisms.',
                    code: `Architecture Overview:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Text Encoder: CLIP ViT-L/14 (768-dim embeddings)
• Diffusion Model: U-Net with cross-attention layers
• Latent Space: 512x512 → 64x64 compressed representation
• Denoising Steps: 50 iterations (configurable)
• Guidance Scale: 7.5 (classifier-free guidance)
• VAE Decoder: Converts latent → high-res output

Training Dataset:
• 600M+ text-image pairs
• Diverse artistic styles and photorealistic content
• Filtered for quality and ethical considerations`,
                },
            ],
        },
        {
            id: 'training-process',
            title: 'Training & Optimization',
            icon: Zap,
            content: [
                {
                    subtitle: 'How Vision AI Learns',
                    description: 'Our model is trained using advanced deep learning techniques to understand the relationship between text and visual concepts.',
                    code: `Training Pipeline:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Text Processing
   → Tokenization with CLIP text encoder
   → Contextual embeddings extraction
   → Semantic feature mapping

2. Image Encoding
   → VAE compression to latent space
   → Noise scheduling (linear/cosine)
   → Progressive corruption

3. Denoising Training
   → U-Net predicts noise at each step
   → Cross-attention with text embeddings
   → Loss: MSE between predicted & actual noise

4. Optimization
   → AdamW optimizer (lr: 1e-4)
   → Mixed precision training (FP16)
   → Gradient checkpointing for memory efficiency`,
                },
                {
                    subtitle: 'Fine-Tuning & Specialization',
                    description: 'The model can be fine-tuned for specific artistic styles or domains.',
                    code: `Fine-Tuning Capabilities:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Style Transfer: Train on specific art styles
• Domain Adaptation: Specialize for industries
• LoRA Adapters: Lightweight customization
• DreamBooth: Personalized subject generation
• Textual Inversion: Custom concept embedding`,
                },
            ],
        },
        {
            id: 'api-access',
            title: 'API Access',
            icon: Shield,
            content: [
                {
                    subtitle: 'Request API Credentials',
                    description: 'Vision AI is currently in controlled beta. To request API access, contact us at ininsico@gmail.com with your use case.',
                    code: `Email Template for API Request:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
To: ininsico@gmail.com
Subject: Vision AI API Access Request

Hello Vision AI Team,

I would like to request API access for the following:

• Name/Organization: [Your Name/Company]
• Use Case: [Describe your intended application]
• Expected Volume: [Estimated requests/month]
• Technical Background: [Brief description]

Thank you for considering my request.

Best regards,
[Your Name]`,
                },
                {
                    subtitle: 'API Integration (Once Approved)',
                    description: 'After approval, you will receive API credentials and endpoint documentation.',
                    code: `// Example API usage (credentials required)
const response = await fetch('https://api.vision-ai.com/v1/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: "A serene mountain landscape at sunset",
    width: 1024,
    height: 1024,
    steps: 50,
    guidance_scale: 7.5
  })
});

const data = await response.json();
console.log(data.image_url);`,
                },
            ],
        },
        {
            id: 'technical-specs',
            title: 'Technical Specifications',
            icon: Code,
            content: [
                {
                    subtitle: 'Model Capabilities',
                    description: 'Detailed specifications of what Vision AI can achieve.',
                    code: `Performance Metrics:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Resolution: Up to 2048x2048 pixels
• Generation Time: 8-15 seconds (depending on steps)
• Batch Processing: Up to 4 images per request
• Styles Supported: Photorealistic, Artistic, Abstract
• Aspect Ratios: Square, Portrait, Landscape
• Negative Prompts: Supported for refinement
• Seed Control: Reproducible generations

Supported Parameters:
• prompt (required): Text description
• negative_prompt: What to avoid
• width/height: Output dimensions
• steps: Denoising iterations (20-150)
• guidance_scale: Prompt adherence (1-20)
• seed: Random seed for reproducibility`,
                },
            ],
        },
    ];

    const quickLinks = [
        { title: 'Model Architecture', href: '#model-architecture' },
        { title: 'Training Process', href: '#training-process' },
        { title: 'API Access', href: '#api-access' },
        { title: 'Technical Specs', href: '#technical-specs' },
    ];

    return (
        <div className="min-h-screen bg-primary-50 pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center space-x-2 bg-peach-100 text-peach-700 px-4 py-2 rounded-full mb-6 font-medium text-sm">
                        <Book size={16} />
                        <span>Documentation</span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-bold text-primary-900 mb-6 font-display">
                        Vision AI <span className="gradient-text">Docs</span>
                    </h1>
                    <p className="text-xl text-primary-700 max-w-2xl mx-auto">
                        Everything you need to integrate Vision's powerful text-to-image AI into your applications.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <div className="sticky top-32 card">
                            <h3 className="text-lg font-bold text-primary-900 mb-4 font-display">
                                Quick Links
                            </h3>
                            <nav className="space-y-2">
                                {quickLinks.map((link) => (
                                    <a
                                        key={link.title}
                                        href={link.href}
                                        className="flex items-center space-x-2 text-primary-700 hover:text-peach-600 transition-colors py-2 px-3 rounded-lg hover:bg-primary-100 group"
                                    >
                                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        <span>{link.title}</span>
                                    </a>
                                ))}
                            </nav>

                            <div className="mt-8 p-4 bg-gradient-to-br from-peach-500 to-peach-600 rounded-2xl text-white">
                                <Terminal size={24} className="mb-2" />
                                <h4 className="font-bold mb-2 font-display">Need Help?</h4>
                                <p className="text-sm text-peach-50 mb-3">
                                    Join our community for support and updates.
                                </p>
                                <Button size="sm" className="bg-white text-peach-600 hover:bg-primary-50 w-full">
                                    Join Discord
                                </Button>
                            </div>
                        </div>
                    </motion.aside>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-12">
                        {sections.map((section, sectionIndex) => (
                            <motion.section
                                key={section.id}
                                id={section.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 + sectionIndex * 0.1 }}
                                className="card"
                            >
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-peach-500 to-peach-600 flex items-center justify-center">
                                        <section.icon className="text-white" size={24} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-primary-900 font-display">
                                        {section.title}
                                    </h2>
                                </div>

                                <div className="space-y-8">
                                    {section.content.map((item, itemIndex) => (
                                        <div key={itemIndex} className="space-y-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-primary-900 mb-2 font-display flex items-center">
                                                    <FileCode size={20} className="mr-2 text-peach-600" />
                                                    {item.subtitle}
                                                </h3>
                                                <p className="text-primary-700">{item.description}</p>
                                            </div>

                                            <div className="relative">
                                                <div className="absolute top-4 right-4 z-10">
                                                    <button
                                                        onClick={() => copyToClipboard(item.code, `${section.id}-${itemIndex}`)}
                                                        className="p-2 bg-primary-800 hover:bg-primary-700 text-white rounded-lg transition-colors"
                                                        aria-label="Copy code"
                                                    >
                                                        {copiedCode === `${section.id}-${itemIndex}` ? (
                                                            <Check size={18} />
                                                        ) : (
                                                            <Copy size={18} />
                                                        )}
                                                    </button>
                                                </div>
                                                <pre className="bg-primary-900 text-primary-50 p-6 rounded-2xl overflow-x-auto">
                                                    <code className="text-sm font-mono">{item.code}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        ))}

                        {/* Additional Resources */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="grid md:grid-cols-2 gap-6"
                        >
                            <div className="card bg-gradient-to-br from-primary-100 to-peach-50 border-2 border-peach-200">
                                <Code size={32} className="text-peach-600 mb-4" />
                                <h3 className="text-xl font-bold text-primary-900 mb-2 font-display">
                                    API Playground
                                </h3>
                                <p className="text-primary-700 mb-4">
                                    Test our API endpoints directly in your browser with interactive examples.
                                </p>
                                <Button variant="outline" size="sm">
                                    Try Playground
                                    <ChevronRight size={16} className="ml-2" />
                                </Button>
                            </div>

                            <div className="card bg-gradient-to-br from-primary-100 to-peach-50 border-2 border-peach-200">
                                <Book size={32} className="text-peach-600 mb-4" />
                                <h3 className="text-xl font-bold text-primary-900 mb-2 font-display">
                                    Tutorials
                                </h3>
                                <p className="text-primary-700 mb-4">
                                    Step-by-step guides to help you build amazing applications with Vision AI.
                                </p>
                                <Button variant="outline" size="sm">
                                    View Tutorials
                                    <ChevronRight size={16} className="ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Docs;
