import Modal from "react-modal";
import Button from "../Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditTaskModal({
  isOpen,
  setOpenModal,
  task,
  onClose,
  projectId,
}) {
  Modal.setAppElement("#__next");
  const [searchQuery, setSearchQuery] = useState("");
  const [assignees, setAssignees] = useState(task.assignees);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [openDropdown, setOpenDropdown] = useState(false);
  
  useEffect(() => {
    setStatus(task.status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const searchUser = () => {
    // prevent duplicate
    if (
      assignees.some((assignee) => {
        return assignee.username === searchQuery;
      })
    )
      return toast.error("User already added!");
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
        if (res.data.length === 0) {
          toast.error("No user found!");
          return;
        }
        if (assignees.includes(res.data.username)) {
          toast.error("User already added!");
          return;
        }
        const newAssignees = [
          ...assignees,
          {
            emoticon: res.data.emoticon,
            username: res.data.username,
          },
        ];
        setAssignees(newAssignees);
      })
      .catch(() => {
        toast.error("User not found!");
        // console.log(err);
      })
      .finally(() => {
        setSearchQuery("");
      });
  };

  const putUpdatedTask = () => {
    axios
      .put(
        process.env.NEXT_PUBLIC_API_URL + "/project/" + projectId + "/tasks/" + task._id,
        {
          name,
          description,
          assignees: assignees.map((a) => {
            return a.username;
          }),
          status: status.toLowerCase(),
        },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Task Updated Successfully");
        setOpenModal(false);
        onClose();
      })
      .catch((e) => {
        toast.error("error " + e.message);
        // console.log(e);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      // onClose={onClose}
      className="w-screen h-screen flex justify-center items-center rounded-[10px] absolute !z-[11] backdrop-blur-[8px] bg-navy/30"
    >
      <div
        className="w-full h-full absolute top-0"
        onClick={() => setOpenModal(false)}
      ></div>
      <div className="bg-navy w-[90%] max-h-[90vh] overflow-y-auto md:w-1/2 md:max-w-[600px] lg:max-w-[800px] p-8 rounded-[10px] relative z-[10]">
        <h1 className="text-yellow text-[32px] font-semibold text-center">
          Edit Task
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            putUpdatedTask();
          }}
          className="bg-yellow p-8 rounded-[5px] text-[20px] flex flex-col gap-4"
        >
          <label className="flex flex-col gap-2.5">
            Task Name
            <input
              className="focus:outline px-2 py-1 rounded-[4px]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2.5">
            Task Description
            <textarea
              className="focus:outline px-2 py-1 rounded-[4px] max-h-[200px] min-h-[100px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2.5">
            Task Status
            <div
              className="bg-navy w-full rounded-[4px] relative cursor-pointer select-none"
              onClick={() => {
                setOpenDropdown(!openDropdown);
              }}
            >
              {status && (
                <p
                  className={
                    "px-2 py-1 " +
                    (status.toLowerCase() === "todo"
                      ? " outline-green outline outline-[0.2px] bg-[rgba(94,238,126,0.15)] text-green"
                      : "") +
                    (status.toLowerCase() === "ongoing"
                      ? " outline-[#A3E9FF] outline outline-[0.2px] bg-[rgba(163,233,255,0.15)] text-[#94FFFF]"
                      : "") +
                    (status.toLowerCase() === "done"
                      ? " outline-[#D2C5FF] outline outline-[0.2px] bg-[rgba(150,119,255,0.15)] text-[#D2C5FF]"
                      : "")
                  }
                >
                  {status.toLowerCase() === "todo" && "To Do"}
                  {status.toLowerCase() === "ongoing" && "Doing"}
                  {status.toLowerCase() === "done" && "Done"}
                </p>
              )}
              <div
                className={
                  "bg-white shadow-[0_0_5px_rgba(0,0,0,.6)] rounded-[5px] absolute top-[calc(100%+10px)] left-0 " +
                  (openDropdown ? "" : "hidden")
                }
              >
                <p
                  className="hover:bg-navy/10 px-5 py-2 cursor-pointer "
                  onClick={() => setStatus("ToDo")}
                >
                  ToDo
                </p>
                <p
                  className="hover:bg-navy/10 px-5 py-2 cursor-pointer "
                  onClick={() => setStatus("ongoing")}
                >
                  Doing
                </p>
                <p
                  className="hover:bg-navy/10 px-5 py-2 cursor-pointer "
                  onClick={() => setStatus("Done")}
                >
                  Done
                </p>
              </div>
            </div>
          </label>
          <label className="flex flex-col gap-2.5">
            <div>
              Assignees
              <div className="flex gap-3 flex-wrap">
                {assignees.map((assignee, index) => {
                  return (
                    <div
                      className={
                        "rounded-[5px] py-1 bg-purple-100 px-2 text-white flex gap-2"
                      }
                      key={assignee.username}
                    >
                      <span>
                        {assignee.emoticon} {assignee.username}
                      </span>
                      <div
                        className="hover:text-red-200 px-1 block w-min cursor-pointer select-none"
                        onClick={() => {
                          const newAssignees = [...assignees];
                          newAssignees.splice(index, 1);
                          setAssignees(newAssignees);
                        }}
                      >
                        &times;
                      </div>
                    </div>
                  );
                })}
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
          <Button text="Edit" type="submit" />
        </form>
      </div>
    </Modal>
  );
}
