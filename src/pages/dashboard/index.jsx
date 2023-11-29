import AddProjectButton from "@/components/AddProject";
import Layout from "@/components/dashboard/Layout";
import CreateNewProjectModal from "@/components/modals/CreateProject";
import ProjectCardComponent from "@/components/ProjectCard";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [username, setUsername] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get("Authorization")) {
      router.replace("/");
      return;
    }
    setUsername(localStorage.getItem("username"));
    if (localStorage.getItem("username")) {
      axios
        .get(
          process.env.NEXT_PUBLIC_API_URL +
            "/project/" +
            localStorage.getItem("username"),
          {
            domain:
              process.env.NEXT_PUBLIC_API_URL === "http://localhost:5000"
                ? "localhost"
                : process.env.NEXT_PUBLIC_DEPLOYMENT_URL,
            withCredentials: true,
          }
        )
        .then((res) => {
          // console.log(res.data.projects);
          setProjects(res.data.projects);
        })
        .catch((err) => {
          // console.log(err);
          if (err.response) return toast.error(err.response.data.message);
          toast.error("An error occurred while fetching projects!");
        });
    }
  }, [openModal]);

  const colors = [
    "yellow",
    "purple",
    "orange",
    "peach",
    "blue",
    "green",
    "violet",
    "pink",
    "cream",
  ];
  const getColor = (id) => {
    const idx = id % colors.length;
    return colors[idx];
  };

  const toCamelCase = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Layout>
      <main className="relative flex flex-col items-center h-full min-h-[90vh]">
        <CreateNewProjectModal isOpen={openModal} setOpenModal={setOpenModal} />
        <section className="shadow-md p-4 font-semibold rounded-[20px] w-full border-2 border-gray-300 gap-4 flex items-center">
          <div>
            <span className="text-3xl">{`${toCamelCase(
              username
            )}'s Projects`}</span>
          </div>
        </section>
        {projects?.length > 0 && (
          <section className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full gap-6 lg:gap-8 mt-8">
            {projects.length > 0 &&
              projects.map((project, id) => {
                return (
                  <ProjectCardComponent
                    key={project._id}
                    id={project._id}
                    title={project.title}
                    description={project.description}
                    color={getColor(id)}
                    projectId={project._id}
                    projectContributor={project.contributors}
                  />
                );
              })}
          </section>
        )}
        {projects?.length === 0 && (
          <div className="flex flex-col h-full items-center justify-center gap-4 mt-10">
            <h1 className="text-[20px] leading-[100%]">
              You have no projects yet
            </h1>
            <h1 className="text-[20px] leading-[100%]">
              Create your own or join other&apos;s projects
            </h1>
            {/* <Link href="/dashboard/create-project">
                <button type="button" className="bg-yellow text-navy px-4 py-2 rounded-[10px] hover:bg-yellow-500 transition-[background-color]">
                  Create a project
                </button>
              </Link> */}
          </div>
        )}
        <div
          className={
            "absolute bottom-[50px] sm:bottom-[40px] right-[20px] sm:right-[40px] shadow-[0_0_10px_rgba(0,0,0,.9)] rounded-full "
          }
          onClick={() => setOpenModal(true)}
        >
          <AddProjectButton />
          <div
            className={
              "bg-navy absolute top-0 w-full h-full rounded-full z-[0] " +
              (projects?.length < 1 ? "animate-ping" : "")
            }
          ></div>
        </div>
      </main>
    </Layout>
  );
}
