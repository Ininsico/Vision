import Generation from '../models/Generation.js';
import User from '../models/User.js';

// Get all generations (admin only)
export const getAllGenerations = async (req, res) => {
    try {
        const { page = 1, limit = 20, status, userId, approved } = req.query;

        const query = {};
        if (status) query.status = status;
        if (userId) query.userId = userId;
        if (approved !== undefined) query.approvedForLanding = approved === 'true';

        const generations = await Generation.find(query)
            .populate('userId', 'email firstName lastName clerkId')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Generation.countDocuments(query);

        res.json({
            generations,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count
        });
    } catch (error) {
        console.error('Get all generations error:', error);
        res.status(500).json({ error: 'Failed to fetch generations' });
    }
};

// Approve generation for landing page
export const approveGeneration = async (req, res) => {
    try {
        const { id } = req.params;
        const { approved } = req.body;

        const generation = await Generation.findById(id);

        if (!generation) {
            return res.status(404).json({ error: 'Generation not found' });
        }

        generation.approvedForLanding = approved;
        generation.approvedBy = req.admin._id;
        generation.approvedAt = new Date();

        await generation.save();

        res.json({
            success: true,
            generation
        });
    } catch (error) {
        console.error('Approve generation error:', error);
        res.status(500).json({ error: 'Failed to approve generation' });
    }
};

// Toggle featured status
export const toggleFeatured = async (req, res) => {
    try {
        const { id } = req.params;

        const generation = await Generation.findById(id);

        if (!generation) {
            return res.status(404).json({ error: 'Generation not found' });
        }

        generation.isFeatured = !generation.isFeatured;
        await generation.save();

        res.json({
            success: true,
            generation
        });
    } catch (error) {
        console.error('Toggle featured error:', error);
        res.status(500).json({ error: 'Failed to toggle featured status' });
    }
};

// Delete generation
export const deleteGeneration = async (req, res) => {
    try {
        const { id } = req.params;

        const generation = await Generation.findByIdAndDelete(id);

        if (!generation) {
            return res.status(404).json({ error: 'Generation not found' });
        }

        res.json({
            success: true,
            message: 'Generation deleted successfully'
        });
    } catch (error) {
        console.error('Delete generation error:', error);
        res.status(500).json({ error: 'Failed to delete generation' });
    }
};

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalGenerations = await Generation.countDocuments();
        const approvedGenerations = await Generation.countDocuments({ approvedForLanding: true });
        const pendingApproval = await Generation.countDocuments({ approvedForLanding: false });

        // Recent generations
        const recentGenerations = await Generation.find()
            .populate('userId', 'email firstName lastName')
            .sort({ createdAt: -1 })
            .limit(10);

        // Top users by generation count
        const topUsers = await User.find()
            .sort({ generationsCount: -1 })
            .limit(5)
            .select('email firstName lastName generationsCount');

        res.json({
            stats: {
                totalUsers,
                totalGenerations,
                approvedGenerations,
                pendingApproval
            },
            recentGenerations,
            topUsers
        });
    } catch (error) {
        console.error('Get dashboard stats error:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;

        const users = await User.find()
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await User.countDocuments();

        res.json({
            users,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count
        });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
