import ProjectNavbar from "@/components/ProjectNavbar";
import TaskTable from "@/components/TaskTable";
import Layout from "@/components/dashboard/Layout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Project(){
    const router = useRouter()
    const {project, projectId, projectContributor} = router.query
    const [tasks, setTasks] = useState([])

    useEffect(()=>{
        axios.get(process.env.NEXT_PUBLIC_API_URL + '/project/' + projectId + '/tasks', {
            withCredentials: true
        })
        .then(res=> {
            setTasks(res.data.tasks)
        })
        .catch(e=>{toast.info('error : ' + e.message)})  
    }, [])

    return (
        <Layout>
            <ProjectNavbar project={{ title: project, projectId, projectContributor}} />
            <TaskTable tasks={tasks} />
        </Layout>
    )
}