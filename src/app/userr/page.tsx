

// // import { redirect } from "next/navigation";
// // export default function UserPage() {
// //     redirect("/auth/user/login");
    
// // }
// // // return <div> Hello</div>;
// // /userr/page.js
// "use client"
// export default function UserPage() {
//     return (
//       <div>
//         <h1>User Page</h1>
//         <p>
//           Please <a href="/auth/user/login">click here</a> to log in.
//         </p>
//       </div>
//     );
//   }
  

// /userr/page.js
import Link from "next/link";

export default function UserPage() {
  return (
    <div>
      <h1>User Page</h1>
      <p>
        Please <Link href="/auth/user/login">click here</Link> to log in.
      </p>
    </div>
  );
}
