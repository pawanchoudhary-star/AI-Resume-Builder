"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ResumeSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        default: 'My Resume',
    },
    resumeData: {
        type: mongoose_1.default.Schema.Types.Mixed,
        required: true,
    },
    experienceLevel: {
        type: String,
        enum: ['student', 'fresher', 'experienced'],
        default: 'experienced',
    },
}, { timestamps: true });
exports.default = mongoose_1.default.models.Resume || mongoose_1.default.model('Resume', ResumeSchema);
//# sourceMappingURL=Resume.js.map