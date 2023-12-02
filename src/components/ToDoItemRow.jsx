import StatusBadge from "./StatusBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import EditTaskStatusModal from "./modals/EditTaskStatus";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ToDoItemRow({ task, projectId, onSuccess }) {
  const [editStatusOpen, setStatusOpen] = useState(false);

  const handleDelete = () => {
    axios.delete(process.env.NEXT_PUBLIC_API_URL + "/project/" + projectId + "/tasks/" + task._id, 
      { withCredentials: true })
      .then(()=>{
        onSuccess();
        toast.info(`deleted ${task.name}`);
      })
      .catch(e => {
        toast.error("failed to delete " + e.message);
      });
  };

  return (
    <tr className="mb-2 bg-white/5">
      <td className="text-center w-[60px] py-2 border-r border-yellow">1</td>
      <td className="px-2 border-r border-yellow">{task?.name ?? "Discussion"}</td>
      <td className="text-center border-r border-yellow">{task?.assignees?.map(as =>("🤡 " + as + " "))}</td>
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
      <td className="mb-2 bg-red-900 border-l border-b border-yellow">
        <button className="w-full" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ffffff" }} />
        </button>
      </td>
    </tr>
  );
}
