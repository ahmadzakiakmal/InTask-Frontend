import React, { useState } from 'react';
import Layout from "@/components/dashboard/Layout";
import TextInput1 from "@/components/TextInput1";

export default function UserPage() {
  const initialProfile = {
    name: 'Salwa Maharani',
    email: 'salwa@example.com',
    phoneNumber: '123-456-7890',
  };

  const [profile, setProfile] = useState({ ...initialProfile });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    console.log('Input changed:', e.target.name, e.target.value);
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    console.log('Profile saved:', profile);
    setIsEditing(false);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  return (
    <Layout>
      <main className="flex flex-col items-center justify-center h-full" style={{ marginTop: "-2rem" }}>
        <h1 className="font-semibold mb-4 text-[42px] sm:text-xl lg:text-2xl">Your Profile</h1>
        <div className="flex flex-col items-center">
          <svg width="210" height="210" viewBox="0 0 210 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginBottom:"1.5rem"}}>
          <path d="M140 87.5C140 96.7826 136.313 105.685 129.749 112.249C123.185 118.813 114.283 122.5 105 122.5C95.7174 122.5 86.815 118.813 80.2513 112.249C73.6875 105.685 70 96.7826 70 87.5C70 78.2174 73.6875 69.315 80.2513 62.7513C86.815 56.1875 95.7174 52.5 105 52.5C114.283 52.5 123.185 56.1875 129.749 62.7513C136.313 69.315 140 78.2174 140 87.5Z" fill="#1B2430"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M101.43 192.43C54.7619 190.557 17.5 152.127 17.5 105C17.5 56.6737 56.6737 17.5 105 17.5C153.326 17.5 192.5 56.6737 192.5 105C192.5 153.326 153.326 192.5 105 192.5C104.6 192.503 104.201 192.503 103.801 192.5C103.009 192.5 102.217 192.474 101.43 192.43ZM48.8512 160.212C48.197 158.334 47.9743 156.332 48.1997 154.355C48.4251 152.379 49.0928 150.478 50.1532 148.795C51.2135 147.112 52.6394 145.689 54.3249 144.632C56.0104 143.575 57.9123 142.912 59.8894 142.691C93.9969 138.915 116.213 139.256 150.154 142.769C152.134 142.976 154.041 143.631 155.729 144.685C157.417 145.739 158.842 147.165 159.896 148.854C160.95 150.542 161.605 152.449 161.811 154.429C162.016 156.408 161.768 158.409 161.083 160.278C175.63 145.56 183.776 125.693 183.75 105C183.75 61.5081 148.492 26.25 105 26.25C61.5081 26.25 26.25 61.5081 26.25 105C26.25 126.507 34.8731 146.002 48.8512 160.212Z" fill="#1B2430"/>
          </svg>

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
              <div className="flex items-center" style={{marginBottom:"1.5rem"}}>
                <div className="w-40 flex-shrink-0 pr-2 flex justify-between items-center"> 
                  <span className="text-black font-semibold sm:text-sm whitespace-nowrap">Name </span>
                  <span className="ml-1">:</span>
                </div>
                  <div className="flex-grow bg-neutral pl-2 py-1 w-[300px] rounded-md border border-purple-200 focus:outline-purple-200 text-black font-medium sm:text-sm">
                    {profile.name}
                  </div>
              </div>

              <div className="flex items-center" style={{marginBottom:"1.5rem"}}>
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
            className={`btn btn-sm lg:btn-lg bg-[#816797] rounded-[10px] font-medium text-white border-[#5F4C6F] w-44 lg:w-28 capitalize py-2`}
            style={{ marginTop: "1.5rem" }}
            onClick={isEditing ? handleSaveProfile : handleEditProfile}>
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>
      </main>
    </Layout>
  );
}