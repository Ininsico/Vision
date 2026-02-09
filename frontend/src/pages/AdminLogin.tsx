import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminAPI, setAuthToken } from '../services/api';
import { Button } from '../components/ui/Button';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await adminAPI.login(email, password);

            // Store admin token
            localStorage.setItem('adminToken', response.token);
            setAuthToken(response.token);

            // Redirect to admin dashboard
            navigate('/admin/dashboard');
        } catch (err: any) {
            console.error('Admin login error:', err);
            setError(err.response?.data?.error || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="card bg-white shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-peach-500 to-peach-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Shield className="text-white" size={32} />
                        </div>
                        <h1 className="text-3xl font-bold text-primary-900 mb-2 font-display">
                            Admin Portal
                        </h1>
                        <p className="text-primary-600">Vision AI Administration</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-primary-900 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:border-peach-500 focus:outline-none text-primary-900"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-primary-900 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:border-peach-500 focus:outline-none text-primary-900"
                                required
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full"
                            size="lg"
                            variant="primary"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 animate-spin" size={20} />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <Shield className="mr-2" size={20} />
                                    Sign In
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 p-4 bg-primary-50 rounded-xl">
                        <p className="text-xs text-primary-600 text-center">
                         Authorized personnel only. All access is logged and monitored.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
