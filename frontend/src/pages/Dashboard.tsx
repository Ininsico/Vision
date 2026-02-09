import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Image as ImageIcon, Trash2, Eye, Calendar, Sparkles } from 'lucide-react';
import { generationAPI, userAPI, setAuthToken, BASE_URL } from '../services/api';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { getToken, isSignedIn } = useAuth();
    const { user: clerkUser } = useUser();
    const [generations, setGenerations] = useState<any[]>([]);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (isSignedIn) {
            loadData();
        }
    }, [isSignedIn, currentPage]);

    const loadData = async () => {
        try {
            const token = await getToken();
            setAuthToken(token);

            // Load user profile and generations
            const [profileData, generationsData] = await Promise.all([
                userAPI.getProfile(),
                generationAPI.getMyGenerations(currentPage, 12)
            ]);

            setUserProfile(profileData.user);
            setGenerations(generationsData.generations);
            setTotalPages(generationsData.totalPages);
        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this generation?')) return;

        try {
            const token = await getToken();
            setAuthToken(token);
            await generationAPI.deleteGeneration(id);
            loadData(); // Reload data
        } catch (error) {
            console.error('Error deleting generation:', error);
            alert('Failed to delete generation');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-peach-50 flex items-center justify-center">
                <div className="text-center">
                    <Sparkles className="w-12 h-12 text-peach-500 animate-spin mx-auto mb-4" />
                    <p className="text-primary-600">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-peach-50 py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-2 font-display">
                                My Dashboard
                            </h1>
                            <p className="text-xl text-primary-600">
                                Welcome back, {clerkUser?.firstName || 'Creator'}!
                            </p>
                        </div>
                        <Link to="/generate">
                            <Button variant="primary" size="lg">
                                <Sparkles className="mr-2" size={20} />
                                Create New
                            </Button>
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="card bg-white border border-primary-100 shadow-lg group hover:border-primary-300 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-primary-500 text-sm font-medium mb-1 uppercase tracking-wider">Total Generations</p>
                                    <p className="text-4xl font-bold text-primary-900">{userProfile?.generationsCount || 0}</p>
                                </div>
                                <ImageIcon size={48} className="text-primary-200 group-hover:text-primary-500 transition-colors duration-300" />
                            </div>
                        </div>

                        <div className="card bg-white border border-primary-100 shadow-lg group hover:border-primary-300 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-primary-500 text-sm font-medium mb-1 uppercase tracking-wider">Member Since</p>
                                    <p className="text-xl font-bold text-primary-900">
                                        {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}
                                    </p>
                                </div>
                                <Calendar size={48} className="text-primary-200 group-hover:text-primary-500 transition-colors duration-300" />
                            </div>
                        </div>

                        <div className="card bg-white border border-primary-100 shadow-lg group hover:border-primary-300 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-primary-500 text-sm font-medium mb-1 uppercase tracking-wider">Account Status</p>
                                    <p className="text-2xl font-bold text-primary-900">Active</p>
                                </div>
                                <Sparkles size={48} className="text-primary-200 group-hover:text-primary-500 transition-colors duration-300" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Generations Grid */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary-900 mb-6 font-display">
                        My Generations
                    </h2>

                    {generations.length === 0 ? (
                        <div className="card text-center py-16">
                            <ImageIcon className="w-16 h-16 text-primary-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-primary-900 mb-2">No generations yet</h3>
                            <p className="text-primary-600 mb-6">Start creating amazing images with Vision AI!</p>
                            <Link to="/generate">
                                <Button variant="primary">
                                    <Sparkles className="mr-2" size={18} />
                                    Generate Your First Image
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {generations.map((gen, index) => (
                                    <motion.div
                                        key={gen._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="card group hover:shadow-2xl transition-shadow"
                                    >
                                        <div className="aspect-square bg-primary-100 rounded-xl overflow-hidden mb-4">
                                            <img
                                                src={gen.imageUrl.startsWith('data:') || gen.imageUrl.startsWith('http') ? gen.imageUrl : `${BASE_URL}${gen.imageUrl}`}
                                                alt={gen.prompt}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>

                                        <p className="text-sm text-primary-900 font-medium mb-2 line-clamp-2">
                                            {gen.prompt}
                                        </p>

                                        <div className="flex items-center justify-between text-xs text-primary-500 mb-4">
                                            <span className="flex items-center">
                                                <Calendar size={12} className="mr-1" />
                                                {new Date(gen.createdAt).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center">
                                                <Eye size={12} className="mr-1" />
                                                {gen.views || 0} views
                                            </span>
                                        </div>

                                        <div className="flex gap-2">
                                            <a
                                                href={gen.imageUrl.startsWith('data:') || gen.imageUrl.startsWith('http') ? gen.imageUrl : `${BASE_URL}${gen.imageUrl}`}
                                                download
                                                className="flex-1"
                                            >
                                                <Button variant="outline" size="sm" className="w-full">
                                                    Download
                                                </Button>
                                            </a>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDelete(gen._id)}
                                                className="text-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center gap-2 mt-8">
                                    <Button
                                        variant="outline"
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </Button>
                                    <span className="px-4 py-2 text-primary-900 font-medium">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
