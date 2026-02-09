import express from 'express';
import { loginAdmin, getAdminProfile, verifyAdminToken } from '../controllers/adminController.js';
import { requireAdminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

// Public routes
router.post('/login', loginAdmin);

// Protected routes
router.get('/profile', requireAdminAuth, getAdminProfile);
router.get('/verify', requireAdminAuth, verifyAdminToken);

export default router;
