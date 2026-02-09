import { SignUp } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Zap, Shield } from 'lucide-react';

const SignUpPage = () => {
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
                            Start Creating <span className="gradient-text">Today</span>
                        </h2>

                        <p className="text-xl text-primary-700 mb-8 leading-relaxed">
                            Join Vision AI and transform your ideas into stunning visuals with our transformer-based diffusion model.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0 mt-1">
                                    <Sparkles size={16} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-primary-900 mb-1">Free to Start</h3>
                                    <p className="text-primary-600 text-sm">Create an account and start generating images immediately</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0 mt-1">
                                    <Zap size={16} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-primary-900 mb-1">Fast Generation</h3>
                                    <p className="text-primary-600 text-sm">Get your images in 8-15 seconds with our optimized pipeline</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0 mt-1">
                                    <Shield size={16} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-primary-900 mb-1">Secure & Private</h3>
                                    <p className="text-primary-600 text-sm">Your data is encrypted and your creations are yours</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-primary-200">
                            <p className="text-sm text-primary-700 mb-3">
                                <strong className="text-primary-900">Join our community:</strong>
                            </p>
                            <a
                                href="https://discord.gg/hAmRhsTm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                                </svg>
                                <span>Join our Discord</span>
                            </a>
                        </div>

                        <div className="mt-8 flex items-center space-x-4">
                            <img src="/Comsats.png" alt="COMSATS" className="h-12 opacity-60" />
                            <div className="h-8 w-px bg-primary-300"></div>
                            <p className="text-sm text-primary-600">Built at COMSATS University</p>
                        </div>
                    </motion.div>

                    {/* Right Side - Sign Up Form */}
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
                            <p className="text-primary-600">Create your account</p>
                        </div>

                        {/* Clerk Sign Up Component */}
                        <div className="w-full max-w-md">
                            <SignUp
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
                                path="/sign-up"
                                signInUrl="/sign-in"
                                redirectUrl="/generate"
                            />
                        </div>

                        <p className="mt-6 text-sm text-primary-600 text-center">
                            Already have an account?{' '}
                            <Link to="/sign-in" className="text-primary-700 hover:text-primary-900 font-semibold">
                                Sign in
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
