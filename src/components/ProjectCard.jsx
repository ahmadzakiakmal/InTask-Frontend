import { useRouter } from "next/router";

export default function ProjectCardComponent({ title, color, description, projectId, projectContributor }) {
  const router = useRouter();

  const handleProjectClick = () => {
    router.push({
      pathname: `/dashboard/project/${title}`,
      query: {
        projectId: projectId,
        projectContributor: projectContributor
      },
    });
  };

  const colors = {
    yellow: "bg-yellow",
    purple: "bg-[#C9A2EA]",
    peach: "bg-[#FFC5C5]",
    blue: "bg-[#A8C5D6]",
    violet: "bg-[#C9CAF4]",
    pink: "bg-[#D6A8CC]",
    green: "bg-[#ACC9A2]",
    cream: "bg-[#D6A8A8]",
    orange: "bg-[#FFC5A8]",
  };
  return (
    <div className="relative w-full rounded-[15px] bg-navy cursor-pointer transition duration-200 hover:shadow-[0_0_8px_rgb(27,36,48,.9)]" onClick={handleProjectClick}>
      <div
        className={
          "w-full py-3 px-8 text-center rounded-t-[15px] mt-[-2px] " + (colors[color]? colors[color] : colors["orange"])
        }
      >
        <span className="font-semibold">{title}</span>
      </div>
      <div className="w-full h-fit px-3 py-4 text-white">{description}</div>
    </div>
  );
}
