import Modal from "react-modal";
import Button from "../Button";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { setRequestMeta } from "next/dist/server/request-meta";

export default function NewTaskModal({
  isOpen,
  onClose,
  projectId,
  onSuccess,
  contributors,
  setOpenModal,
}) {
  Modal.setAppElement("#__next");
  const [searchQuery, setSearchQuery] = useState("");
  const [assignees, setAssignees] = useState(["test"]);
  const searchUser = () => {
    axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/user/search",
        {
          searchQuery: searchQuery,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.length === 0) {
          toast.error("No user found!");
          return;
        }
        console.log(res.data);
        const newAssignees = [...assignees, res.data.username];
        console.log(newAssignees);
        setAssignees(newAssignees);
      })
      .catch((err) => {
        toast.error("User not found!");
        console.log(err);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      className="w-screen h-screen flex justify-center items-center rounded-[10px] absolute !z-[11] backdrop-blur-[8px] bg-navy/30"
    >
      <div
        className="w-full h-full absolute top-0"
        onClick={() => setOpenModal(false)}
      ></div>
      <div className="bg-navy w-[90%] md:w-1/2 md:max-w-[600px] lg:max-w-[800px] p-8 rounded-[10px] relative z-[10]">
        <h1 className="text-yellow text-[32px] font-semibold text-center">
          Create Project
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // createProject(e);
          }}
          className="bg-yellow p-8 rounded-[5px] text-[20px] flex flex-col gap-4"
        >
          <label className="flex flex-col gap-2.5">
            Task Name
            <input
              className="focus:outline px-2 py-1 rounded-[4px]"
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2.5">
            Task Description
            <textarea
              className="focus:outline px-2 py-1 rounded-[4px] max-h-[200px] min-h-[100px]"
              // value={description}
              // onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2.5">
            Task Status
            <select
              className="focus:outline px-2 py-1 rounded-[4px]"
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
            >
              <option value="To Do">To Do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </label>
          <label className="flex flex-col gap-2.5">
            <div>
            Assignees
              <div className="flex gap-3">
                {
                  assignees.map((assignee) => {
                    return <span className="bg-navy rounded-[5px]" key={assignee}>{assignee}</span>;
                  })
                }
              </div>
            </div>
            <div className="flex gap-3 bg-white w-full pl-1 pr-2 py-1 rounded-[4px]">
              <input
                className="focus:outline px-2 py-1 rounded-[4px] w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="flex-shrink-0"
                onClick={(e) => {
                  e.preventDefault();
                  searchUser();
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C3 7.68333 3.62933 6.146 4.888 4.888C6.14667 3.63 7.684 3.00067 9.5 3C11.3167 3 12.8543 3.62933 14.113 4.888C15.3717 6.14667 16.0007 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5633 11.8133 14.0007 10.7507 14 9.5C14 8.25 13.5627 7.18767 12.688 6.313C11.8133 5.43833 10.7507 5.00067 9.5 5C8.25 5 7.18767 5.43767 6.313 6.313C5.43833 7.18833 5.00067 8.25067 5 9.5C5 10.75 5.43767 11.8127 6.313 12.688C7.18833 13.5633 8.25067 14.0007 9.5 14Z"
                    fill="#D6D5A8"
                  />
                </svg>
              </button>
            </div>
          </label>
          <Button text="Create" type="submit" />
        </form>
      </div>
    </Modal>
  );
}
