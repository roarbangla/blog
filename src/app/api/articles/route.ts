import prisma from '@src/lib/database';
import { jsonSerialize } from '@src/lib/utils';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('perPage') ?? 12);

  try {
    const items = await prisma.post.findMany({
        select:{
            id: true,
            title: true,
            excerpt: true,
            slug: true,
            date: true,
            created_at: true,
            featured_media: true,
            author: {
                select: {
                    name: true,
                    username: true,
                    avatar: true,
                }
            },
            category: {
              select: {
                name: true,
                slug: true,
              }
            }
        },
        take: perPage,
        skip: (page - 1) * perPage,
        orderBy: {
          date: 'desc',
        },
    });
  
    const data = jsonSerialize(items);
  
    return NextResponse.json({
      success: true,
      data,
    });
  }catch (error){
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch users',
      error,
    })
  }
}
