import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Docs', href: '/docs' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled || isOpen ? "bg-white/80 backdrop-blur-md border-b border-primary-100 py-4" : "bg-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <img
                                src="/Ininsicologo.png"
                                alt="Vision Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-primary-900 font-display">
                            Vision
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors tracking-wide relative group",
                                    location.pathname === link.href
                                        ? "text-primary-900"
                                        : "text-primary-600 hover:text-primary-900"
                                )}
                            >
                                {link.name}
                                <span
                                    className={cn(
                                        "absolute -bottom-1 left-0 w-0 h-0.5 bg-peach-500 transition-all duration-300 group-hover:w-full",
                                        location.pathname === link.href && "w-full"
                                    )}
                                />
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <SignedOut>
                            <Link to="/sign-in">
                                <Button variant="ghost" className="text-primary-600 hover:text-primary-900">
                                    Sign In
                                </Button>
                            </Link>
                            <Link to="/sign-up">
                                <Button variant="primary" className="shadow-lg shadow-peach-500/20">
                                    Get Started
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </SignedOut>
                        <SignedIn>
                            <Link to="/generate">
                                <Button variant="primary" className="shadow-lg shadow-peach-500/20">
                                    Go to App
                                    <Sparkles className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden w-9 h-9 flex items-center justify-center text-primary-900 bg-primary-100 rounded-full hover:bg-primary-200 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden absolute top-full left-0 w-full px-6 pt-2"
                    >
                        <div className="bg-primary-50 rounded-[32px] p-6 shadow-2xl border border-primary-100 flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className={cn(
                                        "text-lg font-semibold py-2 border-b border-primary-100 transition-colors",
                                        location.pathname === link.href
                                            ? "text-primary-900"
                                            : "text-primary-800 hover:text-primary-900"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 space-y-3">
                                <SignedOut>
                                    <Link to="/sign-in" className="w-full">
                                        <Button className="w-full" variant="outline">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link to="/sign-up" className="w-full">
                                        <Button className="w-full" variant="primary">
                                            Get Started
                                        </Button>
                                    </Link>
                                </SignedOut>

                                <SignedIn>
                                    <Link to="/generate" className="w-full">
                                        <Button className="w-full" variant="primary">
                                            <Sparkles size={16} className="mr-2" />
                                            Go to App
                                        </Button>
                                    </Link>
                                    <div className="flex items-center justify-center pt-2">
                                        <UserButton
                                            appearance={{
                                                elements: {
                                                    avatarBox: "w-10 h-10 ring-2 ring-peach-500/20",
                                                },
                                            }}
                                            afterSignOutUrl="/"
                                        />
                                    </div>
                                </SignedIn>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
