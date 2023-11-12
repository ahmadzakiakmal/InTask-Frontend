export default function StatusBadge({ status }) {
  if (status === "ongoing")
    return (
      // TODO: Change colors
      <div className="w-fit px-2 outline outline-[0.2px] rounded-[5px] outline-green bg-[rgba(94,238,126,0.15)] text-green">
        On Going
      </div>
    );

  if (status === "done")
    return (
      // TODO: Change colors
      <div className="w-fit px-2 outline outline-[0.2px] rounded-[5px] outline-green bg-[rgba(94,238,126,0.15)] text-green">
        Done
      </div>
    );

  return (
    // TODO: Change colors
    <div className="w-fit px-2 outline outline-[0.2px] rounded-[5px] outline-green bg-[rgba(94,238,126,0.15)] text-green">
      To Do
    </div>
  );
}
