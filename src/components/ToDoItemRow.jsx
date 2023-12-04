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

  useEffect(() => {
    if(task.assignees.length > 0) {
      axios.get(process.env.NEXT_PUBLIC_API_URL + "/user/search/" + task.assignees.join("%7C"), {
        withCredentials: true,
      })
        .then((res) => {
          setAssignees(res.data.users);
        })
        .catch(() => {
          toast.error("Error fetching assignees");
        });    
    }
  }, []);

  return (
    <tr className="mb-2 bg-white/5">
      <td className="text-center w-[60px] py-2 border-r border-yellow">{index + 1}</td>
      <td className="px-2 border-r border-yellow">{task?.name ?? "Discussion"}</td>
      <td className="text-center border-r border-yellow">
        <div className="flex flex-wrap gap-2 justify-center items-center">
          {assignees?.map(as => (
            <span key={as.username} className="bg-purple-100 rounded-[5px] px-2 py-1 text-white">
              {as.emoticon} {as.username}
            </span>
          ))}
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
        <button className="w-full" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ffffff" }} />
        </button>
      </td>
    </tr>
  );
}
