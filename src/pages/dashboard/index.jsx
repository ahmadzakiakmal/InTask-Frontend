import { useAuth } from "@/components/AuthProvider";
import Layout from "@/components/dashboard/Layout";
import ProjectCardComponent from "@/components/ProjectCard";
import ProjectNavbar from "@/components/ProjectNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [project, setProject] = useState([])
  const { user } = useAuth()

  useEffect(()=>{
    if(user){
      axios.get(process.env.NEXT_PUBLIC_API_URL + '/project/' + user.username)
      .then(res=> {
        setProject(res.data.projects)
      })
      .catch(e=>{toast.info('error : ' + e.message)})  
    }
    else
      toast.info("Please login")
  }, [user])

  const colors = ['yellow', 'purple', 'orange', 'peach', 'blue', 'green', 'violet', 'pink', 'cream']
  const getColor = (id) => {
    const idx = id % (colors.length)
    return colors[idx];
  }

  return(
    <Layout>
      <main className="flex flex-col items-center h-full">
        <ProjectNavbar/>
        {user?.username ?? "not logged in"}
        <section className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full gap-6 lg:gap-8 mt-8" >
          {project.map((project, id) => {
            return(
              <ProjectCardComponent 
                key={project._id} 
                title={project.title} 
                description={project.description} 
                color={getColor(id)}
                projectId={project._id}
                projectContributor = {project.contributors}/>
            )
          })}
        </section>
      </main>
    </Layout>
  );
}