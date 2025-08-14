import LegalBlogsPage from "@/components/LegalBlogsPage";

export const metadata = {
  title: "Legal Blogs & Resources | Legal Insights and Expertise",
  description: "Explore our collection of expert legal insights, articles, and resources to stay informed on the latest trends and developments in the legal industry.",
  openGraph: {
    title: "Legal Blogs & Resources | Legal Insights and Expertise",
    description: "Explore our collection of expert legal insights, articles, and resources to stay informed on the latest trends and developments in the legal industry.",
    type: "website",
  },
};

export default function LegalBlogsRoute() {
  return <LegalBlogsPage />;
}