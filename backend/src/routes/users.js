import express from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Get current user profile
router.get('/me', requireAuth, async (req, res) => {
    try {
        res.json({
            user: {
                id: req.user._id,
                clerkId: req.user.clerkId,
                email: req.user.email,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                profileImage: req.user.profileImage,
                role: req.user.role,
                generationsCount: req.user.generationsCount,
                createdAt: req.user.createdAt
            }
        });
    } catch (error) {
        console.error('Get user profile error:', error);
        res.status(500).json({ error: 'Failed to get user profile' });
    }
});

export default router;
