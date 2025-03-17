import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();

  try {
    const users = await User.find({}); // Fetch all user data including username and password
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}