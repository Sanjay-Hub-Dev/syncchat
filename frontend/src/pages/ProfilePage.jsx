import { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import defaultProfile from "../assets/defaultProfile.png";

function ProfilePage() {
  const { authUser, updateProfile } = useAuthStore();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(authUser?.profilePic || "");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = async () => {
        const canvas = document.createElement("canvas");

        const maxWidth = 400;
        const scaleSize = maxWidth / img.width;

        canvas.width = maxWidth;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);

        setPreview(compressedBase64);
        await updateProfile(compressedBase64);
      };
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-4">
          <Link to="/" className="btn btn-outline btn-sm">
            Back to Chat
          </Link>
        </div>

        <div className="card w-full bg-base-200 shadow-xl p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Profile</h1>

          <div className="flex flex-col items-center gap-4">
            <img
              src={preview || defaultProfile}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border"
            />

            <button
              className="btn btn-primary"
              onClick={() => fileInputRef.current.click()}
            >
              Change Profile Picture
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
            />

            <div className="text-center">
              <p className="font-semibold">{authUser?.fullName}</p>
              <p className="text-sm opacity-70">{authUser?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;