

import "../../app/globals.css";

import { Sidebar } from "./_components/Sidebar"; // Adjust path as needed
import { ClarityCity } from "@/utils/customFont";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${ClarityCity.variable} `}>
      {children}
        {/* Main Content Area */}
        {/* <div className="flex-1 md:pl-96 p-6 mt-10 md:mt-0"></div> */}
      </body>
    </html>
  );
}
