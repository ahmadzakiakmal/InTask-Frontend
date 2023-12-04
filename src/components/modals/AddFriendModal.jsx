import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Button from "../Button";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddFriendModal ({ isOpen, onClose, projectId, setOpenModal }) {
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
      setIdentifier("");
      setOptions([]);
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
          setOptions(response.data.users);  
        })
        .catch(err => toast.info(err.message));
  };
  useEffect(searchOption, [identifier]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="w-screen h-screen flex justify-center items-center absolute z-[10] backdrop-blur-[8px] bg-navy/30 overflow-visible"
    >
      <div
        className="w-full h-full absolute top-0"
        onClick={() => setOpenModal(false)}
      ></div>
      <main className="bg-navy w-[90%] max-h-[90vh] overflow-y-visible md:w-1/2 md:max-w-[600px] lg:max-w-[800px] p-8 rounded-[10px] relative z-[10] text-yellow">
        <h1 className="text-xl">Add Contributor</h1>
        <input
          className="bg-gray-800 my-2 border border-white focus:border-sky-300 px-4 py-2 text-white outline-none w-full mb-2 rounded-[10px]"
          type="text"
          placeholder="Email Address or Name"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          list="users"
        />
        {
          options.length > 0 &&
          <div className="text-yellow flex flex-col gap-2 absolute bg-navy p-3 shadow-yellow outline outline-1 outline-yellow rounded-[10px] min-w-[215px]">
            {
              options.map((user, index) => (
                <div onClick={() => {
                  setIdentifier(user.email);
                  setOptions([]);
                }} className="bg-yellow/20 hover:bg-yellow/40 p-1 rounded-[5px] cursor-pointer" key={index} value={user.email}>{user.emoticon} {user.username}</div>
              ))
            }
          </div>
        }
        <div className="flex gap-2 justify-end">
          <Button text="Add" onClick={handleAddFriend} className="!px-5" />
          <Button text="Cancel" className="!bg-neutral/50 hover:!bg-neutral/30 text-purple-100" onClick={onClose} />
        </div>
      </main>
    </Modal>
  );
};
