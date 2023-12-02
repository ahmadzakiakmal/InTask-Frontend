import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Button from "../Button";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddFriendModal ({ isOpen, onClose, projectId }) {
  const [identifier, setIdentifier] = useState("");
  const [options, setOptions] = useState([]);

  const handleAddFriend = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/project/${projectId}/contributors`,
        { identifier: identifier },  
        {
          withCredentials: true
        }
      );
      toast.success(response.data.message);
      onClose();
    } catch (error) {
      // console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while adding a friend.");
      }
    }
  };

  const searchOption = () => {
    if(!identifier)
      setOptions([]);
    else
      axios.get(process.env.NEXT_PUBLIC_API_URL + "/user/search/" + identifier)
      .then(response =>{
        setOptions(response.data);  
      })
      .catch(err => toast.info(err.message));
  };
  useEffect(searchOption, [identifier]);

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
        <input
          className="bg-gray-800 border border-white focus:border-sky-300 px-4 py-2 text-white outline-none w-[95%] mb-2 rounded-[10px]"
          type="text"
          placeholder="Email Address or Name"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          list="users"
        />
        {options.map(user=>(
          <p key={user._id}
            onClick={()=>setIdentifier(user.username)}
            className="hover:cursor-pointer hover:font-bold my-1">
            {user.emoticon} {user.username}
          </p>
        ))}
      </body>
      <div className="flex justify-end w-[95%]" onClick={handleAddFriend} >
        <Button className="mr-2" text="Add"/>
      </div>
    </Modal>
  );
};
