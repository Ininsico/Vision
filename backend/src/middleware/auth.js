import { clerkClient } from '@clerk/clerk-sdk-node';
import User from '../models/User.js';

export const requireAuth = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log('❌ No authorization header');
            return res.status(401).json({ error: 'No authentication token provided' });
        }

        const token = authHeader.replace('Bearer ', '');

        // The token from Clerk's getToken() is a session token (JWT)
        // We need to decode it to get the user ID
        let userId;
        try {
            // Decode the JWT to get the subject (user ID)
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const payload = JSON.parse(jsonPayload);
            userId = payload.sub;

            console.log('✅ Token decoded, user ID:', userId);
        } catch (decodeError) {
            console.error('❌ Token decode error:', decodeError.message);
            return res.status(401).json({ error: 'Invalid token format' });
        }

        if (!userId) {
            return res.status(401).json({ error: 'Invalid token - no user ID' });
        }

        // Get user from Clerk
        let clerkUser;
        try {
            clerkUser = await clerkClient.users.getUser(userId);
            console.log('✅ Clerk user fetched:', clerkUser.emailAddresses[0]?.emailAddress);
        } catch (clerkError) {
            console.error('❌ Clerk user fetch error:', clerkError.message);
            return res.status(401).json({ error: 'User not found in Clerk' });
        }

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
            console.log(`✅ Created new user: ${user.email}`);
        } else {
            // Update last active
            user.lastActive = new Date();
            await user.save();
            console.log(`✅ User authenticated: ${user.email}`);
        }

        // Attach user to request
        req.user = user;
        req.clerkUser = clerkUser;

        next();
    } catch (error) {
        console.error('❌ Auth middleware error:', error);
        res.status(401).json({ error: 'Authentication failed', message: error.message });
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
