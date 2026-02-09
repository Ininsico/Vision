import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const requireAdminAuth = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'No authentication token provided' });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find admin
        const admin = await Admin.findById(decoded.adminId);

        if (!admin) {
            return res.status(401).json({ error: 'Admin not found' });
        }

        // Attach admin to request
        req.admin = admin;

        next();
    } catch (error) {
        console.error('Admin auth middleware error:', error);
        res.status(401).json({ error: 'Invalid or expired admin token' });
    }
};
