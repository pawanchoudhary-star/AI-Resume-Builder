"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Resume_1 = __importDefault(require("../models/Resume"));
const router = (0, express_1.Router)();
function getUserFromToken(req) {
    const token = req.cookies.token;
    if (!token)
        return null;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'super_secret_jwt_key_12345');
        return decoded.id;
    }
    catch (e) {
        return null;
    }
}
// GET Resumes
router.get('/', async (req, res) => {
    try {
        const userId = getUserFromToken(req);
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const resumes = await Resume_1.default.find({ userId }).sort({ updatedAt: -1 });
        return res.status(200).json(resumes);
    }
    catch (error) {
        console.error('Error fetching resumes:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
// POST Resume
router.post('/', async (req, res) => {
    try {
        const userId = getUserFromToken(req);
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { title, resumeData, experienceLevel } = req.body;
        const resume = await Resume_1.default.create({
            userId,
            title: title || 'My Resume',
            resumeData,
            experienceLevel: experienceLevel || 'experienced',
        });
        return res.status(201).json(resume);
    }
    catch (error) {
        console.error('Error saving resume:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
//# sourceMappingURL=resumes.js.map