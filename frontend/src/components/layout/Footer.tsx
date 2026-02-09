import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Github, href: 'https://www.github.com/ininsico', label: 'GitHub' },
        { icon: Twitter, href: 'https://www.twitter.com/ininsico', label: 'Twitter' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/arslan-rathore-ininsico', label: 'LinkedIn' },
        { icon: Mail, href: 'mailto:ininsico@gmail.com', label: 'Email' },
    ];

    return (
        <footer className="bg-white border-t border-primary-100 py-12">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Brand */}
                <div className="flex items-center space-x-3">
                    <img src="/Ininsicologo.png" alt="Vision Logo" className="w-8 h-8 object-contain" />
                    <span className="text-xl font-bold font-display text-primary-900">Vision</span>
                    <span className="text-primary-400 text-sm ml-2">© {currentYear}</span>
                </div>

                {/* Socials */}
                <div className="flex space-x-6">
                    {socialLinks.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            aria-label={social.label}
                            className="text-primary-500 hover:text-primary-700 transition-colors duration-200"
                        >
                            <social.icon size={20} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
