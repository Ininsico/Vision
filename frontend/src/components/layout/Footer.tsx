import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        Product: [
            { name: 'Features', href: '/#features' },
            { name: 'Pricing', href: '/#pricing' },
            { name: 'API', href: '/docs' },
        ],
        Company: [
            { name: 'About', href: '/#about' },
            { name: 'Blog', href: '/blog' },
            { name: 'Contact', href: '/contact' },
        ],
        Resources: [
            { name: 'Documentation', href: '/docs' },
            { name: 'Guides', href: '/docs/guides' },
            { name: 'Examples', href: '/docs/examples' },
        ],
    };

    const socialLinks = [
        { icon: Github, href: '#', label: 'GitHub' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Mail, href: '/contact', label: 'Email' },
    ];

    return (
        <footer className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-primary-50 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <img src="/Ininsicologo.png" alt="Vision Logo" className="w-10 h-10" />
                            <span className="text-2xl font-bold font-display">Vision</span>
                        </div>
                        <p className="text-primary-200 mb-6 max-w-sm">
                            Transform your imagination into stunning visuals with our AI-powered text-to-image generator.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-full bg-primary-800 hover:bg-peach-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="font-semibold text-lg mb-4 font-display">{category}</h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.href}
                                            className="text-primary-200 hover:text-peach-400 transition-colors duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Team Credits */}
                <div className="border-t border-primary-700 pt-8 pb-6">
                    <div className="flex flex-col items-center space-y-6">
                        {/* COMSATS Logo */}
                        <div className="flex items-center space-x-3">
                            <img src="/Comsats.png" alt="COMSATS" className="h-12 w-auto" />
                            <div className="h-8 w-px bg-primary-600"></div>
                            <img src="/Ininsicologo.png" alt="Ininsico" className="h-10 w-auto" />
                        </div>

                        {/* Team Members */}
                        <div className="text-center">
                            <p className="text-primary-200 text-sm mb-3 font-medium">Developed by</p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-primary-100">
                                <div className="text-center">
                                    <p className="font-semibold text-white">Huzaifa Safdar</p>
                                    <p className="text-sm text-primary-300">Frontend & Backend</p>
                                </div>
                                <div className="hidden md:block h-8 w-px bg-primary-600"></div>
                                <div className="text-center">
                                    <p className="font-semibold text-white">Arslan Rathore</p>
                                    <p className="text-sm text-primary-300">AI & Integration</p>
                                </div>
                            </div>
                        </div>

                        {/* Copyright */}
                        <p className="text-primary-400 text-sm">
                            © {currentYear} Vision AI. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
