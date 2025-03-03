import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface UserPostParams {
    params: {
        userId: string;
        postId: string;
    };
}

export async function GET(request: NextRequest, { params }: UserPostParams) {
    try {
        const { userId, postId } = params;

        if (!userId || !postId) {
            return NextResponse.json({ error: 'userId and postId are required' }, { status: 400 });
        }

        const post = await prisma.post.findFirst({
            where: {
                id: postId,
                userId
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true
                    }
                }
            }
        });

        if (!post) {
            return NextResponse.json({ error: 'Post not found for this user' }, { status: 404 });
        }

        // Get replies if any
        let replies = {};
        if (post.replyIds && post.replyIds.length > 0) {
            replies = await prisma.post.findMany({
                where: {
                    id: { in: post.replyIds }
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            image: true
                        }
                    }
                }
            });
        }

        return NextResponse.json({ post, replies });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}