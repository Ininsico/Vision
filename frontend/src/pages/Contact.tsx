import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, MessageSquare, Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });

        setTimeout(() => setSubmitted(false), 5000);
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            content: 'ininsico@gmail.com',
            link: 'mailto:ininsico@gmail.com',
        },
        {
            icon: MapPin,
            title: 'Location',
            content: 'COMSATS University',
            link: '#',
        },
    ];

    const socialLinks = [
        { icon: Github, href: '#', label: 'GitHub', color: 'hover:bg-gray-800' },
        { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-blue-500' },
        { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-600' },
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
                        <MessageSquare size={16} />
                        <span>Get in Touch</span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-bold text-primary-900 mb-6 font-display">
                        Let's <span className="gradient-text">Connect</span>
                    </h1>
                    <p className="text-xl text-primary-700 max-w-2xl mx-auto">
                        Interested in using Vision AI? Request API access or send us your questions at ininsico@gmail.com.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-3"
                    >
                        <div className="card">
                            <h2 className="text-3xl font-bold text-primary-900 mb-6 font-display">
                                Send us a Message
                            </h2>

                            {submitted && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-2xl"
                                >
                                    <p className="font-medium">✓ Message sent successfully! We'll get back to you soon.</p>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold text-primary-900 mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border-2 border-primary-200 focus:border-peach-500 focus:outline-none transition-colors bg-white text-primary-900"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-primary-900 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border-2 border-primary-200 focus:border-peach-500 focus:outline-none transition-colors bg-white text-primary-900"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-semibold text-primary-900 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border-2 border-primary-200 focus:border-peach-500 focus:outline-none transition-colors bg-white text-primary-900"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-primary-900 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-primary-200 focus:border-peach-500 focus:outline-none transition-colors bg-white text-primary-900 resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    variant="primary"
                                    disabled={isSubmitting}
                                    className="w-full md:w-auto"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} className="mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Contact Info Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* Contact Information */}
                        <div className="card">
                            <h3 className="text-2xl font-bold text-primary-900 mb-6 font-display">
                                Contact Information
                            </h3>
                            <div className="space-y-4">
                                {contactInfo.map((info) => (
                                    <a
                                        key={info.title}
                                        href={info.link}
                                        className="flex items-start space-x-4 p-4 rounded-xl hover:bg-primary-50 transition-colors group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-peach-500 to-peach-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <info.icon className="text-white" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-primary-900 mb-1">{info.title}</p>
                                            <p className="text-primary-600">{info.content}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="card">
                            <h3 className="text-2xl font-bold text-primary-900 mb-6 font-display">
                                Follow Us
                            </h3>
                            <div className="flex space-x-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className={`w-12 h-12 rounded-xl bg-primary-100 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                                    >
                                        <social.icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* API Access Info */}
                        <div className="card bg-gradient-to-br from-peach-500 to-peach-600 text-white">
                            <h3 className="text-2xl font-bold mb-4 font-display">
                                Request API Access
                            </h3>
                            <p className="text-peach-50 mb-4">
                                Vision AI is currently in beta. Contact us at <strong>ininsico@gmail.com</strong> to request API credentials for your project.
                            </p>
                            <div className="flex items-center space-x-2 text-peach-100">
                                <Mail size={18} />
                                <span className="text-sm font-medium">Response within 24-48 hours</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
