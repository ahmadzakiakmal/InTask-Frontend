import React, { useEffect, useState } from "react";
import Layout from "@/components/dashboard/Layout";
import TextInput1 from "@/components/TextInput1";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { LoadingContext } from "@/context/LoadingContext";

export default function UserPage() {
  const initialProfile = {
    name: "",
    email: "",
  };

  const [profile, setProfile] = useState({ ...initialProfile });
  const [isEditing, setIsEditing] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [emoji, setEmoji] = useState("🙂");
  const { setLoading } = React.useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);
    axios.post(process.env.NEXT_PUBLIC_API_URL + "/user/search", {
      searchQuery: localStorage.getItem("username"),
    }, { withCredentials: true })
      .then((res) => {
        setProfile({
          name: res.data.username,
          email: res.data.email,
        });
        setEmoji(res.data.emoticon);
      })
      .catch(() => {
        toast.error("Error fetching profile data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetch]);

  const handleInputChange = (e) => {
    console.log("Input changed:", e.target.name, e.target.value);
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const handleEditProfile = () => {
    if (
      profile.name === "" ||
      profile.email === "" ||
      profile.phoneNumber === ""
    )
      return toast.error("Cannot edit profile");
    setIsEditing(true);
  };

  return (
    <Layout>
      <main
        className="flex flex-col items-center justify-center h-full"
        style={{ marginTop: "-2rem" }}
      >
        <h1 className="font-semibold text-[42px] sm:text-xl lg:text-2xl">
          Your Profile
        </h1>
        <div className="flex flex-col items-center">
          <span className="text-[100px] mb-4">{emoji}</span>

          {isEditing ? (
            <>
              <TextInput1
                label="Name"
                value={profile.name}
                name="name"
                onChange={handleInputChange}
              />
              <TextInput1
                label="Email"
                value={profile.email}
                name="email"
                onChange={handleInputChange}
              />
            </>
          ) : (
            <>
              {/* buat bagian setelah save */}
              <div className="relative flex flex-col">
                <div
                  className="flex items-center"
                  style={{ marginBottom: "1.5rem" }}
                >
                  <div className="w-40 flex-shrink-0 pr-2 flex justify-between items-center">
                    <span className="text-black font-semibold sm:text-sm whitespace-nowrap">
                      Name{" "}
                    </span>
                    <span className="ml-1">:</span>
                  </div>
                  <div className="flex-grow h-[30px] bg-slate-500/20 cursor-not-allowed pl-2 py-1 w-[300px] rounded-md border border-purple-200 focus:outline-purple-200 text-black font-medium sm:text-sm">
                    {profile.name}
                  </div>
                </div>

                <div
                  className="flex items-center"
                  style={{ marginBottom: "1.5rem" }}
                >
                  <div className="w-40 flex-shrink-0 pr-2 flex justify-between items-center">
                    <span className="text-black font-semibold sm:text-sm whitespace-nowrap">
                      Email{" "}
                    </span>
                    <span className="ml-1">:</span>
                  </div>
                  <div className="flex-grow h-[30px] bg-slate-500/20 cursor-not-allowed pl-2 py-1 w-[300px] rounded-md border border-purple-200 focus:outline-purple-200 text-black font-medium sm:text-sm">
                    {profile.email}
                  </div>
                </div>
              </div>
            </>
          )}

          <Button
            className={
              "bg-[#816797] rounded-[10px] font-medium text-white border-[#5F4C6F] capitalize "
            }
            onClick={isEditing ? handleSaveProfile : handleEditProfile}
            text={isEditing ? "Save Profile" : "Edit Profile"}
            disabled={profile.name === "" || profile.email === ""}
          ></Button>
        </div>
      </main>
    </Layout>
  );
}
