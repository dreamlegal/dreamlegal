// app/api/clear-table/route.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();  // Parse the request body
    const { tableName } = body;     // Extract the table name from the request

    // Validate table name presence
    if (!tableName) {
      return new Response(JSON.stringify({ error: 'Table name is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Dynamically clear the specified table
    const deleteOperation = await prisma[tableName].deleteMany();

    return new Response(
      JSON.stringify({ message: `Deleted ${deleteOperation.count} rows from ${tableName} table.` }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error deleting data:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } finally {
    await prisma.$disconnect();
  }
}
