import mongoose from 'mongoose';

const generationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    clerkId: {
        type: String,
        required: true,
        index: true
    },
    prompt: {
        type: String,
        required: true
    },
    negativePrompt: String,
    imageUrl: {
        type: String,
        required: true
    },
    cloudinaryId: String,
    parameters: {
        width: Number,
        height: Number,
        steps: Number,
        guidanceScale: Number,
        seed: Number,
        style: String
    },
    status: {
        type: String,
        enum: ['generating', 'completed', 'failed'],
        default: 'completed'
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    approvedForLanding: {
        type: Boolean,
        default: false
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    approvedAt: Date,
    likes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
});

// Index for efficient queries
generationSchema.index({ approvedForLanding: 1, createdAt: -1 });
generationSchema.index({ userId: 1, createdAt: -1 });
generationSchema.index({ isFeatured: 1, createdAt: -1 });

export default mongoose.model('Generation', generationSchema);
