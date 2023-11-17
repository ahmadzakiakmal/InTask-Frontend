import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Button from "../Button";

export default function RemoveFriendModal({ isOpen, onClose}) {
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [friends, setFriends] = useState([
    { id: 1, name: "Duta" },
    { id: 2, name: "Ramadhan" },
  ]);

  useEffect(() => {
    setSelectedFriends([]);
  }, [friends]);

  const handleToggleAllFriends = () => {
    if (friends && friends.length > 0) {
      if (selectedFriends.length === friends.length) {
        setSelectedFriends([]);
      } else {
        setSelectedFriends(friends.map((friend) => friend.id));
      }
    }
  };

  const handleToggleFriend = (friendId) => {
    if (friends && friends.length > 0) {
      if (selectedFriends.includes(friendId)) {
        setSelectedFriends((prevSelected) =>
          prevSelected.filter((id) => id !== friendId)
        );
      } else {
        setSelectedFriends((prevSelected) => [...prevSelected, friendId]);
      }
    }
  };

  const handleRemove = () => {

  };

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
        width: 600,
        height: 275,
        backgroundColor:"#1B2430",
        borderRadius: 10,
        color: "#B6C2CF",
        padding: "20px 40px",
      },
    }}
    >
    <header className="flex items-center m-0 mb-4">
        <h2 className="float-left text-xl">Remove Friend from Project</h2>
        <button className="ml-auto font-bold text-base hover:text-red-500" type="button" onClick={onClose}>╳</button>
    </header>
    <body className="border border-white focus:border-sky-300 px-4 py-2 outline-none w-full mb-2 mt-7 text-base rounded-[10px]">
        <div className="flex justify-end mb-2">
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
              <div key={friend.id} className="mb-2">
                <input
                  type="checkbox"
                  id={friend.id}
                  checked={selectedFriends.includes(friend.id)}
                  onChange={() => handleToggleFriend(friend.id)}
                />
                <label htmlFor={friend.id} className="ml-2">
                  {friend.name}
                </label>
              </div>
            ))
          ) : (
            <p>No friends available.</p>
          )}
        </form>
      </body>
      <div className="mt-6 flex justify-end">
            <Button onClick={handleRemove} className="mr-2" text="Delete"/>
        </div>
    </Modal>
  );
}
