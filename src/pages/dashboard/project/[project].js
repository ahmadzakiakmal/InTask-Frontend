import AddProjectButton from "@/components/AddProject";
import ProjectNavbar from "@/components/ProjectNavbar";
import TaskTable from "@/components/TaskTable";
import Layout from "@/components/dashboard/Layout";
import NewTask from "@/components/modals/AddNewTask";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Project() {
  const router = useRouter();
  const { project, projectId, projectContributor } = router.query;
  const [tasks, setTasks] = useState([]);
  const [addTaskOpen, setTaskOpen] = useState(false);

  const loadTaskData = () => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL + "/project/" + projectId + "/tasks",
        {}
      )
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.info("error : " + e.message);
      });
  };
  useEffect(loadTaskData, [projectId]);

  return (
    <Layout>
      <ProjectNavbar
        project={{ title: project, projectId, projectContributor }}
      />
      <TaskTable
        tasks={tasks}
        onEdit={() => loadTaskData()}
        projectId={projectId}
      />
      <NewTask
        isOpen={addTaskOpen}
        projectId={projectId}
        contributors={projectContributor}
        onClose={() => setTaskOpen(false)}
        onSuccess={() => loadTaskData()}
      />
      <div className="fixed right-10 bottom-10">
        <AddProjectButton onClick={() => setTaskOpen(true)} />
      </div>
    </Layout>
  );
}
