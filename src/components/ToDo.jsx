export default function ToDoItem({taskname}) {
  return (
      <button className="w-full py-2 text-left bg-navy top-0 px-5 rounded-[10px]"
        style={{ background:"#4B4B4B" }}>
        <span style = {{ fontSize:"16px", fontWeight:"regular", color: "#D6D5A8" }}>{taskname}</span>
      </button>
  );
}