import Layout from "@/components/dashboard/Layout";
import ProjectNavbar from "@/components/ProjectNavbar";

export default function Dashboard() {
  return(
    <Layout>
      <main className="flex  flex-col items-center h-full">
        <ProjectNavbar className/>
        <h1>Projects Page</h1>
      </main>
    </Layout>
  );
}