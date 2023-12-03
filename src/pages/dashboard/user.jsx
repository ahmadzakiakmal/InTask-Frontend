import React, { useEffect, useState } from "react";
import Layout from "@/components/dashboard/Layout";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { LoadingContext } from "@/context/LoadingContext";
import EmojiPicker from "emoji-picker-react";
import Cookies from "js-cookie";

export default function UserPage() {
  const initialProfile = {
    username: "",
    email: "",
    realName: "",
  };

  const [profile, setProfile] = useState({ ...initialProfile });
  const [isEditing, setIsEditing] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [emoji, setEmoji] = useState("🙂");
  const [openEmoji, setOpenEmoji] = useState(false);
  const { setLoading } = React.useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/user/search",
        {
          searchQuery: localStorage.getItem("username"),
        },
        { withCredentials: true }
      )
      .then((res) => {
        setProfile({
          username: res.data.username,
          email: res.data.email,
          realName: res.data.realName,
        });
        setEmoji(res.data.emoticon);
      })
      .catch(() => {
        toast.error("Error fetching profile data");
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    setRefetch(!refetch);
  };

  const handleEditProfile = () => {
    if (
      profile.username === "" ||
      profile.email === "" ||
      profile.realName === ""
    )
      return toast.error("Please fill all the fields to save");
    axios.put(process.env.NEXT_PUBLIC_API_URL + "/user/update-profile", {
      username: profile.username,
      realName: profile.realName,
      emoticon: emoji,
    }, {
      withCredentials: true,
    })
      .then(() => {
        
        toast.success("Profile updated successfully");
        setRefetch(!refetch);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error updating profile");
      });
    setIsEditing(true);
  };

  return (
    <Layout>
      <main className="flex flex-col items-center justify-start h-full">
        <h1 className="font-semibold text-[42px] sm:text-xl lg:text-2xl">
          Your Profile
        </h1>
        <div className="mb-4 relative">
          <div
            onClick={() => {
              setOpenEmoji(!openEmoji);
            }}
          >
            <div className="text-[100px] cursor-pointer">{emoji}</div>
            <div className={"absolute bg-navy rounded-full p-2 right-0 bottom-0 cursor-pointer " + (!isEditing ? "" : "hidden")}>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.25 15C25.9185 15 25.6005 15.1317 25.3661 15.3662C25.1317 15.6006 25 15.9185 25 16.25V23.75C25 24.0816 24.8683 24.3995 24.6339 24.6339C24.3995 24.8684 24.0815 25 23.75 25H6.25C5.91848 25 5.60054 24.8684 5.36612 24.6339C5.1317 24.3995 5 24.0816 5 23.75V6.25005C5 5.91853 5.1317 5.60058 5.36612 5.36616C5.60054 5.13174 5.91848 5.00005 6.25 5.00005H13.75C14.0815 5.00005 14.3995 4.86835 14.6339 4.63393C14.8683 4.39951 15 4.08157 15 3.75005C15 3.41853 14.8683 3.10058 14.6339 2.86616C14.3995 2.63174 14.0815 2.50005 13.75 2.50005H6.25C5.25544 2.50005 4.30161 2.89513 3.59835 3.5984C2.89509 4.30166 2.5 5.25548 2.5 6.25005V23.75C2.5 24.7446 2.89509 25.6984 3.59835 26.4017C4.30161 27.105 5.25544 27.5 6.25 27.5H23.75C24.7446 27.5 25.6984 27.105 26.4017 26.4017C27.1049 25.6984 27.5 24.7446 27.5 23.75V16.25C27.5 15.9185 27.3683 15.6006 27.1339 15.3662C26.8995 15.1317 26.5815 15 26.25 15ZM7.5 15.95V21.25C7.5 21.5816 7.6317 21.8995 7.86612 22.1339C8.10054 22.3684 8.41848 22.5 8.75 22.5H14.05C14.2145 22.501 14.3776 22.4695 14.5299 22.4073C14.6822 22.3451 14.8207 22.2534 14.9375 22.1375L23.5875 13.475L27.1375 10C27.2547 9.88384 27.3477 9.74559 27.4111 9.59327C27.4746 9.44094 27.5072 9.27756 27.5072 9.11255C27.5072 8.94753 27.4746 8.78415 27.4111 8.63182C27.3477 8.4795 27.2547 8.34125 27.1375 8.22505L21.8375 2.86255C21.7213 2.74539 21.583 2.65239 21.4307 2.58893C21.2784 2.52547 21.115 2.4928 20.95 2.4928C20.785 2.4928 20.6216 2.52547 20.4693 2.58893C20.317 2.65239 20.1787 2.74539 20.0625 2.86255L16.5375 6.40005L7.8625 15.0625C7.74665 15.1793 7.65499 15.3179 7.59279 15.4702C7.53058 15.6225 7.49905 15.7855 7.5 15.95ZM20.95 5.51255L24.4875 9.05005L22.7125 10.825L19.175 7.28755L20.95 5.51255ZM10 16.4625L17.4125 9.05005L20.95 12.5875L13.5375 20H10V16.4625Z"
                  fill="#D6D5A8"
                />
              </svg>
            </div>
          </div>
          {openEmoji && (
            <div className={"absolute top-[20px] left-[calc(100%+20px)] z-[10] " + (!isEditing ? "" : "hidden")}>
              <EmojiPicker
                emojiStyle="facebook"
                theme="dark"
                skinTonesDisabled={true}
                onEmojiClick={(e) => {
                  console.log(e);
                  setEmoji(e.emoji);
                }}
              />
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="relative flex flex-col w-full gap-1"
        >
          <div className="flex flex-col xs:flex-row sm:justify-center md:items-center mb-1.5 w-full">
            <div className="w-full xs:max-w-[200px] flex-shrink-0 pr-2 flex justify-start xs:justify-between items-center">
              <span className="text-black font-semibold sm:text-sm whitespace-nowrap">
                Username
              </span>
              <span className="ml-1 hidden xs:block">:</span>
            </div>
            <input
              class="bg-neutral w-full md:max-w-[300px] disabled:bg-slate-500/10 disabled:cursor-not-allowed py-1 px-2 rounded-md border border-purple-200 focus:outline-purple-200"
              disabled
              value={profile.username}
            />
          </div>
          <div className="flex flex-col xs:flex-row sm:justify-center md:items-center mb-1.5 w-full">
            <div className="w-full xs:max-w-[200px] flex-shrink-0 pr-2 flex justify-start xs:justify-between items-center">
              <span className="text-black font-semibold sm:text-sm whitespace-nowrap">
                Email
              </span>
              <span className="ml-1 hidden xs:block">:</span>
            </div>
            <input
              class="bg-neutral w-full md:max-w-[300px] disabled:bg-slate-500/10 disabled:cursor-not-allowed py-1 px-2 rounded-md border border-purple-200 focus:outline-purple-200"
              disabled
              value={profile.email}
            />
          </div>
          <div className="flex flex-col xs:flex-row sm:justify-center md:items-center mb-1.5 w-full">
            <div className="w-full xs:max-w-[200px] flex-shrink-0 pr-2 flex justify-start xs:justify-between items-center">
              <span className="text-black font-semibold sm:text-sm whitespace-nowrap">
                Real Name
              </span>
              <span className="ml-1 hidden xs:block">:</span>
            </div>
            <input
              class="bg-neutral w-full md:max-w-[300px] disabled:bg-slate-500/10 disabled:cursor-not-allowed py-1 px-2 rounded-md border border-purple-200 focus:outline-purple-200"
              placeholder="Enter real name here"
              value={profile.realName}
              name="realName"
              onChange={handleInputChange}
              disabled={isEditing}
            />
          </div>
          <Button
            className={
              "bg-[#816797] rounded-[10px] font-medium text-white border-[#5F4C6F] capitalize mx-auto mt-2"
            }
            type="button"
            onClick={isEditing ? handleSaveProfile : handleEditProfile}
            text={!isEditing ? "Save Profile" : "Edit Profile"}
            disabled={profile.username === "" || profile.email === ""}
          ></Button>
        </form>
      </main>
    </Layout>
  );
}
