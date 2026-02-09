import { clerkClient } from '@clerk/clerk-sdk-node';
import User from '../models/User.js';

export const requireAuth = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'No authentication token provided' });
        }

        // Verify token with Clerk
        const session = await clerkClient.sessions.verifySession(token);

        if (!session) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        // Get user from Clerk
        const clerkUser = await clerkClient.users.getUser(session.userId);

        // Find or create user in our database
        let user = await User.findOne({ clerkId: clerkUser.id });

        if (!user) {
            // Create new user
            user = await User.create({
                clerkId: clerkUser.id,
                email: clerkUser.emailAddresses[0]?.emailAddress,
                firstName: clerkUser.firstName,
                lastName: clerkUser.lastName,
                profileImage: clerkUser.imageUrl
            });
        } else {
            // Update last active
            user.lastActive = new Date();
            await user.save();
        }

        // Attach user to request
        req.user = user;
        req.clerkUser = clerkUser;

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ error: 'Authentication failed' });
    }
};

export const requireAdmin = async (req, res, next) => {
    try {
        // First check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        // Check if user has admin role
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Admin access required' });
        }

        next();
    } catch (error) {
        console.error('Admin middleware error:', error);
        res.status(403).json({ error: 'Admin access denied' });
    }
};
