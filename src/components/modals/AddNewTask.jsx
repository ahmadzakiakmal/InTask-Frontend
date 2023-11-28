import Link from "next/link";
import Image from "next/image";
import Modal from "react-modal";
import { useRouter } from "next/router";
import Button from "../Button";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function NewTask({isOpen, onClose, projectId, onSuccess}) {
  const router = useRouter();
  const { pathname } = router;
  const [newTask, setTask] = useState({name: "", description: "", assignees: "", status: "todo"})
  function add(){
    axios.post(process.env.NEXT_PUBLIC_API_URL + '/project/' + projectId + '/tasks', newTask)
    .then(()=>{
        toast.success("added new task")
        onClose()
        onSuccess()
    })
    .catch(e => {
        toast.error('error '+ e.message)
    })
  }
  return (
    <Modal 
        className="p-10 px-12 bg-navy fixed left-[50%] translate-x-[-50%]  w-[350px] h-[460px] flex flex-col gap-4 justify-center items-center my-10"
        isOpen={isOpen}
        style={{
        overlay: {
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.4)",
        },
      }}>

        <p className="text-[20px] font-semibold mt-0 text-center" 
            style={{ color: "#D6D5A8", marginTop : '-1rem'}}>Add Task</p>

        <button className="ml-auto fixed right-6 top-6 text-gray-300 font-bold text-base hover:text-red-500" type="button" onClick={onClose}>╳</button>

        <div style = {{background: '#D6D5A8', width:'260px', height:'400px', borderRadius:'10px', fontWeight:550}}>
            <section style={{marginLeft:'18px', marginTop:'20px', marginRight:'10px', marginBottom:'10px'}}>
                <label className="flex flex-col gap-2.5 color" style={{color: '#1B2430', fontSize:'14px'}}>
                    Task's Name
                    <input className="outline" style={{width:'225px', height:'25px', borderRadius:'4px'}}onChange={(e) => setTask({...newTask, name: e.target.value})}/>
                </label>

                <label className="flex flex-col gap-2.5 color" style={{color: '#1B2430', fontSize:'14px', marginTop:'8px'}}>
                    Deadline Task
                    <input className="outline" style={{width:'225px', height:'25px', borderRadius:'4px'}}onChange={(e) => setTask({...newTask, description: e.target.value})}/>
                </label>

                <label className="flex flex-col gap-2.5 color" style={{color: '#1B2430', fontSize:'14px', marginTop:'8px'}}>
                    Assignees
                    <input className="outline" style={{width:'225px', height:'25px', borderRadius:'4px'}}onChange={(e) => setTask({...newTask, assignees: e.target.value})}/>
                </label>

                <label className="flex flex-col gap-2.5 color" style={{color: '#1B2430', fontSize:'14px', marginTop:'8px'}}>
                    Status
                    <select className="outline" style={{width:'225px', height:'25px', borderRadius:'4px'}}onChange={(e) => setTask({...newTask, status: e.target.value})}>
                        <option value="todo">todo</option>
                        <option value="ongoing">ongoing</option>
                        <option value="done">done</option>
                    </select>
                </label>
                <div className="flex justify-end w-[95%]" style={{marginTop:'20px'}}>
                    <Button 
                        className="mr-2" 
                        text="Add"
                        onClick={()=>add()}/>
                </div>
            </section>
        </div>
    </Modal>
  );
}