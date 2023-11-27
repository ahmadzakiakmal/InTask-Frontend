import Layout from "@/components/dashboard/Layout";
import ProjectCardComponent from "@/components/ProjectCard";
import ProjectNavbar from "@/components/ProjectNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [project, setProject] = useState([])
  const username = 'ncgalih'
  useEffect(()=>{
    axios.get(process.env.NEXT_PUBLIC_API_URL + '/project/' + username)
    .then(res=> {
      setProject(res.data.projects)
    })
    .catch(e=>{toast.info('err ' + e.message)})
  }, [])
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
      id: 7,
      color: "violet"
    },
    {
      title: "Project 6",
      id: 8,
      color: "pink"
    },
    {
      title: "Project 6",
      id: 9,
      color: "cream"
    },
  ];
  return(
    <Layout>
      <main className="flex flex-col items-center h-full">
        <ProjectNavbar/>
        <section className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full gap-6 lg:gap-8 mt-8" >
          {project.map(project => {
            return(
              <ProjectCardComponent key={project._id} title={project.title} color={'purple'}/>
            )
          })}
        </section>
      </main>
    </Layout>
  );
}