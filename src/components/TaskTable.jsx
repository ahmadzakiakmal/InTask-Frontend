import { useState } from "react";
import ToDoItemRow from "./ToDoItemRow";

export default function TaskTable({ tasks, projectId, onEdit, setTasks }) {
  const [sortTitleAsc, setSortTitleAsc] = useState(true);
  const [sortStatusAsc, setSortStatusAsc] = useState(true);

  return (
    <div className="w-full overflow-x-auto pb-5">
      <table className="w-full sm:min-w-fit bg-navy text-yellow">
        <tbody>
          <tr className="border-b border-yellow">
            <th className="text-center py-2 border-r border-yellow min-w-[40px]">No</th>
            <th
              className="border-r border-yellow cursor-pointer !select-none"
              onClick={() => {
                if (sortTitleAsc) {
                  tasks.sort((a, b) => a.name.localeCompare(b.name));
                } else {
                  tasks.sort((a, b) => b.name.localeCompare(a.name));
                }
                setSortTitleAsc(!sortTitleAsc);
                const newTasks = JSON.parse(JSON.stringify(tasks));
                setTasks(newTasks);
              }}
            >
              <div className="flex justify-center items-center gap-2 min-w-[200px]">
                Title
                <svg
                  className={
                    "transition duration-300 " +
                    (sortTitleAsc ? "transform rotate-180" : "")
                  }
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.2899 14.29L11.9999 18.59L7.70994 14.29C7.52164 14.1017 7.26624 13.9959 6.99994 13.9959C6.73364 13.9959 6.47825 14.1017 6.28994 14.29C6.10164 14.4783 5.99585 14.7337 5.99585 15C5.99585 15.2663 6.10164 15.5217 6.28994 15.71L11.2899 20.71C11.3829 20.8037 11.4935 20.8781 11.6154 20.9289C11.7372 20.9797 11.8679 21.0058 11.9999 21.0058C12.132 21.0058 12.2627 20.9797 12.3845 20.9289C12.5064 20.8781 12.617 20.8037 12.7099 20.71L17.7099 15.71C17.8032 15.6168 17.8771 15.5061 17.9276 15.3842C17.9781 15.2624 18.004 15.1319 18.004 15C18.004 14.8681 17.9781 14.7376 17.9276 14.6158C17.8771 14.4939 17.8032 14.3832 17.7099 14.29C17.6167 14.1968 17.506 14.1228 17.3842 14.0723C17.2624 14.0219 17.1318 13.9959 16.9999 13.9959C16.8681 13.9959 16.7375 14.0219 16.6157 14.0723C16.4939 14.1228 16.3832 14.1968 16.2899 14.29ZM7.70994 9.71L11.9999 5.41L16.2899 9.71C16.3829 9.80373 16.4935 9.87812 16.6154 9.92889C16.7372 9.97966 16.8679 10.0058 16.9999 10.0058C17.132 10.0058 17.2627 9.97966 17.3845 9.92889C17.5064 9.87812 17.617 9.80373 17.7099 9.71C17.8037 9.61704 17.8781 9.50644 17.9288 9.38458C17.9796 9.26272 18.0057 9.13201 18.0057 9C18.0057 8.86799 17.9796 8.73728 17.9288 8.61542C17.8781 8.49356 17.8037 8.38296 17.7099 8.29L12.7099 3.29C12.617 3.19627 12.5064 3.12188 12.3845 3.07111C12.2627 3.02034 12.132 2.9942 11.9999 2.9942C11.8679 2.9942 11.7372 3.02034 11.6154 3.07111C11.4935 3.12188 11.3829 3.19627 11.2899 3.29L6.28994 8.29C6.1967 8.38324 6.12274 8.49393 6.07228 8.61575C6.02182 8.73757 5.99585 8.86814 5.99585 9C5.99585 9.2663 6.10164 9.5217 6.28994 9.71C6.47825 9.8983 6.73364 10.0041 6.99994 10.0041C7.26624 10.0041 7.52164 9.8983 7.70994 9.71Z"
                    fill="#D6D5A8"
                  />
                </svg>
              </div>
            </th>
            <th className="border-r border-yellow">Assignees</th>
            <th
              className="border-r border-yellow select-none cursor-pointer"
              onClick={() => {
                if (sortStatusAsc) {
                  tasks.sort((a, b) => a.status.localeCompare(b.status));
                } else {
                  tasks.sort((a, b) => b.status.localeCompare(a.status));
                }
                setSortStatusAsc(!sortStatusAsc);
                const newTasks = JSON.parse(JSON.stringify(tasks));
                setTasks(newTasks);
              }}
            >
              <div className="flex justify-center items-center gap-2 min-w-[125px]">
                Status
                <svg
                  className={
                    "transition duration-300 " +
                    (sortStatusAsc ? "transform rotate-180" : "")
                  }
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.2899 14.29L11.9999 18.59L7.70994 14.29C7.52164 14.1017 7.26624 13.9959 6.99994 13.9959C6.73364 13.9959 6.47825 14.1017 6.28994 14.29C6.10164 14.4783 5.99585 14.7337 5.99585 15C5.99585 15.2663 6.10164 15.5217 6.28994 15.71L11.2899 20.71C11.3829 20.8037 11.4935 20.8781 11.6154 20.9289C11.7372 20.9797 11.8679 21.0058 11.9999 21.0058C12.132 21.0058 12.2627 20.9797 12.3845 20.9289C12.5064 20.8781 12.617 20.8037 12.7099 20.71L17.7099 15.71C17.8032 15.6168 17.8771 15.5061 17.9276 15.3842C17.9781 15.2624 18.004 15.1319 18.004 15C18.004 14.8681 17.9781 14.7376 17.9276 14.6158C17.8771 14.4939 17.8032 14.3832 17.7099 14.29C17.6167 14.1968 17.506 14.1228 17.3842 14.0723C17.2624 14.0219 17.1318 13.9959 16.9999 13.9959C16.8681 13.9959 16.7375 14.0219 16.6157 14.0723C16.4939 14.1228 16.3832 14.1968 16.2899 14.29ZM7.70994 9.71L11.9999 5.41L16.2899 9.71C16.3829 9.80373 16.4935 9.87812 16.6154 9.92889C16.7372 9.97966 16.8679 10.0058 16.9999 10.0058C17.132 10.0058 17.2627 9.97966 17.3845 9.92889C17.5064 9.87812 17.617 9.80373 17.7099 9.71C17.8037 9.61704 17.8781 9.50644 17.9288 9.38458C17.9796 9.26272 18.0057 9.13201 18.0057 9C18.0057 8.86799 17.9796 8.73728 17.9288 8.61542C17.8781 8.49356 17.8037 8.38296 17.7099 8.29L12.7099 3.29C12.617 3.19627 12.5064 3.12188 12.3845 3.07111C12.2627 3.02034 12.132 2.9942 11.9999 2.9942C11.8679 2.9942 11.7372 3.02034 11.6154 3.07111C11.4935 3.12188 11.3829 3.19627 11.2899 3.29L6.28994 8.29C6.1967 8.38324 6.12274 8.49393 6.07228 8.61575C6.02182 8.73757 5.99585 8.86814 5.99585 9C5.99585 9.2663 6.10164 9.5217 6.28994 9.71C6.47825 9.8983 6.73364 10.0041 6.99994 10.0041C7.26624 10.0041 7.52164 9.8983 7.70994 9.71Z"
                    fill="#D6D5A8"
                  />
                </svg>
              </div>
            </th>
            <th className="w-24">Actions</th>
          </tr>
          {tasks?.map((task, index) => (
            <ToDoItemRow
              key={task._id}
              index={index}
              task={task}
              projectId={projectId}
              onSuccess={onEdit}
            />
          ))}
          {tasks && tasks.length === 0 && (
            <tr className="border-b border-yellow">
              <td
                className="text-center py-5 border-r border-yellow"
                colSpan={5}
              >
                This project has no tasks yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
