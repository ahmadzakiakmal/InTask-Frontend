import StatusBadge from "./StatusBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function ToDoItemRow({ task }) {
  return (
    <tr className="mb-2">
      <td className="text-center w-[60px] py-2 border-r border-yellow">1</td>
      <td className="px-2 border-r border-yellow">{task?.name ?? 'Discussion'}</td>
      <td className="text-center border-r border-yellow">{task?.assignees?.map(as =>('🤡 ' + as + ' '))}</td>
      <td className="px-2 flex items-center justify-center">
        <StatusBadge status={task?.status} />
      </td>
      <td className="mb-2 bg-red-900 border-l border-b border-yellow">
        <button className="w-full">
          <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ffffff" }} />
        </button>
      </td>
    </tr>
  );
}
