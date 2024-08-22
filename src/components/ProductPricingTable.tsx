import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

function ProductPricingTable({ nameofPlan, price, validity }: any) {
  if (!nameofPlan) {
    return <div>No fixed pricing plans available</div>;
  }

  // Filter out entries where any of the values are ''
  const plansToRender = nameofPlan
    .map((plan: string, index: number) => ({
      plan,
      price: price[index],
      validity: validity[index],
    }))
    .filter(
      (plan: { plan: string; price: string; validity: string }) =>
        plan.plan !== "" && plan.price !== "" && plan.validity !== ""
    );

  return (
    <div className="grid gap-3 row-gap-3 sm:row-gap-3 lg:grid-cols-3 font-clarity">
      {plansToRender.map(
        (
          plan: {
            plan:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<React.AwaitedReactNode>
              | null
              | undefined;
            price:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<React.AwaitedReactNode>
              | null
              | undefined;
            validity:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<React.AwaitedReactNode>
              | null
              | undefined;
          },
          index: React.Key | null | undefined
        ) => (
          <div
            key={index}
            className="flex flex-col justify-between p-5 bg-white border rounded shadow-sm"
          >
            <div className="mb-6">
              <div className="flex items-center justify-between pb-6 mb-6 border-b">
                <div>
                  <p className="text-sm font-bold tracking-wider uppercase">
                    {plan.plan}
                  </p>
                  <p className="text-xl font-extrabold">${plan.price}</p>
                </div>
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary2">
                  {/* Placeholder for icon or image */}
                  <svg
                    className="w-8 h-8 text-gray-600"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                  >
                    <path
                      d="M12,7L12,7 c-1.657,0-3-1.343-3-3v0c0-1.657,1.343-3,3-3h0c1.657,0,3,1.343,3,3v0C15,5.657,13.657,7,12,7z"
                      fill="none"
                      stroke="currentColor"
                    />
                    <path
                      d="M15,23H9v-5H7v-6 c0-1.105,0.895-2,2-2h6c1.105,0,2,0.895,2,2v6h-2V23z"
                      fill="none"
                      stroke="currentColor"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <p className="mb-2 font-bold tracking-wide">Validity</p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="mr-2">
                      <FaRegCircleCheck className="w-4 h-4 text-primary1" />
                    </div>
                    <p className="font-medium text-gray-800">{plan.validity}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default ProductPricingTable;
