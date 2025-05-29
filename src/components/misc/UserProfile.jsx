import { updateUser } from "@/redux/slices/authSlice";
import axios from "axios";
import { useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

function UserProfile() {
  const [profileData, setProfileData] = useState({
    email: "",
    phone: "",
    location: "",
    postal: "",
    avatar: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const fileRef = useRef(null);

  console.log(user);

  function handleProfileData(e) {
    const { value, name } = e.target;
    setProfileData((prev) => {
      const newData = { ...prev, [name]: value };
      return newData;
    });
  }

  async function handleImageUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];

    const fileData = new FormData();
    fileData.append("file", file);
    fileData.append("upload_preset", "groxi_store"); // Only needed field

    setIsLoading(true); // Assuming this is a state setter

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDNAME
        }/image/upload`,
        fileData
      );

      if (response.status !== 200)
        throw new Error("File upload unsuccessfully");

      console.log(response.data);
      setProfileData((prev) => ({ ...prev, avatar: response.data.secure_url }));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  function handleFileToggle() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUser(profileData));
  }

  return (
    <div className="">
      {user && (
        <div className="">
          <div className="flex items-center gap-4 mb-10">
            <div className="relative">
              <div
                onClick={handleFileToggle}
                className="w-[100px] h-[100px] border-2 border-main rounded-full overflow-hidden"
              >
                <img
                  src={`${profileData.avatar || user.avatar}`}
                  alt=""
                  className="object-cover"
                />

                <FaPen className="absolute h-5 w-5 p-1 rounded-full top-15 -right-1 text-xs bg-[var(--color-main)] text-white" />
              </div>
            </div>
            <input
              onChange={handleImageUpload}
              ref={fileRef}
              type="file"
              name="file"
              id=""
              className="hidden"
              accept="image/*"
            />
            <div className="">
              <p className="font-semibold text-xl">
                {user.firstname} {user.lastname}
              </p>
              {user?.location?.city && (
                <span className="text-sm mr-1 italic">New York,</span>
              )}
              {user?.location?.country && (
                <span className="text-sm mr-1 italic">USA</span>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full flex-wrap gap-7">
            <div className="flex-1">
              <label htmlFor="firstname" className="block mb-1">
                Firstname
              </label>
              <input
                type="text"
                name="name"
                id="firstname"
                className="p-3 border border-[var(--color-main)] rounded-md"
                value={`${user.firstname}`}
                disabled
              />
            </div>

            <div className="flex-1">
              <label htmlFor="lastname" className="block mb-1">
                Lastname
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="p-3 border border-[var(--color-main)] rounded-md"
                value={`${user.lastname}`}
                disabled
              />
            </div>

            <div className="flex-1">
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={(e) => handleProfileData(e)}
                id="email"
                className="p-3 border border-[var(--color-main)] rounded-md focus:border-[var(--color-sec)] focus:outline-0"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="phone" className="block mb-1">
                Phone No.
              </label>
              <input
                value={profileData.phone}
                onChange={(e) => handleProfileData(e)}
                type="tel"
                name="phone"
                id="phone"
                className="p-3 border border-[var(--color-main)] rounded-md"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="location" className="block mb-1">
                Location
              </label>
              <input
                value={profileData.location}
                onChange={(e) => handleProfileData(e)}
                type="text"
                name="location"
                id="location"
                placeholder="eg: USA"
                className="p-3 border border-[var(--color-main)] rounded-md"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="postal" className="block mb-1">
                Postal code
              </label>
              <input
                value={profileData.postal}
                onChange={(e) => handleProfileData(e)}
                type="text"
                name="postal"
                id="postal"
                className="p-3 border border-[var(--color-main)] rounded-md focus:border-[var(--color-sec)] focus:outline-0"
              />
            </div>

            <button
              className="text-center bg-main py-3 px-8 text-white rounded-md cursor-pointer hover:opacity-85 mt-8"
              type="submit"
              disabled={isLoading}
            >
              Save changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
