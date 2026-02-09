import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Users, Image as ImageIcon, CheckCircle, Clock,
    Star, Trash2, LogOut, TrendingUp, Eye
} from 'lucide-react';
import { adminAPI, setAuthToken, BASE_URL } from '../services/api';
import { Button } from '../components/ui/Button';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState<any>(null);
    const [generations, setGenerations] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'generations' | 'users'>('overview');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filterApproved, setFilterApproved] = useState<string>('all');

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
            return;
        }
        setAuthToken(token);
        loadData();
    }, [navigate, currentPage, filterApproved]);

    const loadData = async () => {
        try {
            const [statsData, generationsData, usersData] = await Promise.all([
                adminAPI.getDashboardStats(),
                adminAPI.getAllGenerations(currentPage, 20, {
                    approved: filterApproved !== 'all' ? filterApproved : undefined
                }),
                adminAPI.getAllUsers(1, 10)
            ]);

            setStats(statsData.stats);
            setGenerations(generationsData.generations);
            setTotalPages(generationsData.totalPages);
            setUsers(usersData.users);
        } catch (error: any) {
            console.error('Error loading admin data:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('adminToken');
                navigate('/admin/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string, approved: boolean) => {
        try {
            await adminAPI.approveGeneration(id, approved);
            loadData();
        } catch (error) {
            console.error('Error approving generation:', error);
            alert('Failed to update approval status');
        }
    };

    const handleToggleFeatured = async (id: string) => {
        try {
            await adminAPI.toggleFeatured(id);
            loadData();
        } catch (error) {
            console.error('Error toggling featured:', error);
            alert('Failed to toggle featured status');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this generation?')) return;

        try {
            await adminAPI.deleteGeneration(id);
            loadData();
        } catch (error) {
            console.error('Error deleting generation:', error);
            alert('Failed to delete generation');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setAuthToken(null);
        navigate('/admin/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-peach-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-peach-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-primary-600">Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-peach-50 py-8 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-primary-900 mb-2 font-display">
                            Admin Dashboard
                        </h1>
                        <p className="text-primary-600">Vision AI Administration Panel</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout}>
                        <LogOut className="mr-2" size={18} />
                        Logout
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card bg-white border-l-4 border-blue-500 shadow-sm"
                    >
                        <div className="flex items-center justify-between p-2">
                            <div>
                                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Total Users</p>
                                <p className="text-3xl font-bold text-gray-800">{stats?.totalUsers || 0}</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-full">
                                <Users size={24} className="text-blue-600" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="card bg-white border-l-4 border-purple-500 shadow-sm"
                    >
                        <div className="flex items-center justify-between p-2">
                            <div>
                                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Generations</p>
                                <p className="text-3xl font-bold text-gray-800">{stats?.totalGenerations || 0}</p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-full">
                                <ImageIcon size={24} className="text-purple-600" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="card bg-white border-l-4 border-green-500 shadow-sm"
                    >
                        <div className="flex items-center justify-between p-2">
                            <div>
                                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Approved</p>
                                <p className="text-3xl font-bold text-gray-800">{stats?.approvedGenerations || 0}</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-full">
                                <CheckCircle size={24} className="text-green-600" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="card bg-white border-l-4 border-orange-500 shadow-sm"
                    >
                        <div className="flex items-center justify-between p-2">
                            <div>
                                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Pending</p>
                                <p className="text-3xl font-bold text-gray-800">{stats?.pendingApproval || 0}</p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-full">
                                <Clock size={24} className="text-orange-600" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b border-primary-200">
                    {[
                        { id: 'overview', label: 'Overview', icon: TrendingUp },
                        { id: 'generations', label: 'Generations', icon: ImageIcon },
                        { id: 'users', label: 'Users', icon: Users }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center px-4 py-3 font-semibold transition-colors ${activeTab === tab.id
                                ? 'text-peach-600 border-b-2 border-peach-600'
                                : 'text-primary-600 hover:text-primary-900'
                                }`}
                        >
                            <tab.icon className="mr-2" size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        <div className="card">
                            <h2 className="text-2xl font-bold text-primary-900 mb-4 font-display">
                                Recent Activity
                            </h2>
                            <div className="space-y-3">
                                {generations.slice(0, 5).map((gen) => (
                                    <div key={gen._id} className="flex items-center justify-between p-3 bg-primary-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={gen.imageUrl.startsWith('data:') || gen.imageUrl.startsWith('http') ? gen.imageUrl : `${BASE_URL}${gen.imageUrl}`}
                                                alt={gen.prompt}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                            <div>
                                                <p className="text-sm font-medium text-primary-900 line-clamp-1">
                                                    {gen.prompt}
                                                </p>
                                                <p className="text-xs text-primary-600">
                                                    by {gen.userId?.email || 'Unknown'}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${gen.approvedForLanding
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-orange-100 text-orange-700'
                                            }`}>
                                            {gen.approvedForLanding ? 'Approved' : 'Pending'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'generations' && (
                    <div>
                        {/* Filter */}
                        <div className="mb-6 flex gap-3">
                            <select
                                value={filterApproved}
                                onChange={(e) => setFilterApproved(e.target.value)}
                                className="px-4 py-2 border-2 border-primary-200 rounded-xl focus:border-peach-500 focus:outline-none"
                            >
                                <option value="all">All Generations</option>
                                <option value="true">Approved Only</option>
                                <option value="false">Pending Only</option>
                            </select>
                        </div>

                        {/* Generations Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {generations.map((gen) => (
                                <div key={gen._id} className="card">
                                    <div className="aspect-square bg-primary-100 rounded-xl overflow-hidden mb-3">
                                        <img
                                            src={gen.imageUrl.startsWith('data:') || gen.imageUrl.startsWith('http') ? gen.imageUrl : `${BASE_URL}${gen.imageUrl}`}
                                            alt={gen.prompt}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <p className="text-sm text-primary-900 font-medium mb-2 line-clamp-2">
                                        {gen.prompt}
                                    </p>

                                    <p className="text-xs text-primary-600 mb-3">
                                        by {gen.userId?.email || 'Unknown'} • {new Date(gen.createdAt).toLocaleDateString()}
                                    </p>

                                    <div className="flex items-center gap-2 mb-3 text-xs text-primary-600">
                                        <span className="flex items-center">
                                            <Eye size={12} className="mr-1" />
                                            {gen.views || 0}
                                        </span>
                                        {gen.isFeatured && (
                                            <span className="flex items-center text-yellow-600">
                                                <Star size={12} className="mr-1 fill-current" />
                                                Featured
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            variant={gen.approvedForLanding ? 'outline' : 'primary'}
                                            size="sm"
                                            onClick={() => handleApprove(gen._id, !gen.approvedForLanding)}
                                            className="flex-1"
                                        >
                                            {gen.approvedForLanding ? 'Unapprove' : 'Approve'}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleToggleFeatured(gen._id)}
                                            className={gen.isFeatured ? 'text-yellow-600' : ''}
                                        >
                                            <Star size={14} className={gen.isFeatured ? 'fill-current' : ''} />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(gen._id)}
                                            className="text-red-600"
                                        >
                                            <Trash2 size={14} />
                                        </Button>
                                    </div>
                                </div>
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
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="card">
                        <h2 className="text-2xl font-bold text-primary-900 mb-4 font-display">
                            Registered Users
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-primary-200">
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-primary-900">Email</th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-primary-900">Name</th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-primary-900">Generations</th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-primary-900">Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user._id} className="border-b border-primary-100">
                                            <td className="py-3 px-4 text-sm text-primary-900">{user.email}</td>
                                            <td className="py-3 px-4 text-sm text-primary-900">
                                                {user.firstName} {user.lastName}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-primary-900">{user.generationsCount}</td>
                                            <td className="py-3 px-4 text-sm text-primary-600">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
