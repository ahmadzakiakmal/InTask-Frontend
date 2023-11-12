import StatusBadge from "./StatusBadge";

export default function ToDoItemRow({ status }) {
  return(
    <tr>
      <td className="text-center w-[60px] py-2 border-r border-yellow">1</td>
      <td className="px-2 border-r border-yellow">Discussion</td>
      <td className="text-center border-r border-yellow">🤡 Zaki</td>
      <td className="px-2">
        <StatusBadge status={status} />
      </td>
    </tr>
  ); 
}