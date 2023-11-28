import ProjectNavbar from "@/components/ProjectNavbar";
import Layout from "@/components/dashboard/Layout";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Project(){
    const router = useRouter()
    const {project, projectId} = router.query

    return (
        <Layout>
            <ProjectNavbar project={{ title: project, projectId}} />
        </Layout>
    )
}