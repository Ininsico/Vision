import { Link, useLocation } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import {
    LayoutDashboard,
    Sparkles,
    LogOut,
    Home,
    Menu,
    X
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const location = useLocation();
    const { signOut, user } = useClerk();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const links = [
        { name: 'Generate', path: '/generate', icon: Sparkles },
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    ];

    const handleSignOut = async () => {
        await signOut();
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-peach-50 flex flex-col md:flex-row">

            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-primary-100 sticky top-0 z-50">
                <Link to="/generate" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-peach-500 to-peach-600 flex items-center justify-center text-white font-bold font-display text-lg">
                        V
                    </div>
                    <span className="font-bold text-primary-900 font-display">Vision AI</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-primary-100 z-40 p-4 shadow-xl"
                    >
                        <div className="space-y-2">
                            {links.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                                        location.pathname === link.path
                                            ? "bg-peach-50 text-peach-600 font-semibold"
                                            : "text-primary-600 hover:bg-primary-50"
                                    )}
                                >
                                    <link.icon size={20} />
                                    {link.name}
                                </Link>
                            ))}
                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
                            >
                                <LogOut size={20} />
                                Sign Out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area (Left Side) */}
            <div className="flex-grow overflow-y-auto h-[calc(100vh-64px)] md:h-screen scrollbar-hide">
                <main className="min-h-full">
                    {children}
                </main>
            </div>

            {/* Desktop Sidebar (Right Side) */}
            <div className="hidden md:flex flex-col w-72 bg-white/50 backdrop-blur-xl border-l border-primary-100 h-screen sticky top-0 p-6 shadow-[-10px_0_30px_-10px_rgba(0,0,0,0.05)]">
                {/* Logo Area */}
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-peach-500 to-peach-600 flex items-center justify-center text-white font-bold font-display text-xl shadow-lg shadow-peach-500/20">
                        V
                    </div>
                    <div>
                        <h1 className="font-bold text-xl text-primary-900 font-display">Vision AI</h1>
                        <p className="text-xs text-primary-500">Creative Studio</p>
                    </div>
                </div>

                {/* User Profile Card */}
                {user && (
                    <div className="mb-8 p-4 bg-white/80 rounded-2xl border border-primary-100 shadow-sm flex items-center gap-3">
                        <img
                            src={user.imageUrl}
                            alt={user.firstName || 'User'}
                            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                        />
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-primary-900 truncate">
                                {user.firstName} {user.lastName}
                            </p>
                            <p className="text-xs text-primary-500 truncate">
                                {user.emailAddresses[0].emailAddress}
                            </p>
                        </div>
                    </div>
                )}

                {/* Navigation Links */}
                <nav className="space-y-2 flex-grow">
                    <p className="px-4 text-xs font-semibold text-primary-400 uppercase tracking-wider mb-2">
                        Menu
                    </p>
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group",
                                location.pathname === link.path
                                    ? "bg-gradient-to-r from-peach-500 to-peach-600 text-white shadow-lg shadow-peach-500/25"
                                    : "text-primary-600 hover:bg-white hover:shadow-md hover:text-primary-900"
                            )}
                        >
                            <link.icon size={20} className={cn(
                                "transition-transform duration-300 group-hover:scale-110",
                                location.pathname === link.path ? "text-white" : "text-primary-500 group-hover:text-peach-500"
                            )} />
                            <span className="font-medium">{link.name}</span>
                        </Link>
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div className="pt-6 border-t border-primary-100 space-y-2">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-primary-600 hover:bg-white hover:text-primary-900 hover:shadow-sm transition-all text-sm"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 hover:shadow-sm transition-all text-sm font-medium"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;
