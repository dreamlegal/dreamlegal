import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, content, parentPostId } = body;

        if (!userId || !content || !parentPostId) {
            return NextResponse.json({ error: 'userId, content, and parentPostId are required' }, { status: 400 });
        }

        // Check if the parent post exists
        const parentPost = await prisma.post.findUnique({
            where: { id: parentPostId }
        });

        if (!parentPost) {
            return NextResponse.json({ error: 'Parent post not found' }, { status: 404 });
        }

        // Get the username from the user
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { name: true }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Create the reply post
        const replyPost = await prisma.post.create({
            data: {
                userId,
                username: user.name || 'anonymous',
                content,
                categories: parentPost.categories,
            }
        });

        // Update the parent post to include the reply ID
        await prisma.post.update({
            where: { id: parentPostId },
            data: {
                replyIds: {
                    push: replyPost.id
                }
            }
        });

        return NextResponse.json(replyPost, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}