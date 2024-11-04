import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();  // Parse the request body
    const { tableName, email } = body; // Extract the table name and email from the request

    // Validate inputs
    if (!tableName || !email) {
      return new Response(
        JSON.stringify({ error: 'Table name and email are required.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if the table exists and perform the deletion
    const deleteOperation = await prisma[tableName].deleteMany({
      where: { email: email }
    });

    return new Response(
      JSON.stringify({ message: `Deleted ${deleteOperation.count} record(s) from ${tableName} table for email: ${email}.` }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error deleting data:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to delete data' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
