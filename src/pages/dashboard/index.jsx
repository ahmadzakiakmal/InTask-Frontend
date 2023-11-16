import Layout from "@/components/dashboard/Layout";
import ProjectCardComponent from "@/components/ProjectCard";
import ProjectNavbar from "@/components/ProjectNavbar";

export default function Dashboard() {
  const projects = [
    {
      title: "Project 1",
      id: 1,
      color: "yellow"
    },
    {
      title: "Project 2",
      id: 2,
      color: "purple"
    },
    {
      title: "Project 3",
      id: 3,
      color: "orange"
    },
    {
      title: "Project 4",
      id: 4,
      color: "peach"
    },
    {
      title: "Project 5",
      id: 5,
      color: "blue"
    },
    {
      title: "Project 6",
      id: 6,
      color: "green"
    },
    {
      title: "Project 6",
      id: 6,
      color: "violet"
    },
    {
      title: "Project 6",
      id: 6,
      color: "pink"
    },
    {
      title: "Project 6",
      id: 6,
      color: "cream"
    },
  ];
  return(
    <Layout>
      <main className="flex flex-col items-center h-full">
        <ProjectNavbar/>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full gap-8 mt-8" >
          {
            projects.map((project) => {
              return(
                <ProjectCardComponent key={project.id} title={project.title} color={project.color}/>
              );
            })
          }
        </section>
      </main>
    </Layout>
  );
}