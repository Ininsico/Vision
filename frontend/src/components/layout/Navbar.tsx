import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
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
                "fixed top-0 w-full z-[100] transition-all duration-500",
                scrolled ? "py-4" : "py-6"
            )}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div
                    className={cn(
                        "relative flex justify-between items-center px-8 py-3 rounded-full transition-all duration-500 border",
                        scrolled
                            ? "bg-primary-50/80 backdrop-blur-md shadow-lg border-primary-200/50"
                            : "bg-primary-50 shadow-md border-transparent"
                    )}
                >
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="relative w-10 h-10 group-hover:scale-105 transition-transform filter drop-shadow-sm">
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

                    {/* Controls */}
                    <div className="flex items-center space-x-3">
                        <Link to="/generate">
                            <Button
                                size="sm"
                                variant="primary"
                                className="hidden md:flex"
                            >
                                <Sparkles size={16} className="mr-2" />
                                Generate <ArrowRight size={14} className="ml-2" />
                            </Button>
                        </Link>
                        <button
                            className="lg:hidden w-9 h-9 flex items-center justify-center text-primary-900 bg-primary-100 rounded-full hover:bg-primary-200 transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
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
                            <div className="pt-4">
                                <Link to="/generate" className="w-full">
                                    <Button className="w-full" variant="primary">
                                        <Sparkles size={16} className="mr-2" />
                                        Generate Image
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
