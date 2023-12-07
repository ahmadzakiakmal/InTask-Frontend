import Link from "next/link";

export default function ProjectCardComponent({
  title,
  color,
  description,
  id,
  owner,
  tasks,
  index
}) {
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
    <Link href={`/dashboard/project/${id}`} data-aos="fade-up" data-aos-delay={index*100}>
      <div className="relative w-full rounded-[15px] bg-navy cursor-pointer transition duration-200 hover:shadow-[0_0_8px_rgb(27,36,48,.9)]">
        <div
          className={
            "w-full py-3 px-8 text-center rounded-t-[15px] mt-[-2px] " +
            (colors[color] ? colors[color] : colors["orange"])
          }
        >
          <span className="font-semibold">{title}</span>
        </div>
        <div className="w-full h-fit px-3 py-4 text-white">
          <p>
            Owner:{" "}
            <span className="bg-purple-100 rounded-[5px] px-2 py-1 text-white">
              {owner}
            </span>
          </p>
          <p className="mt-1">{description}</p>
          <hr className="my-1" />
          <div className="text-green flex">
            <div className="min-w-[100px] flex justify-between">
              To Do <span className="mr-2">:</span>
            </div>
            {tasks?.filter((t) => t.status === "todo")?.length}
          </div>
          <div className="text-[#94FFFF] flex">
            <div className="min-w-[100px] flex justify-between">
              On Going <span className="mr-2">:</span>
            </div>
            {tasks?.filter((t) => t.status === "ongoing")?.length}
          </div>
          <div className="text-[#D2C5FF] flex">
            <div className="min-w-[100px] flex justify-between">
              Done <span className="mr-2">:</span>
            </div>
            {tasks?.filter((t) => t.status === "done")?.length}
          </div>
        </div>
      </div>
    </Link>
  );
}
