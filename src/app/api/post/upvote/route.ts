import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { postId, userId } = body;

        if (!postId || !userId) {
            return NextResponse.json({ error: 'postId and userId are required' }, { status: 400 });
        }

        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        // Check if user already upvoted
        const alreadyUpvoted = post.upvotes.includes(userId);

        // Check if user already downvoted
        const alreadyDownvoted = post.downvotes.includes(userId);

        if (alreadyUpvoted) {
            // Remove the upvote if already upvoted (toggle functionality)
            await prisma.post.update({
                where: { id: postId },
                data: {
                    upvotes: {
                        set: post.upvotes.filter(id => id !== userId)
                    }
                }
            });
            return NextResponse.json({ message: 'Upvote removed' });
        } else {
            // Add upvote and remove from downvotes if necessary
            const updatedPost = await prisma.post.update({
                where: { id: postId },
                data: {
                    upvotes: {
                        push: userId
                    },
                    ...(alreadyDownvoted && {
                        downvotes: {
                            set: post.downvotes.filter(id => id !== userId)
                        }
                    })
                }
            });
            return NextResponse.json(updatedPost);
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}