import Layout from "@/components/dashboard/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Button from "@/components/Button";
import TaskTable from "@/components/TaskTable";
import AddProjectButton from "@/components/AddProject";
import NewTaskModal from "@/components/modals/AddNewTask";
import ToDoItem from "@/components/ToDo";
import ProjectNavbar from "@/components/ProjectNavbar";

function KanbanContainer({ status, tasks }) {
  return (
    <section className="py-[10px] px-6 space-y-2 bg-navy rounded-[20px] text-yellow">
      <h1 className="text-center text-[22px] font-bold">{status}</h1>
      {tasks.map(task => (<ToDoItem taskname={task.name} />))}
    </section>
  );
}

export default function Project() {
  const [view, setView] = useState("kanban");
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState({})
  const [openNewTaskModal, setOpenNewTaskModal] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const loadTaskData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/project/" + id + "/tasks", 
      { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(loadTaskData, [id]);

  const loadProjectData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/project/id/" + id, 
      { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setProject(res.data.project);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(loadProjectData, [id])
  

  return (
    <Layout>
      <NewTaskModal isOpen={openNewTaskModal} setOpenModal={setOpenNewTaskModal} />
      <main className="relative flex flex-col h-full min-h-[90vh]">
        <ProjectNavbar
          project={{ title: project.title, projectId: id, projectContributor: project.contributors }}
        />
        <h1>Select View: {view}</h1>
        <div className="flex gap-3 mb-4">
          <Button text="Kanban" onClick={() => setView("kanban")} />
          <Button text="Table" onClick={() => setView("table")} />
        </div>
        <section>
          {/* //? Kanban View */}
          {view === "kanban" && (
            <section className="grid grid-cols-3 gap-10">
              <KanbanContainer status="To Do" tasks={tasks.filter(t => t.status == 'todo')} />
              <KanbanContainer status="Doing" tasks={tasks.filter(t => t.status == 'ongoing')} />
              <KanbanContainer status="Done" tasks={tasks.filter(t => t.status == 'done')} />
            </section>
          )}

          {/* //? Table View */}
          {view === "table" && (
            <section>
              <TaskTable
                tasks={tasks}
                onEdit={() => loadTaskData()}
                projectId={id}
              />
            </section>
          )}
        </section>
        <div
          className={
            "absolute bottom-[50px] sm:bottom-[40px] right-[20px] sm:right-[40px] shadow-[0_0_10px_rgba(0,0,0,.9)] rounded-full z-[10]"
          }
          onClick={() => setOpenNewTaskModal(true)}
        >
          <AddProjectButton />
          <div
            className={
              "bg-navy absolute top-0 w-full h-full rounded-full z-[0] " +
              (tasks?.length < 1 ? "animate-ping" : "")
            }
          ></div>
        </div>
      </main>
    </Layout>
  );
}
