import AddProjectButton from "@/components/AddProject";
import MenuComponent from "@/components/Menu";
import ProjectCardComponent from "@/components/ProjectCard";
import ToDoItem from "@/components/ToDo";
import Button from "@/components/Button";
import ToDoItemRow from "@/components/ToDoItemRow";

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
          <tr className="border-b border-yellow">
            <th className="text-center py-2 border-r border-yellow">No</th>
            <th className="border-r border-yellow">Title</th>
            <th className="border-r border-yellow">Assignees</th>
            <th>Status</th>
          </tr>
          <ToDoItemRow status="done" />
          <ToDoItemRow />
          <ToDoItemRow status="ongoing"/>
          <ToDoItemRow />
        </table>
      </div>

    </main>
  );
}