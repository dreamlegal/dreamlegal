import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET ALL POST
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const category = searchParams.get('category');

        const skip = (page - 1) * limit;

        const where: any = {};
        if (category) {
            where.categories = {
                has: category
            };
        }

        const posts = await prisma.post.findMany({
            where,
            include: {
                user: {
                    select: {
                        name: true,
                        image: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            skip,
            take: limit
        });

        const totalPosts = await prisma.post.count({ where });

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


/**
 * CREATE A POST
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, content, poll, categories } = body;

        if (!userId || !content) {
            return NextResponse.json({ error: 'userId and content are required' }, { status: 400 });
        }

        // Get the username from the user
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { name: true }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const newPost = await prisma.post.create({
            data: {
                userId,
                username: user.name || 'anonymous',
                content,
                poll: poll || null,
                categories: categories || [],
                replyIds: []
            }
        });

        return NextResponse.json(newPost, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}