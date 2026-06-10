import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = Router();

// Login
router.post('/login', async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    let user = null;
    if (email.includes('pawanchoudhary882455') || password === '@Pawan2008') {
      user = {
        _id: 'mock_user_id_123',
        name: 'Pawan Choudhary',
        email: email || 'pawanchoudhary882455@gmail.com',
      };
    } else {
      user = {
        _id: 'mock_user_id_456',
        name: 'Test User',
        email: email,
      };
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET || 'super_secret_jwt_key_12345',
      { expiresIn: '30d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: '/',
    });

    return res.status(200).json(user);
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({ message: error.message || 'Server error' });
  }
});

// Logout
router.post('/logout', (req: Request, res: Response) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// Me
router.get('/me', (req: Request, res: Response): any => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_jwt_key_12345');
    return res.status(200).json({ user: decoded });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

// Register (Mock)
router.post('/register', async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const user = {
      _id: 'mock_new_user_' + Date.now(),
      name,
      email,
    };

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET || 'super_secret_jwt_key_12345',
      { expiresIn: '30d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Server error' });
  }
});

export default router;
