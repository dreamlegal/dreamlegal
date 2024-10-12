// // pages/api/rfp/index.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   try {
//     const { vendorId } = await req.json();

//     if (!vendorId || typeof vendorId !== 'string') {
//       return new Response(JSON.stringify({ success: false, message: 'Vendor ID is required.' }), { status: 400 });
//     }

//     // Fetch all RFP forms from the database
//     const rfpForms = await prisma.rfpForm.findMany();

//     // Filter forms where the vendorId is present in either byProduct or byCategory
//     const filteredRfpForms = rfpForms.filter(form => {
//       const vendors = form.vendors as any; // Cast as any for JSON type

//       // Check byProduct
//       const byProductIncludesVendor = vendors.byProduct.products.some((product: any) => product.vendorId === vendorId);

//       // Check byCategory
//       const byCategoryIncludesVendor = vendors.byCategory.vendors.some((vendor: any) => vendor.vendorId === vendorId);

//       return byProductIncludesVendor || byCategoryIncludesVendor;
//     });

//     // Return the filtered RFP forms
//     return new Response(JSON.stringify({ success: true, data: filteredRfpForms }), { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 });
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { vendorId } = await req.json();

    if (!vendorId || typeof vendorId !== 'string') {
      return new Response(JSON.stringify({ success: false, message: 'Vendor ID is required.' }), { status: 400 });
    }

    // Fetch all RFP forms from the database, ordered by createdAt in descending order
    const rfpForms = await prisma.rfpForm.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Filter forms where the vendorId is present in either byProduct or byCategory
    const filteredRfpForms = rfpForms.filter(form => {
      const vendors = form.vendors as any; // Cast as any for JSON type

      // Check byProduct
      const byProductIncludesVendor = vendors.byProduct.products.some((product: any) => product.vendorId === vendorId);

      // Check byCategory
      const byCategoryIncludesVendor = vendors.byCategory.vendors.some((vendor: any) => vendor.vendorId === vendorId);

      return byProductIncludesVendor || byCategoryIncludesVendor;
    });

    // Return the filtered RFP forms
    return new Response(JSON.stringify({ success: true, data: filteredRfpForms }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 });
  }
}