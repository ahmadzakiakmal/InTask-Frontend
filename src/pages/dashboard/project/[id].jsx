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
import { useContext } from "react";
import { LoadingContext } from "@/context/LoadingContext";

function KanbanContainer({ status, tasks, id, initialStatus, setInitialStatus, openModal }) {
  const { setNodeRef } = useDroppable({ id: id });
  return (
    <section
      className="pt-[10px] pb-5 px-6 space-y-2 bg-navy rounded-[20px] text-yellow h-min"
      ref={setNodeRef}
    >
      <h1 className="text-center text-[22px] font-bold">{status}</h1>
      {tasks.map((task) => (
        <ToDoItem
          key={task._id}
          taskname={task.name}
          id={task._id}
          desc={task.description}
          assignees={task.assignees}
        />
      ))}
      <button className="flex items-center gap-2 p-[10px] hover:bg-yellow/10 w-full rounded-[10px] transition" onClick={() => {
        setInitialStatus(initialStatus);
        openModal();
      }}>
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 5.25V18.75M19.25 12H5.75"
            stroke="#D6D5A8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Add a task</span>
      </button>
    </section>
  );
}

export default function Project() {
  const [view, setView] = useState("kanban");
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState({});
  const [openNewTaskModal, setOpenNewTaskModal] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [initialStatus, setInitialStatus] = useState("todo");
  const { setLoading } = useContext(LoadingContext);

  const router = useRouter();
  const { id } = router.query;

  const loadTaskData = () => {
    setLoading(true);
    if (id !== undefined && id) {
      axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/project/" + id + "/tasks", {
          withCredentials: true,
        })
        .then((res) => {
          const assignees = res.data.assignees;
          const tasks = res.data.tasks
            .map((task, id)=>({
              ...task, 
              assignees: assignees[id]
            }));
          setTasks(tasks);
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            localStorage.clear();
            Cookies.remove("Authorization");
            router.push("/auth/login");
            return toast.error("Session Expired! Please login again.");
          }
          toast.error("An error occurred!");
        })
        .finally(() => {
          setLoading(false);
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
        // console.log(res.data.project);
        setProject(res.data.project);
      })
      .catch(() => {
        toast.error("An error occurred while fetching project data.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      .catch(() => {
        toast.error("An error occurred while updating task status.");
      });
  };

  return (
    <Layout>
      <NewTaskModal
        isOpen={openNewTaskModal}
        setOpenModal={setOpenNewTaskModal}
        id={id}
        onClose={() => setRefetch(!refetch)}
        initialStatus={initialStatus}
        assigneesOptions={project?.contributors}
      />
      <main className="relative flex flex-col h-full min-h-[90vh]">
        <ProjectNavbar
          onEdit={()=>loadProjectData()}
          project={{
            title: project.title,
            projectId: id,
            description: project.description
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
            <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-10">
              <DndContext onDragEnd={updateTaskStatus}>
                <KanbanContainer
                  status="To Do"
                  id="todo"
                  tasks={tasks.filter((t) => t.status == "todo")}
                  initialStatus="ToDo"
                  setInitialStatus={setInitialStatus}
                  openModal={() => setOpenNewTaskModal(true)}
                />
                <KanbanContainer
                  status="Doing"
                  id="ongoing"
                  tasks={tasks.filter((t) => t.status == "ongoing")}
                  initialStatus="ongoing"
                  setInitialStatus={setInitialStatus}
                  openModal={() => setOpenNewTaskModal(true)}
                />
                <KanbanContainer
                  status="Done"
                  id="done"
                  tasks={tasks.filter((t) => t.status == "done")}
                  initialStatus="Done"
                  setInitialStatus={setInitialStatus}
                  openModal={() => setOpenNewTaskModal(true)}
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
                setTasks={setTasks}
                project={project}
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
