import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserXmark, faListUl, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AddFriendModal from "./modals/AddFriendModal";

export default function ProjectNavbar() {
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);

  const handleOpenAddFriendModal = () => {
    setIsAddFriendOpen(true);
  };

  const handleCloseAddFriendModal = () => {
    setIsAddFriendOpen(false);
  };


  return (
    <section className="p-4 font-semibold rounded-[20px] w-full border-2 border-gray-300 gap-4 flex items-center">
      <div className="float-left">
        <Link href="/dashboard">
          <span className="text-3xl">Task</span>
        </Link>
      </div>
      <ul className="font-extralight ml-auto flex gap-5 xl:gap-6 text-[#5F5858]">
        <li className="hidden lg:block cursor-pointer hover:text-blue-500">
          <button type="button" onClick={handleOpenAddFriendModal}>
            <FontAwesomeIcon icon={faUserPlus} />
            <span className="ml-2">Add Friend</span>
          </button>
          <AddFriendModal isOpen={isAddFriendOpen} onClose={handleCloseAddFriendModal} />
        </li>
        <li className="hidden lg:block cursor-pointer hover:text-blue-500">
          <FontAwesomeIcon icon={faUserXmark} />
          <span className="ml-2">Remove Friend</span>
        </li>
        <li className="hidden lg:block cursor-pointer hover:text-blue-500">
          <FontAwesomeIcon icon={faListUl} />
          <span className="ml-2">Add another list</span>
        </li>
        <li className="lg:hidden cursor-pointer text-[18px]">
          <FontAwesomeIcon icon={faBars} className="text-[22px] xs:text-[16px]"/>
          <span className="ml-2 hidden xs:inline">Menu</span>
        </li>
      </ul>
    </section>
  );
}
