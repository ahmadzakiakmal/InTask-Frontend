import AddProjectButton from "@/components/AddProject";
import MenuComponent from "@/components/Menu";
import ProjectCardComponent from "@/components/ProjectCard";
import ToDoItem from "@/components/ToDo";
import EditButton from "@/components/EditProfile";

export default function ComponentTestPage() {
  return(
    <main className="flex flex-col justify-center items-center h-full gap-10 min-h-screen">
      <h1 className="font-bold">Component Test Page</h1>

      <div>
        <h2>Menu Component</h2>
        <MenuComponent />
      </div>

      <div>
        <h2> Project Card</h2>
        <ProjectCardComponent/>
      </div>

      <div>
        <h2> Add Project Button</h2>
        <AddProjectButton/>
      </div>
      
      <div>
        <h2> To Do Item</h2>
        <ToDoItem/>
      </div>

      <div>
        <h2>Edit Profile</h2>
        <EditButton/>
      </div>

    </main>
  );
}