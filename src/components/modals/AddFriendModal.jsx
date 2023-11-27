import React, { useState } from "react";
import Modal from "react-modal";
import Button from "../Button";

export default function AddFriendModal ({ isOpen, onClose }) {
  const [email, setEmail] = useState("");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.4)",
        },
        content: {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 500,
          maxHeight: 175,
          backgroundColor:"#1B2430",
          borderRadius: 10,
          color: "#B6C2CF",
          padding: "20px 40px",
        },
      }}
    >
      <header className="flex items-center m-0 mb-4">
        <h2 className="float-left text-xl">Add Friend to Project</h2>
        <button className="ml-auto font-bold text-base hover:text-red-500" type="button" onClick={onClose}>╳</button>
      </header>
      <body className="flex flex-col">
        <input className="bg-gray-800 border border-white focus:border-sky-300 px-4 py-2 text-white outline-none w-[95%] mb-2 rounded-[10px]"
          type="email"
          placeholder="Email address or name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </body>
      <div className="flex justify-end w-[95%]">
        <Button className="mr-2" text="Add"/>
      </div>
    </Modal>
  );
};
