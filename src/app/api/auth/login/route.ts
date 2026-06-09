import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Please provide email and password' }, { status: 400 });
    }

    // Mock Authentication for Pawan Choudhary
    // Since the MongoDB cluster ID was not provided, we mock the auth for the working model.
    let user = null;
    
    // We can accept any password for now to avoid blocking the user,
    // but we'll simulate the user record based on the provided credentials.
    if (email.includes('pawanchoudhary882455') || password === '@Pawan2008') {
      user = {
        _id: 'mock_user_id_123',
        name: 'Pawan Choudhary',
        email: email || 'pawanchoudhary882455@gmail.com',
      };
    } else {
      // Fallback for any other user during testing
      user = {
        _id: 'mock_user_id_456',
        name: 'Test User',
        email: email,
      };
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET || 'super_secret_jwt_key_12345',
      { expiresIn: '30d' }
    );

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return NextResponse.json(user, { status: 200 });
    
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
