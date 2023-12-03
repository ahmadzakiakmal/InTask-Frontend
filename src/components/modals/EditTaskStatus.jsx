import Modal from "react-modal";
import StatusBadge from "../StatusBadge";
import { useState } from "react";
import Button from "../Button";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditTaskStatusModal({ isOpen, taskstatus, taskname, projectId, taskId, onClose, onSuccess }){
  const [status, setStatus] = useState(taskstatus ?? "todo");
  const editStatus = () => {
    axios.patch(process.env.NEXT_PUBLIC_API_URL + "/project/" + projectId + "/tasks/" + taskId, 
      { status: status }, 
      { withCredentials: true })
      .then(()=>{
        onSuccess();
        onClose();
      })
      .catch(e => {
        toast.error("error " + e.message);
      });
  };
  return (
    <Modal 
      className="p-6 bg-navy fixed left-[50%] rounded translate-x-[-50%] flex flex-col gap-4 justify-center items-center my-10"
      isOpen={isOpen}
      style={{ overlay: { zIndex: 1000, backgroundColor: "rgba(255, 255, 255, 0.4)" } }
      }>
      <h4 className="text-gray-300">Edit {taskname} Status</h4>
      <div className="flex flex-row mx-6 space-x-2">
        <button 
          onClick={()=>setStatus("todo")}
          className={`${status=="todo" && "bg-gray-700 border"} p-2 rounded-md hover:border-purple-500 hover:border`}>
          <StatusBadge status="todo" />
        </button>
        <button 
          onClick={()=>setStatus("ongoing")}
          className={`${status=="ongoing" && "bg-gray-700 border"} p-2 rounded-md hover:border-purple-500 hover:border`}>
          <StatusBadge status="ongoing" />
        </button>
        <button 
          onClick={()=>setStatus("done")}
          className={`${status=="done" && "bg-gray-700 border"} p-2 rounded-md hover:border-purple-500 hover:border`}>
          <StatusBadge status="done" />   
        </button>             
      </div>
      <div className="flex mt-4 flex-row justify-end w-full space-x-4">
        <button onClick={onClose} className="text-gray-300">Cancel</button>
        <Button onClick={editStatus} text="udpate" />
      </div>
    </Modal>
  );
}