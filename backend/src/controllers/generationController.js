import Generation from '../models/Generation.js';
import User from '../models/User.js';
import visionAI from '../services/visionAI.js';

// Generate new image with Vision AI
export const generateImage = async (req, res) => {
    try {
        const { prompt, negativePrompt, parameters } = req.body;

        console.log('📥 Generation request received:', {
            user: req.user?.email,
            prompt: prompt?.substring(0, 50) + '...',
            hasParameters: !!parameters
        });

        if (!prompt) {
            console.log('❌ No prompt provided');
            return res.status(400).json({ error: 'Prompt is required' });
        }

        console.log(`🎨 User ${req.user.email} generating image...`);
        console.log(`📝 Full prompt: ${prompt}`);

        // Generate image using Vision AI service
        console.log('🚀 Calling Vision AI service...');
        const result = await visionAI.generateImage(prompt, {
            ...parameters,
            negativePrompt
        });

        console.log('✅ Vision AI generation successful:', result.filename);

        // Create generation record
        const generation = await Generation.create({
            userId: req.user._id,
            clerkId: req.user.clerkId,
            prompt,
            negativePrompt: negativePrompt || '',
            imageUrl: result.url,
            filename: result.filename,
            parameters: result.parameters,
            status: 'completed'
        });

        console.log('💾 Generation saved to database:', generation._id);

        // Update user's generation count
        req.user.generationsCount += 1;
        await req.user.save();

        console.log('✨ Generation complete!');

        res.status(201).json({
            success: true,
            generation: {
                id: generation._id,
                prompt: generation.prompt,
                imageUrl: generation.imageUrl,
                parameters: generation.parameters,
                createdAt: generation.createdAt
            }
        });
    } catch (error) {
        console.error('❌ Generate image error:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({
            error: 'Failed to generate image',
            message: error.message
        });
    }
};

// Get user's generations
export const getUserGenerations = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;

        const generations = await Generation.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .select('-filename')
            .exec();

        const count = await Generation.countDocuments({ userId: req.user._id });

        res.json({
            generations,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            total: count
        });
    } catch (error) {
        console.error('Get user generations error:', error);
        res.status(500).json({ error: 'Failed to fetch generations' });
    }
};

// Get single generation
export const getGeneration = async (req, res) => {
    try {
        const { id } = req.params;

        const generation = await Generation.findById(id)
            .populate('userId', 'email firstName lastName profileImage');

        if (!generation) {
            return res.status(404).json({ error: 'Generation not found' });
        }

        // Check if user owns this generation or is admin
        if (generation.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Increment views
        generation.views += 1;
        await generation.save();

        res.json({ generation });
    } catch (error) {
        console.error('Get generation error:', error);
        res.status(500).json({ error: 'Failed to fetch generation' });
    }
};

// Delete generation
export const deleteUserGeneration = async (req, res) => {
    try {
        const { id } = req.params;

        const generation = await Generation.findById(id);

        if (!generation) {
            return res.status(404).json({ error: 'Generation not found' });
        }

        // Check if user owns this generation
        if (generation.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Delete image file (soft fail if file missing)
        if (generation.filename) {
            try {
                visionAI.deleteImage(generation.filename);
            } catch (err) {
                console.warn(`Could not delete file ${generation.filename}, proceeding with DB deletion.`);
            }
        }

        await generation.deleteOne();

        // Update user's generation count
        req.user.generationsCount = Math.max(0, req.user.generationsCount - 1);
        await req.user.save();

        res.json({
            success: true,
            message: 'Generation deleted successfully'
        });
    } catch (error) {
        console.error('Delete generation error:', error);
        res.status(500).json({ error: 'Failed to delete generation' });
    }
};

// Toggle public status
export const togglePublic = async (req, res) => {
    try {
        const { id } = req.params;

        const generation = await Generation.findById(id);

        if (!generation) {
            return res.status(404).json({ error: 'Generation not found' });
        }

        // Check if user owns this generation
        if (generation.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Access denied' });
        }

        generation.isPublic = !generation.isPublic;
        await generation.save();

        res.json({
            success: true,
            generation
        });
    } catch (error) {
        console.error('Toggle public error:', error);
        res.status(500).json({ error: 'Failed to toggle public status' });
    }
};

// Get public/featured generations (for landing page)
export const getPublicGenerations = async (req, res) => {
    try {
        const { featured, limit = 8 } = req.query;

        // Show ONLY approved generations
        const query = {
            status: 'completed',
            approvedForLanding: true
        };

        if (featured === 'true') {
            query.isFeatured = true;
        }

        const generations = await Generation.find(query)
            .populate('userId', 'firstName lastName profileImage')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .select('-filename');

        res.json({ generations });
    } catch (error) {
        console.error('Get public generations error:', error);
        res.status(500).json({ error: 'Failed to fetch public generations' });
    }
};
