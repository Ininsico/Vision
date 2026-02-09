import { SignIn } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

const SignInPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center px-6 py-20">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            </div>

            <div className="w-full max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Branding */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="hidden lg:block"
                    >
                        <Link to="/" className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-900 transition-colors mb-8">
                            <ArrowLeft size={20} />
                            <span className="font-medium">Back to Home</span>
                        </Link>

                        <div className="flex items-center space-x-3 mb-6">
                            <img src="/Ininsicologo.png" alt="Vision Logo" className="w-16 h-16" />
                            <h1 className="text-4xl font-bold text-primary-900 font-display">Vision AI</h1>
                        </div>

                        <h2 className="text-5xl font-bold text-primary-900 mb-6 font-display leading-tight">
                            Welcome <span className="gradient-text">Back</span>
                        </h2>

                        <p className="text-xl text-primary-700 mb-8 leading-relaxed">
                            Sign in to access your AI-powered image generation workspace and continue creating stunning visuals.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0 mt-1">
                                    <Sparkles size={16} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-primary-900 mb-1">Transformer-Based AI</h3>
                                    <p className="text-primary-600 text-sm">Advanced diffusion models for high-quality image generation</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0 mt-1">
                                    <Sparkles size={16} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-primary-900 mb-1">Save Your Creations</h3>
                                    <p className="text-primary-600 text-sm">Access your generation history and manage your projects</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0 mt-1">
                                    <Sparkles size={16} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-primary-900 mb-1">API Access</h3>
                                    <p className="text-primary-600 text-sm">Request credentials for programmatic access</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex items-center space-x-4">
                            <img src="/Comsats.png" alt="COMSATS" className="h-12 opacity-60" />
                            <div className="h-8 w-px bg-primary-300"></div>
                            <p className="text-sm text-primary-600">Built at COMSATS University</p>
                        </div>
                    </motion.div>

                    {/* Right Side - Sign In Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col items-center"
                    >
                        {/* Mobile Back Button */}
                        <div className="lg:hidden w-full mb-6">
                            <Link to="/" className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-900 transition-colors">
                                <ArrowLeft size={20} />
                                <span className="font-medium">Back to Home</span>
                            </Link>
                        </div>

                        {/* Mobile Branding */}
                        <div className="lg:hidden text-center mb-8">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <img src="/Ininsicologo.png" alt="Vision Logo" className="w-12 h-12" />
                                <h1 className="text-3xl font-bold text-primary-900 font-display">Vision AI</h1>
                            </div>
                            <p className="text-primary-600">Sign in to continue creating</p>
                        </div>

                        {/* Clerk Sign In Component */}
                        <div className="w-full max-w-md">
                            <SignIn
                                appearance={{
                                    elements: {
                                        rootBox: "w-full",
                                        card: "bg-white shadow-2xl rounded-3xl border-0",
                                        headerTitle: "font-display text-2xl font-bold text-primary-900",
                                        headerSubtitle: "text-primary-600",
                                        socialButtonsBlockButton: "bg-white border-2 border-primary-200 hover:border-primary-500 hover:bg-primary-50 text-primary-900 font-medium transition-all rounded-xl",
                                        socialButtonsBlockButtonText: "font-medium",
                                        dividerLine: "bg-primary-200",
                                        dividerText: "text-primary-500",
                                        formFieldLabel: "text-primary-900 font-semibold",
                                        formFieldInput: "border-2 border-primary-200 focus:border-primary-500 rounded-xl text-primary-900",
                                        formButtonPrimary: "bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all border-none",
                                        footerActionLink: "text-primary-600 hover:text-primary-800 font-semibold",
                                        identityPreviewText: "text-primary-900",
                                        identityPreviewEditButton: "text-primary-600 hover:text-primary-800",
                                    },
                                }}
                                routing="path"
                                path="/sign-in"
                                signUpUrl="/sign-up"
                                redirectUrl="/generate"
                            />
                        </div>

                        <p className="mt-6 text-sm text-primary-600 text-center">
                            Don't have an account?{' '}
                            <Link to="/sign-up" className="text-primary-700 hover:text-primary-900 font-semibold">
                                Sign up for free
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
