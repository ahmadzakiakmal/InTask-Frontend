export default function StatusBadge({ status }) {
  if (status === "ongoing")
    return (
      <div className="w-fit px-2 outline outline-[0.2px] rounded-[5px] outline-[#A3E9FF] bg-[rgba(163,233,255,0.15)] text-[#94FFFF]">
        In Progress
      </div>
    );

  if (status === "done")
    return (
      <div className="w-fit px-2 outline outline-[0.2px] rounded-[5px] outline-[#D2C5FF] bg-[rgba(150,119,255,0.15)] text-[#D2C5FF]">
        Done
      </div>
    );

  return (
    <div className="w-fit px-2 outline outline-[0.2px] rounded-[5px] outline-green bg-[rgba(94,238,126,0.15)] text-green">
      To Do
    </div>
  );
}
