import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    profileImage: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    generationsCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastActive: {
        type: Date,
        default: Date.now
    }
});

// Update last active on any query
userSchema.pre('save', function (next) {
    this.lastActive = new Date();
    next();
});

export default mongoose.model('User', userSchema);
