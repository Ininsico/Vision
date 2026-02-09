import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

// Admin login
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Check if email matches admin email
        if (email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Find or create admin
        let admin = await Admin.findOne({ email });

        if (!admin) {
            // Create admin on first login
            admin = await Admin.create({
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
                name: 'Vision AI Admin'
            });
        }

        // Verify password
        const isMatch = await admin.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Update last login
        admin.lastLogin = new Date();
        await admin.save();

        // Generate JWT token
        const token = jwt.sign(
            { adminId: admin._id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            token,
            admin: {
                id: admin._id,
                email: admin.email,
                name: admin.name,
                role: admin.role
            }
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

// Get admin profile
export const getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin._id).select('-password');
        res.json({ admin });
    } catch (error) {
        console.error('Get admin profile error:', error);
        res.status(500).json({ error: 'Failed to get profile' });
    }
};

// Verify admin token
export const verifyAdminToken = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin._id).select('-password');
        res.json({
            valid: true,
            admin: {
                id: admin._id,
                email: admin.email,
                name: admin.name,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(401).json({ valid: false, error: 'Invalid token' });
    }
};
