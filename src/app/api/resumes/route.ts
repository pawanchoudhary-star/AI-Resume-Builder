import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/mongodb';
import Resume from '@/models/Resume';

async function getUserFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_jwt_key_12345') as any;
    return decoded.id;
  } catch (e) {
    return null;
  }
}

export async function GET() {
  try {
    const userId = await getUserFromToken();
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    
    const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });
    
    return NextResponse.json(resumes, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getUserFromToken();
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { title, resumeData, experienceLevel } = await req.json();

    await connectToDatabase();

    const resume = await Resume.create({
      userId,
      title: title || 'My Resume',
      resumeData,
      experienceLevel: experienceLevel || 'experienced',
    });

    return NextResponse.json(resume, { status: 201 });
  } catch (error: any) {
    console.error('Error saving resume:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
