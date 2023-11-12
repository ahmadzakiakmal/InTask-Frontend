import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserXmark, faListUl } from "@fortawesome/free-solid-svg-icons";

export default function ProjectNavbar() {
  return (
    <section className="p-4 font-semibold rounded-[20px] w-full border border-2 border-gray-300 gap-4 flex items-center">
      <div className="float-left">
        <Link href="/dashboard">
          <span className="text-3xl">Task</span>
        </Link>
      </div>
      <ul className="font-extralight text-[#a2a9b3] flex ml-auto">
        <li className="mx-6">
          <FontAwesomeIcon icon={faUserPlus} style={{ color: "#a2a9b3" }} />
          <span className="ml-2">Add Friend</span>
        </li>
        <li className="mx-6">
          <FontAwesomeIcon icon={faUserXmark} style={{ color: "#a2a9b3" }} />
          <span className="ml-2">Remove Friend</span>
        </li>
        <li className="mx-6">
          <FontAwesomeIcon icon={faListUl} style={{ color: "#a2a9b3" }} />
          <span className="ml-2">Add another list</span>
        </li>
      </ul>
    </section>
  );
}
