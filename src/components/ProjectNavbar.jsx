import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserXmark, faListUl, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import AddFriendModal from "./modals/AddFriendModal";
import RemoveFriendModal from "./modals/RemoveFriendModal";
import { useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import EditProjectModal from "./modals/EditProject";
import Cookies from "js-cookie";
import { LoadingContext } from "@/context/LoadingContext";

export default function ProjectNavbar({ project, onEdit }) {
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [isRemoveFriendOpen, setIsRemoveFriendOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditProjectOpen, setOpenEditProject] = useState(false);
  const [contributors, setContributors] = useState([]);
  const dropdownRef = useRef(null);
  const { setLoading } = useContext(LoadingContext);
  const router = useRouter();

  const loadProjectContributors = () => {
    setLoading(true);
    if (project.projectId !== undefined && project.projectId) {
      axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/project/" + project.projectId + "/contributors", {
          withCredentials: true,
        })
        .then((res) => {
          setContributors(res.data.contributors);
          setLoading(false);
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            localStorage.clear();
            Cookies.remove("Authorization");
            toast.error("Session Expired! Please login again.");
          }
          toast.error("An error occurred!");
          router.push("/auth/login");
        });
    }
  };

  const handleOpenAddFriendModal = () => {
    setIsAddFriendOpen(true);
  };

  const handleCloseAddFriendModal = () => {
    setIsAddFriendOpen(false);
  };

  const handleOpenRemoveFriendModal = () => {
    setIsRemoveFriendOpen(true);
    loadProjectContributors();
  };

  const handleCloseRemoveFriendModal = () => {
    setIsRemoveFriendOpen(false);
    loadProjectContributors();
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleClickOutsideDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  return (
    <section className="shadow-md p-4 font-semibold rounded-[20px] w-full border-2 border-gray-300 gap-4 flex items-center">
      <EditProjectModal
        isOpen={isEditProjectOpen}
        setOpenModal={setOpenEditProject}
        project={project}
        onEdit={onEdit}
      />
      <div className="float-left">
        <Link href="/dashboard">
          <span className="text-3xl">{project?.title ?? "Task"}</span>
        </Link>
      </div>
      <ul className="font-extralight ml-auto flex gap-5 xl:gap-6 text-[#5F5858]">
        <li className="hidden xl:block cursor-pointer hover:text-blue-500">
          <button type="button" onClick={handleOpenAddFriendModal}>
            <FontAwesomeIcon icon={faUserPlus} />
            <span className="ml-2">Add Contributor</span>
          </button>
          <AddFriendModal isOpen={isAddFriendOpen} onClose={handleCloseAddFriendModal} setOpenModal={setIsAddFriendOpen} projectId={project?.projectId}/>
        </li>
        <li className="hidden xl:block cursor-pointer hover:text-blue-500">
          <button type="button" onClick={handleOpenRemoveFriendModal}>
            <FontAwesomeIcon icon={faUserXmark} />
            <span className="ml-2">Remove Contributor</span>
          </button>
          <RemoveFriendModal isOpen={isRemoveFriendOpen} onClose={handleCloseRemoveFriendModal} projectId={project?.projectId} projectContributor={contributors} />
        </li>
        <li className="hidden xl:block cursor-pointer hover:text-blue-500">
          <button onClick={() => setOpenEditProject(true)}>
            <FontAwesomeIcon icon={faListUl} />
            <span className="ml-2">Project Settings</span>
          </button>
        </li>
        <li className="xl:hidden cursor-pointer text-[18px]" onClick={handleToggleDropdown} ref={dropdownRef}>
          <FontAwesomeIcon icon={faBars} className="text-[22px] xs:text-[16px]"/>
          <span className="ml-2 hidden xs:inline">Menu</span>
        </li>
      </ul>
      {isDropdownOpen && (
        <ul className="lg:hidden absolute mt-12 right-5 rounded-[20px] shadow-md font-extralight text-[#5F5858] bg-neutral p-5" ref={dropdownRef}>
          <li className="block cursor-pointer hover:text-blue-500">
            <button type="button" onClick={handleOpenAddFriendModal}>
              <FontAwesomeIcon icon={faUserPlus} />
              <span className="ml-2">Add Friend</span>
            </button>
          </li>
          <li className="block cursor-pointer hover:text-blue-500">
            <button type="button" onClick={handleOpenRemoveFriendModal}>
              <FontAwesomeIcon icon={faUserXmark} />
              <span className="ml-2">Remove Friend</span>
            </button>
          </li>
          <li className="block cursor-pointer hover:text-blue-500">
            <button onClick={() => setOpenEditProject(true)}>
              <FontAwesomeIcon icon={faListUl} />
              <span className="ml-2">Edit Project</span>
            </button>
          </li>
        </ul>
      )}
    </section>
  );
}
