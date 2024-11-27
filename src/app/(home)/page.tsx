import HomePage from "@/pages/HomePage";
import Image from "next/image";
import MainHomePage from "@/pages/MainHomePage";
// async function getData() {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-all-products`,
//     {
//       next: { revalidate: 60 },
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return response.json();
// }

export default async function Home() {
  // const data = await getData();
  // return <HomePage ></HomePage>;
  return <MainHomePage/>;
}
