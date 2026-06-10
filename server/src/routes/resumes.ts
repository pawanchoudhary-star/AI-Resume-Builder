import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Resume from '../models/Resume';

const router = Router();

function getUserFromToken(req: Request) {
  const token = req.cookies.token;
  if (!token) return null;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_jwt_key_12345') as any;
    return decoded.id;
  } catch (e) {
    return null;
  }
}

// GET Resumes
router.get('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const resumes = await Resume.find({ userId } as any).sort({ updatedAt: -1 });
    return res.status(200).json(resumes);
  } catch (error: any) {
    console.error('Error fetching resumes:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST Resume
router.post('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { title, resumeData, experienceLevel } = req.body;

    const resume = await Resume.create({
      userId,
      title: title || 'My Resume',
      resumeData,
      experienceLevel: experienceLevel || 'experienced',
    });

    return res.status(201).json(resume);
  } catch (error: any) {
    console.error('Error saving resume:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
