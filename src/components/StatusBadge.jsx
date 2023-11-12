export default function StatusBadge({ status }) {
  if (status === "ongoing")
    return (
      <div className="w-fit px-2 outline outline-[0.2px] rounded-[5px] outline-[#A3E9FF] text-[#94FFFF]" style={{ backgroundColor: 'rgba(163, 233, 255, 0.15)'}}>
        In Progress
      </div>
    );

  if (status === "done")
    return (
      <div className="w-fit px-2 outline outline-[0.2px] rounded-[5px] outline-[#D2C5FF] text-[#D2C5FF]" style={{ backgroundColor: 'rgba(150,119,255,0.15'}}>
        Done
      </div>
    );

  return (
    <div className="w-fit px-2 outline outline-[0.2px] rounded-[5px] outline-green bg-[rgba(94,238,126,0.15)] text-green">
      To Do
    </div>
  );
}
