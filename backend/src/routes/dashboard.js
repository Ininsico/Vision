import express from 'express';
import {
    getAllGenerations,
    approveGeneration,
    toggleFeatured,
    deleteGeneration,
    getDashboardStats,
    getAllUsers
} from '../controllers/dashboardController.js';
import { requireAdminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

// All routes require admin authentication
router.use(requireAdminAuth);

// Dashboard stats
router.get('/stats', getDashboardStats);

// User management
router.get('/users', getAllUsers);

// Generation management
router.get('/generations', getAllGenerations);
router.patch('/generations/:id/approve', approveGeneration);
router.patch('/generations/:id/featured', toggleFeatured);
router.delete('/generations/:id', deleteGeneration);

export default router;
