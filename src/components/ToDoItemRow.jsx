import StatusBadge from "./StatusBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import EditTaskStatusModal from "./modals/EditTaskStatus";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EditTaskModal from "./modals/EditTaskModal";

export default function ToDoItemRow({ task, projectId, onSuccess, index, refetch }) {
  const [editStatusOpen, setStatusOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const showDeleteConfirmationToast = () => {
    toast.warning(`Are you sure you want to delete "${task.name}"?`, {
      position: "top-center",
      autoClose: true,
      closeOnClick: false,
      closeButton: (
        <button
          className="text-red-500 font-light bg-white hover:bg-white/80 transition rounded-[5px] px-2"
          onClick={handleDelete}
        >
          Delete
        </button>
      ),
      className: "delete-toast",
    });
  };
  const handleDelete = () => {
    axios
      .delete(
        process.env.NEXT_PUBLIC_API_URL +
          "/project/" +
          projectId +
          "/tasks/" +
          task._id,
        { withCredentials: true }
      )
      .then(() => {
        onSuccess();
        toast.dismiss();
        toast.success(`${task.name} Successfully Deleted`);
      })
      .catch((e) => {
        toast.error("Failed to Delete " + e.message);
      });
  };

  return (
    <>
      <EditTaskModal task={task} projectId={projectId} isOpen={editModalOpen} setOpenModal={setEditModalOpen} onClose={refetch}/>
      <tr className="mb-2 bg-white/5">
        <td className="text-center w-[60px] border-r border-yellow">
          {index + 1}
        </td>
        <td className="px-2 border-r border-yellow">
          {task?.name ?? "Discussion"}
        </td>
        <td className="text-center border-r border-yellow p-2">
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {task?.assignees?.map((as) => {
              if (!as) return <></>;
              return (
                <span
                  key={as.username}
                  className="bg-purple-100 rounded-[5px] px-2 text-white"
                >
                  {as.emoticon} {as.username}
                </span>
              );
            })}
          </div>
        </td>
        <td className="px-2">
          <div className="flex justify-center items-center">
            <button onClick={() => setStatusOpen(true)}>
              <StatusBadge status={task?.status} />
            </button>
          </div>
          <EditTaskStatusModal
            isOpen={editStatusOpen}
            onClose={() => setStatusOpen(false)}
            onSuccess={onSuccess}
            projectId={projectId}
            taskstatus={task?.status}
            taskname={task?.name}
            taskId={task?._id}
          />
        </td>
        <td className="border-l border-b border-yellow cursor-pointer">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <button
              className="w-full h-full transition bg-blue-900 hover:bg-blue-800 py-2"
              onClick={() => {
                setEditModalOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faEdit} className="text-white" />
            </button>
            <button
              className="w-full h-full transition bg-red-900 hover:bg-red-800 py-2"
              onClick={showDeleteConfirmationToast}
            >
              <FontAwesomeIcon icon={faTrashCan} className="text-white" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
