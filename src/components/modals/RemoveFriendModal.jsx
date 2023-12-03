import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Button from "../Button";
import axios from "axios";
import { toast } from "react-toastify";

export default function RemoveFriendModal({ isOpen, onClose, projectId, projectContributor, onUpdateContributors }) {
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    setFriends(projectContributor);
  }, [projectContributor]);

  useEffect(() => {
    setSelectedFriends([]);
  }, [friends]);

  const handleToggleAllFriends = () => {
    if (friends && friends.length > 0) {
      if (selectedFriends.length === friends.length) {
        setSelectedFriends([]);
      } else {
        setSelectedFriends([...friends]);
      } 
    }
  };

  const handleToggleFriend = (friend) => {
    if (friends && friends.length > 0) {
      if (selectedFriends.includes(friend)) {
        setSelectedFriends((prevSelected) =>
          prevSelected.filter((selectedFriend) => selectedFriend !== friend)
        );
      } else {
        setSelectedFriends((prevSelected) => [...prevSelected, friend]);
      }
    }
  };

  const handleRemoveFriend = (e) => {
    axios
      .delete(process.env.NEXT_PUBLIC_API_URL + `/project/${projectId}/contributors/${selectedFriends.toString()}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(`Successfully Removed ${selectedFriends.toString()} from Project`);
        onClose();
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occurred while deleting contributors");
      });
    onUpdateContributors();
  };

  useEffect(() => {
    // Menyimpan data contributor yang dipilih ke session storage
    sessionStorage.setItem("selectedFriends", JSON.stringify(selectedFriends));
  }, [selectedFriends]);

  useEffect(() => {
    // Mengambil data contributor yang dipilih dari session storage saat komponen dimount
    const storedSelectedFriends = sessionStorage.getItem("selectedFriends");
    if (storedSelectedFriends) {
      setSelectedFriends(JSON.parse(storedSelectedFriends));
    }
  }, []);

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
          width: "85%", 
          maxWidth: 600, 
          height:"36%",
          maxHeight: 265,
          overflowY: "auto",
          backgroundColor:"#1B2430",
          borderRadius: 10,
          color: "#B6C2CF",
          padding: "20px 40px",
        },
      }}
    >
      <header className="flex items-center m-0 mb-4">
        <h2 className="float-left text-xl xs:text-lg">Remove Friend from Project</h2>
        <button className="ml-auto font-bold text-base hover:text-red-500" type="button" onClick={onClose}>╳</button>
      </header>
      <body className="border border-white focus:border-sky-300 px-4 py-2 outline-none w-full mb-2 mt-7 text-base rounded-[10px]">
        <div className="flex justify-end">
          <input
            className="opacity-0 focus:outline-none"
            type="checkbox"
            id="selectAllFriends"
            checked={friends && friends.length > 0 && selectedFriends.length === friends.length}d
            onChange={handleToggleAllFriends}
          />
          <label htmlFor="selectAllFriends" className="ml-2 cursor-pointer hover:text-sky-400">
            Select All Friends
          </label>
        </div>

        <form>
          {friends && friends.length > 0 ? (
            friends.map((friend) => (
              <div key={friend} className="mb-2">
                <input
                  type="checkbox"
                  id={friend}
                  checked={selectedFriends.includes(friend)}
                  onChange={() => handleToggleFriend(friend)}
                />
                <label htmlFor={friend} className="ml-2">
                  {friend}
                </label>
              </div>
            ))
          ) : (
            <p>No friends available.</p>
          )}
        </form>
      </body>
      <div className="mt-3 flex justify-end">
        <Button onClick={handleRemoveFriend} className="mr-2" text="Delete"/>
      </div>
    </Modal>
  );
}
