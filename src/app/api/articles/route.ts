import prisma from '@src/lib/database';
import { jsonSerialize } from '@src/lib/utils';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // const items = await prisma.post.findMany({
    //     select:{
    //         id: true,
    //         title: true,
    //         excerpt: true,
    //         slug: true,
    //         date: true,
    //         created_at: true,
    //         featured_media: true,
    //         author: {
    //             select: {
    //                 name: true,
    //                 username: true,
    //                 avatar: true,
    //             }
    //         }
    //     },
    //     take: 10,
    //     orderBy: {
    //       date: 'desc',
    //     },
    // });

    const items = await prisma.post.findMany({
      take: 10,
      include: {author: true},
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
