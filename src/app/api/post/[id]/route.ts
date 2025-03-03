import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface PostParams {
    params: {
        id: string;
    };
}

export async function GET(request: NextRequest, { params }: PostParams) {
    try {
        const id = params.id;

        const post = await prisma.post.findUnique({
            where: { id }
        });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json({ post });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



/**
 * UPDATE A POST
 */
export async function PUT(request: NextRequest, { params }: PostParams) {
    try {
        const id = params.id;
        const body = await request.json();
        const { userId, content, poll, categories } = body;

        if (!id || !userId) {
            return NextResponse.json({ error: 'id and userId are required' }, { status: 400 });
        }

        // Check if the post exists and belongs to the user
        const post = await prisma.post.findUnique({
            where: { id: id }
        });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        if (post.userId !== userId) {
            return NextResponse.json({ error: 'Unauthorized to update this post' }, { status: 403 });
        }

        const updatedPost = await prisma.post.update({
            where: { id },
            data: {
                content: content || post.content,
                poll: poll || post.poll,
                categories: categories || post.categories,
            }
        });

        return NextResponse.json(updatedPost);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


/**
 * DELETE A POST
 */
export async function DELETE(request: NextRequest, { params }: PostParams) {
    try {
        const id = params.id;
        const body = await request.json();
        const { userId } = body;

        if (!id || !userId) {
            return NextResponse.json({ error: 'id and userId are required' }, { status: 400 });
        }

        // Check if the post exists and belongs to the user
        const post = await prisma.post.findUnique({
            where: { id: id }
        });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        if (post.userId !== userId) {
            return NextResponse.json({ error: 'Unauthorized to delete this post' }, { status: 403 });
        }

        await prisma.post.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Post deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}