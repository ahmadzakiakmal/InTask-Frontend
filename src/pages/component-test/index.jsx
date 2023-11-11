import MenuComponent from "@/components/Menu";
import ProjectCardComponent from "@/components/ProjectCard";
import projectCardComponent from "@/components/ProjectCard";

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
    </main>
  );
}