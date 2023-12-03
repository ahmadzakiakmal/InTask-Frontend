import { useState } from "react";
import ToDoItemRow from "./ToDoItemRow";

export default function TaskTable({ tasks, projectId, onEdit , setTasks }){
  const [sortTitleAsc, setSortTitleAsc] = useState(true);
  const [sortStatusAsc, setSortStatusAsc] = useState(true);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <table className="w-full bg-navy text-yellow">
        <tbody>
          <tr className="border-b border-yellow">
            <th className="text-center py-2 border-r border-yellow">No</th>
            <th className="border-r border-yellow cursor-pointer !select-none" onClick={() => {
              if(sortTitleAsc){
                tasks.sort((a, b) => a.name.localeCompare(b.name));
              } else {
                tasks.sort((a, b) => b.name.localeCompare(a.name));
              }
              setSortTitleAsc(!sortTitleAsc);
              const newTasks = JSON.parse(JSON.stringify(tasks));
              setTasks(newTasks);
            }}>Title</th>
            <th className="border-r border-yellow">Assignees</th>
            <th className="border-r border-yellow select-none cursor-pointer" onClick={() => {
              if(sortStatusAsc){
                tasks.sort((a, b) => a.status.localeCompare(b.status));
              } else {
                tasks.sort((a, b) => b.status.localeCompare(a.status));
              }
              setSortStatusAsc(!sortStatusAsc);
              const newTasks = JSON.parse(JSON.stringify(tasks));
              setTasks(newTasks);
            }}>Status</th>
            <th className="w-24"></th>
          </tr>
          {tasks?.map(task => (<ToDoItemRow key={task._id} task={task} projectId={projectId} onSuccess={onEdit} />))}
          {
            tasks.length === 0  && (
              <tr className="border-b border-yellow">
                <td className="text-center py-5 border-r border-yellow"  colSpan={5}>
                  This project has no tasks yet
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}