import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_jwt_key_12345') as any;

    // Mock returning user
    return NextResponse.json({
      _id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }
}
