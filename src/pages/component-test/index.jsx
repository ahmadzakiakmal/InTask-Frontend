import AddProjectButton from "@/components/AddProject";
import MenuComponent from "@/components/Menu";
import ProjectCardComponent from "@/components/ProjectCard";
import ToDoItem from "@/components/ToDo";
import Button from "@/components/Button";
import ToDoItemRow from "@/components/ToDoItemRow";
import ProjectNavbar from "@/components/ProjectNavbar";
import TextInput from "@/components/TextInput";
import CreateNewProject from "@/components/modals/CreateProject";
import NewTask from "@/components/modals/AddNewTask";
import NewTable from "@/components/modals/CreateTable";

export default function ComponentTestPage() {
  return(
    <main className="flex flex-col justify-center items-center h-full gap-10 min-h-screen py-10 bg-neutral">
      <h1 className="font-bold">Component Test Page</h1>

      <div className="flex flex-col justify-center items-center">
        <h2 className="text-center">Menu Component</h2>
        <MenuComponent />
      </div>

      <div className="flex flex-col justify-center items-center">
        <h2 className="text-center"> Project Card</h2>
        <ProjectCardComponent/>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h2 className="text-center"> Add Project Button</h2>
        <AddProjectButton/>
      </div>
      
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-center"> To Do Item</h2>
        <ToDoItem />
      </div>

      <div className="flex flex-col justify-center items-center">
        <h2 className="text-center">Button</h2>
        <Button text="Click Me"/>
      </div>

      <div className="flex flex-col justify-center items-center w-full">
        <h2 className="text-center">Table & ToDoItemRow & StatusBadge</h2>
        <table className="w-[90%] bg-navy text-yellow">
          <tbody>
            <tr className="border-b border-yellow">
              <th className="text-center py-2 border-r border-yellow">No</th>
              <th className="border-r border-yellow">Title</th>
              <th className="border-r border-yellow">Assignees</th>
              <th className="border-r border-yellow">Status</th>
              <th className="w-24"></th>
            </tr>
            <ToDoItemRow status="done"/>
            <ToDoItemRow />
            <ToDoItemRow status="ongoing"/>
            <ToDoItemRow />
          </tbody>
        </table>
      </div>

      <div className="flex flex-col justify-center items-center w-[70%]">
        <h2 className="text-center"> Project Navigation Bar</h2>
        <ProjectNavbar/>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h2 className="text-center"> Project Card</h2>
        <CreateNewProject/>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h2 className="text-center"> Form New Task</h2>
        <NewTask/>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h2 className="text-center"> Form New Table</h2>
        <NewTable/>
      </div>

      <TextInput label="Nama" />
    </main>

  );
}