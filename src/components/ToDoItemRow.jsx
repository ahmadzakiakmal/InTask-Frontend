import StatusBadge from "./StatusBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import EditTaskStatusModal from "./modals/EditTaskStatus";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ToDoItemRow({ task, projectId, onSuccess, index }) {
  const [editStatusOpen, setStatusOpen] = useState(false);
  const [assignees, setAssignees] = useState([]);

  const showDeleteConfirmationToast = () => {
    toast.warning(`Are you sure, you want to delete "${task.name}"?`, {
      position: "top-center",
      autoClose: false, 
      closeOnClick: false,
      closeButton: <button className="text-red-500 font-light" onClick={handleDelete}>Delete</button>, 
      style: {
        color: "black",
        backgroundColor: "#E3E3ED",
        border: "2px solid #FF3E3E",
        fontWeight: "500",
        borderRadius: "10px"
      },
    });
  };
  const handleDelete = () => {
    axios.delete(process.env.NEXT_PUBLIC_API_URL + "/project/" + projectId + "/tasks/" + task._id, 
      { withCredentials: true })
      .then(()=>{
        onSuccess();
        toast.dismiss();
        toast.success(`${task.name} Successfully Deleted`);
      })
      .catch(e => {
        toast.error("Failed to Delete " + e.message);
      });
  };

  return (
    <tr className="mb-2 bg-white/5">
      <td className="text-center w-[60px] py-2 border-r border-yellow">{index + 1}</td>
      <td className="px-2 border-r border-yellow">{task?.name ?? "Discussion"}</td>
      <td className="text-center border-r border-yellow">
        <div className="flex flex-wrap gap-2 justify-center items-center">
          {task?.assignees?.map(as => {
            if(!as) return <></>;
            return (
              <span key={as.username} className="bg-purple-100 rounded-[5px] px-2 py-1 text-white">
                {as.emoticon} {as.username}
              </span>);
          })}
        </div>
      </td>
      <td className="px-2">
        <div className="flex justify-center items-center">
          <button onClick={()=>setStatusOpen(true)}>
            <StatusBadge status={task?.status} />
          </button>
        </div>
        <EditTaskStatusModal 
          isOpen={editStatusOpen}
          onClose={()=>setStatusOpen(false)}
          onSuccess={onSuccess}
          projectId={projectId}
          taskstatus={task?.status}
          taskname={task?.name}
          taskId={task?._id} />
      </td>
      <td className="mb-2 bg-red-900 hover:bg-red-800 transition border-l border-b border-yellow cursor-pointer">
        <button className="w-full" onClick={showDeleteConfirmationToast}>
          <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ffffff" }} />
        </button>
      </td>
    </tr>
  );
}
