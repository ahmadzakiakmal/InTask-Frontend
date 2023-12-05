import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function ToDoItem({ taskname, id, desc, assignees }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button
      className="w-full pt-2 pb-4 text-left top-0 px-5 rounded-[10px] bg-[#4B4B4B] shadow-navy shadow-lg"
      style={{ ...style }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <span className="text-[18px] font-bold">{taskname}</span>
      <hr className="my-1" />
      <p className="text-justify">{desc}</p>
      {
        assignees?.length > 0 && (
          <h1 className="mt-3 font-semibold">Assignees</h1>
        )
      }
      <div className="flex gap-2 flex-wrap">
        {assignees?.map((as, index) => {
          if(!as) return;
          return (
            <div key={index} className="bg-purple-100 rounded-[5px] px-2 py-1 text-white">
              {as.emoticon} {as.username}
            </div>
          );
        })}
      </div>
    </button>
  );
}
