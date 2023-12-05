import Modal from "react-modal";
import Button from "../Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditTaskModal({
  isOpen,
  setOpenModal,
  task
}) {
  Modal.setAppElement("#__next");

  return (
    <Modal
      isOpen={isOpen}
      // onClose={onClose}
      className="w-screen h-screen flex justify-center items-center rounded-[10px] absolute !z-[11] backdrop-blur-[8px] bg-navy/30"
    >
      <div
        className="w-full h-full absolute top-0"
        onClick={() => setOpenModal(false)}
      ></div>
      <div className="bg-navy w-[90%] max-h-[90vh] overflow-y-auto md:w-1/2 md:max-w-[600px] lg:max-w-[800px] p-8 rounded-[10px] relative z-[10]">
        <h1 className="text-yellow text-[32px] font-semibold text-center">
          Edit Task
        </h1>
        <form className="bg-yellow p-8 rounded-[5px] text-[20px] flex flex-col gap-4">
          <p>
            {task.name}
          </p>
          <p>
            {task?.description}
          </p>
          <p>
            {task.status}
          </p>
          <p>
            {
              task.assignees.map((a) => {
                return `${a.emoticon} ${a.username}, `;
              })
            }
          </p>
        </form>
      </div>
    </Modal>
  );
}
