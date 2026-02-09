import express from 'express';
import {
    createGeneration,
    getUserGenerations,
    getGeneration,
    deleteUserGeneration,
    togglePublic,
    getPublicGenerations
} from '../controllers/generationController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/public', getPublicGenerations);

// Protected routes (require Clerk authentication)
router.post('/', requireAuth, createGeneration);
router.get('/my', requireAuth, getUserGenerations);
router.get('/:id', requireAuth, getGeneration);
router.delete('/:id', requireAuth, deleteUserGeneration);
router.patch('/:id/public', requireAuth, togglePublic);

export default router;
