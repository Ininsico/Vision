import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Image as ImageIcon, Palette, Wand2, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Home = () => {
    const features = [
        {
            icon: Sparkles,
            title: 'AI-Powered Generation',
            description: 'Advanced neural networks transform your text into stunning, high-quality images in seconds.',
        },
        {
            icon: Zap,
            title: 'Lightning Fast',
            description: 'Get your images generated in under 10 seconds with our optimized infrastructure.',
        },
        {
            icon: Palette,
            title: 'Artistic Styles',
            description: 'Choose from various artistic styles and customize your output to match your vision.',
        },
        {
            icon: ImageIcon,
            title: 'High Resolution',
            description: 'Generate images up to 4K resolution perfect for professional use and printing.',
        },
    ];

    const useCases = [
        'Marketing & Advertising',
        'Social Media Content',
        'Book Illustrations',
        'Product Mockups',
        'Concept Art',
        'NFT Creation',
    ];

    const stats = [
        { value: 'Beta', label: 'Development Stage' },
        { value: '2048px', label: 'Max Resolution' },
        { value: '8-15s', label: 'Generation Time' },
        { value: 'CLIP', label: 'Text Encoder' },
    ];

    return (
        <div className="min-h-screen bg-primary-50">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-peach-300/20 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="inline-flex items-center space-x-2 bg-peach-100 text-peach-700 px-4 py-2 rounded-full mb-6 font-medium text-sm"
                        >
                            <Wand2 size={16} />
                            <span>Powered by Advanced AI Technology</span>
                        </motion.div>

                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 font-display">
                            <span className="gradient-text">Imagine.</span>
                            <br />
                            <span className="text-primary-900">Create. Inspire.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-primary-700 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Transform your words into breathtaking visuals with Vision's transformer-based diffusion model.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/generate">
                                <Button size="lg" variant="primary" className="group">
                                    <Sparkles size={20} className="mr-2" />
                                    Start Creating
                                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link to="/docs">
                                <Button size="lg" variant="outline">
                                    View Documentation
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-4xl md:text-5xl font-bold text-peach-600 mb-2 font-display">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-primary-600 font-medium">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl md:text-6xl font-bold text-primary-900 mb-4 font-display">
                            Powerful Features
                        </h2>
                        <p className="text-xl text-primary-600 max-w-2xl mx-auto">
                            Everything you need to bring your creative vision to life
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card group cursor-pointer"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-peach-500 to-peach-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <feature.icon className="text-white" size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-primary-900 mb-3 font-display">
                                    {feature.title}
                                </h3>
                                <p className="text-primary-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="py-20 px-6 bg-gradient-to-br from-primary-100 to-peach-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-5xl md:text-6xl font-bold text-primary-900 mb-6 font-display">
                                Perfect for Every Creator
                            </h2>
                            <p className="text-xl text-primary-700 mb-8 leading-relaxed">
                                Whether you're a designer, marketer, artist, or entrepreneur, Vision empowers you to create stunning visuals for any purpose.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {useCases.map((useCase, index) => (
                                    <motion.div
                                        key={useCase}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center space-x-3"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-peach-500 flex items-center justify-center flex-shrink-0">
                                            <Check size={14} className="text-white" />
                                        </div>
                                        <span className="text-primary-800 font-medium">{useCase}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-3xl bg-gradient-to-br from-peach-400 to-primary-600 p-1">
                                <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <Wand2 size={80} className="text-peach-500 mx-auto mb-4 animate-float" />
                                        <p className="text-2xl font-bold text-primary-900 font-display">
                                            Your Creativity,<br />Amplified by AI
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-br from-primary-900 via-peach-800 to-primary-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] animate-gradient" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 font-display">
                            Ready to Create Magic?
                        </h2>
                        <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
                            Request API access at ininsico@gmail.com to start transforming your ideas into stunning visuals.
                        </p>
                        <Link to="/generate">
                            <Button size="lg" className="bg-white text-primary-900 hover:bg-primary-50 shadow-2xl">
                                <Sparkles size={20} className="mr-2" />
                                Start Generating Now
                                <ArrowRight size={20} className="ml-2" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
