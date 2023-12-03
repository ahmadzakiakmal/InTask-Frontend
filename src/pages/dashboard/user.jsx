import React, { useState } from "react";
import Layout from "@/components/dashboard/Layout";
import TextInput1 from "@/components/TextInput1";

export default function UserPage() {
  const initialProfile = {
    name: "Salwa Maharani",
    email: "salwa@example.com",
    phoneNumber: "123-456-7890",
  };

  const [profile, setProfile] = useState({ ...initialProfile });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    console.log("Input changed:", e.target.name, e.target.value);
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    console.log("Profile saved:", profile);
    setIsEditing(false);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  return (
    <Layout>
      <main className="flex flex-col items-center justify-center h-full" style={{ marginTop: "-2rem" }}>
        <h1 className="font-semibold text-[42px] sm:text-xl lg:text-2xl">Your Profile</h1>
        <div className="flex flex-col items-center">
          <span className="text-[100px] mb-4">🙂</span>

          {isEditing ? (
            <>
              <TextInput1 label="Name" value={profile.name} name="name" onChange={handleInputChange} />
              <TextInput1 label="Email" value={profile.email} name="email" onChange={handleInputChange} />
              <TextInput1 label="Phone Number" value={profile.phoneNumber} name="phoneNumber" onChange={handleInputChange} />
            </>
          ) : (
            <>

              {/* buat bagian setelah save */}
              <div className="mb-4 relative flex flex-col">
                <div className="flex items-center" style={{ marginBottom:"1.5rem" }}>
                  <div className="w-40 flex-shrink-0 pr-2 flex justify-between items-center"> 
                    <span className="text-black font-semibold sm:text-sm whitespace-nowrap">Name </span>
                    <span className="ml-1">:</span>
                  </div>
                  <div className="flex-grow bg-neutral pl-2 py-1 w-[300px] rounded-md border border-purple-200 focus:outline-purple-200 text-black font-medium sm:text-sm">
                    {profile.name}
                  </div>
                </div>

                <div className="flex items-center" style={{ marginBottom:"1.5rem" }}>
                  <div className="w-40 flex-shrink-0 pr-2 flex justify-between items-center"> 
                    <span className="text-black font-semibold sm:text-sm whitespace-nowrap">Email </span>
                    <span className="ml-1">:</span>
                  </div>
                  <div className="flex-grow bg-neutral pl-2 py-1 w-[300px] rounded-md border border-purple-200 focus:outline-purple-200 text-black font-medium sm:text-sm">
                    {profile.email}
                  </div>
                </div>

                <div className="flex items-center mb-2">
                  <div className="w-40 flex-shrink-0 pr-2 flex justify-between items-center"> 
                    <span className="text-black font-semibold sm:text-sm whitespace-nowrap">Phone Number </span>
                    <span className="ml-1">:</span>
                  </div>
                  <div className="flex-grow bg-neutral pl-2 py-1 w-[300px] rounded-md border border-purple-200 focus:outline-purple-200 text-black font-medium sm:text-sm">
                    {profile.phoneNumber}
                  </div>
                </div>
              </div>
            </>
          )}          

          <button
            className={"btn btn-sm lg:btn-lg bg-[#816797] rounded-[10px] font-medium text-white border-[#5F4C6F] w-44 lg:w-28 capitalize py-2"}
            style={{ marginTop: "1.5rem" }}
            onClick={isEditing ? handleSaveProfile : handleEditProfile}>
            {isEditing ? "Save Profile" : "Edit Profile"}
          </button>
        </div>
      </main>
    </Layout>
  );
}