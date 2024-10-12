// // pages/api/companyProducts.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       const companyData = await prisma.companyInfo.findMany({
//         select: {
//           id: true,
//           userId: true,
//           companyName: true,
//           Product: {
//             select: {
//               name: true,
//               category: true,
//             },
//           },
//         },
//       });

//       res.status(200).json(companyData);
//     } catch (error) {
//       console.error('Error fetching company data:', error);
//       res.status(500).json({ error: 'Unable to fetch data' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// src/app/api/rfpForm-vendorsByCat/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
  try {
    // Fetch all company instances with their products
    const companies = await prisma.companyInfo.findMany({
      select: {
        id: true,
        userId: true,
        companyName: true,
        Product: {
          select: {
            id: true,
            name: true,
            category: true,
          },
        },
      },
    });

    return NextResponse.json(companies); // Return the company and product data as JSON
  } catch (error) {
    console.error('Error fetching company data:', error);
    return NextResponse.json({ error: 'Unable to fetch data' }, { status: 500 });
  }
}

