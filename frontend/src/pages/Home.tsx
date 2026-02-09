import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Wand2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Home = () => {
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

            {/* Community Showcase Section */}
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
                            Community <span className="gradient-text">Creations</span>
                        </h2>
                        <p className="text-xl text-primary-600 max-w-2xl mx-auto">
                            Explore stunning images generated by our AI model
                        </p>
                    </motion.div>

                    {/* Image Slider */}
                    <div className="relative overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                        >
                            {[
                                { prompt: "Cyberpunk cityscape at night", color: "from-purple-500 to-pink-500" },
                                { prompt: "Majestic dragon in mountains", color: "from-blue-500 to-cyan-500" },
                                { prompt: "Futuristic space station", color: "from-orange-500 to-red-500" },
                                { prompt: "Enchanted forest landscape", color: "from-green-500 to-emerald-500" },
                                { prompt: "Abstract digital art", color: "from-yellow-500 to-orange-500" },
                                { prompt: "Steampunk airship", color: "from-amber-500 to-brown-500" },
                                { prompt: "Underwater coral city", color: "from-teal-500 to-blue-500" },
                                { prompt: "Northern lights over mountains", color: "from-indigo-500 to-purple-500" },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-80 group-hover:opacity-90 transition-opacity`} />
                                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                                        <p className="text-white text-sm font-medium line-clamp-2">{item.prompt}</p>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Sparkles className="text-white" size={32} />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <p className="text-primary-600 mb-6">
                            These are placeholder images. Real generations will be displayed from the database.
                        </p>
                        <Link to="/generate">
                            <Button size="lg" variant="primary">
                                <Sparkles size={20} className="mr-2" />
                                Create Your Own
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Team Credits Section */}
            <section className="py-20 px-6 bg-gradient-to-br from-primary-100 to-peach-50">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl md:text-6xl font-bold text-primary-900 mb-4 font-display">
                            Meet the <span className="gradient-text">Team</span>
                        </h2>
                        <p className="text-xl text-primary-700 max-w-2xl mx-auto">
                            Built with passion by students at COMSATS University
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Huzaifa Safdar */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="card group hover:shadow-2xl"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-peach-500 to-peach-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="text-5xl font-bold text-white">H</span>
                                </div>
                                <h3 className="text-2xl font-bold text-primary-900 mb-2 font-display">
                                    Huzaifa Safdar
                                </h3>
                                <p className="text-peach-600 font-semibold mb-4">Frontend & Backend Developer</p>
                                <p className="text-primary-600 leading-relaxed mb-6">
                                    Architected the full-stack infrastructure, designed the user interface, and implemented the API integration layer. Focused on creating a seamless, responsive experience.
                                </p>
                                <div className="flex items-center space-x-2 text-sm text-primary-500">
                                    <Wand2 size={16} />
                                    <span>React • Node.js • TypeScript</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Arslan Rathore */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="card group hover:shadow-2xl"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="text-5xl font-bold text-white">A</span>
                                </div>
                                <h3 className="text-2xl font-bold text-primary-900 mb-2 font-display">
                                    Arslan Rathore
                                </h3>
                                <p className="text-primary-600 font-semibold mb-4">AI & Integration Specialist</p>
                                <p className="text-primary-600 leading-relaxed mb-6">
                                    Developed and trained the transformer-based diffusion model, optimized the AI pipeline, and integrated the machine learning components with the application backend.
                                </p>
                                <div className="flex items-center space-x-2 text-sm text-primary-500">
                                    <Sparkles size={16} />
                                    <span>PyTorch • Diffusion Models • MLOps</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* COMSATS Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-center mt-16"
                    >
                        <p className="text-primary-600 mb-4 font-medium">Proudly developed at</p>
                        <img src="/Comsats.png" alt="COMSATS University" className="h-20 mx-auto opacity-80" />
                    </motion.div>
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
