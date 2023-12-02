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
import { DndContext, useDroppable } from "@dnd-kit/core";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function KanbanContainer({ status, tasks, id }) {
  const { setNodeRef } = useDroppable({ id: id });
  return (
    <section
      className="pt-[10px] pb-5 px-6 space-y-2 bg-navy rounded-[20px] text-yellow"
      ref={setNodeRef}
    >
      <h1 className="text-center text-[22px] font-bold">{status}</h1>
      {tasks.map((task) => (
        <ToDoItem key={task._id} taskname={task.name} id={task._id} />
      ))}
    </section>
  );
}

export default function Project() {
  const [view, setView] = useState("kanban");
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState({});
  const [openNewTaskModal, setOpenNewTaskModal] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const loadTaskData = () => {
    if (id !== undefined && id) {
      axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/project/" + id + "/tasks", {
          withCredentials: true,
        })
        .then((res) => {
          // console.log(res.data.tasks);
          setTasks(res.data.tasks);
        })
        .catch((err) => {
          // console.log("API Error for id:", id, err);
          if (err.response.status === 401) {
            localStorage.clear();
            Cookies.remove("Authorization");
            router.push("/auth/login");
            return toast.error("Session Expired! Please login again.");
          }
          toast.error("An error occurred!");
        });
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadTaskData, [router, refetch]);

  const loadProjectData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/project/id/" + id, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data);
        setProject(res.data.project);
      })
      .catch(() => {
        // console.log(err);
        toast.error("An error occurred while fetching project data.");
      });
  };
  useEffect(loadProjectData, [id]);

  const updateTaskStatus = ({ active, over }) => {
    if (over == null) return;
    axios
      .patch(
        process.env.NEXT_PUBLIC_API_URL +
          "/project/" +
          id +
          "/tasks/" +
          active.id,
        { status: over.id },
        { withCredentials: true }
      )
      .then(() => {
        loadTaskData();
      })
      .catch((e) => {
        toast.error("error " + e.message);
      });
  };

  return (
    <Layout>
      <NewTaskModal
        isOpen={openNewTaskModal}
        setOpenModal={setOpenNewTaskModal}
        id={id}
        onClose={() => setRefetch(!refetch)}
      />
      <main className="relative flex flex-col h-full min-h-[90vh]">
        <ProjectNavbar
          project={{
            title: project.title,
            projectId: id,
          }}
        />
        <div className="flex items-center gap-3 my-4">
          <h1 className="font-bold text-[20px]">Select View: </h1>
          <Button text="Kanban" onClick={() => setView("kanban")} />
          <Button text="Table" onClick={() => setView("table")} />
        </div>
        <section>
          {/* //? Kanban View */}
          {view === "kanban" && (
            <section className="grid grid-cols-3 gap-10">
              <DndContext onDragEnd={updateTaskStatus}>
                <KanbanContainer
                  status="To Do"
                  id="todo"
                  tasks={tasks.filter((t) => t.status == "todo")}
                />
                <KanbanContainer
                  status="Doing"
                  id="ongoing"
                  tasks={tasks.filter((t) => t.status == "ongoing")}
                />
                <KanbanContainer
                  status="Done"
                  id="done"
                  tasks={tasks.filter((t) => t.status == "done")}
                />
              </DndContext>
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
