import prisma from '@src/lib/database';
import { jsonSerialize } from '@src/lib/utils';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      take: 10,
    });
  
    const safeUsers = jsonSerialize(users);
  
    return NextResponse.json({
      success: true,
      data: safeUsers,
    });
  }catch (error){
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch users',
      error,
    })
  }
}
