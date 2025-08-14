import LearningHubPage from "@/components/LearningHubPage";

export const metadata = {
  title: "Learning Hub | Legal Resources & Educational Content",
  description: "Explore our comprehensive learning hub featuring legal industry reports, market trends, best practices, and educational resources for legal professionals.",
  openGraph: {
    title: "Learning Hub | Legal Resources & Educational Content",
    description: "Explore our comprehensive learning hub featuring legal industry reports, market trends, best practices, and educational resources for legal professionals.",
    type: "website",
  },
};

export default function LearningHubRoute() {
  return <LearningHubPage />;
}