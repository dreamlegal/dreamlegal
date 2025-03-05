import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const userId = searchParams.get('userId');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');

        if (!userId) {
            return NextResponse.json({ error: 'userId is required' }, { status: 400 });
        }

        const skip = (page - 1) * limit;

        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const posts = await prisma.post.findMany({
            where: { userId },
            orderBy: {
                createdAt: 'desc'
            },
            skip,
            take: limit
        });

        const totalPosts = await prisma.post.count({ where: { userId } });

        return NextResponse.json({
            posts,
            pagination: {
                total: totalPosts,
                pages: Math.ceil(totalPosts / limit),
                current: page
            }
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
