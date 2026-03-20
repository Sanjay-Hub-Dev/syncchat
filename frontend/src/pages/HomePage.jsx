import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import { useAuthStore } from "../store/useAuthStore";
import defaultProfile from "../assets/defaultProfile.png";

function HomePage() {
  const { authUser, logout } = useAuthStore();

  return (
    <div className="h-screen bg-base-200 text-base-content flex flex-col">
      <header className="bg-base-100 border-b border-base-300 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">SyncChat</h1>
            <p className="text-sm text-base-content/70 mt-1">Simple real-time messaging</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 bg-base-100 border border-base-300 rounded-2xl px-3 py-2 shadow-sm">
              <img
                src={authUser?.profilePic?.trim() ? authUser.profilePic : defaultProfile}
                alt={authUser?.fullName}
                className="w-11 h-11 rounded-full object-cover border border-base-300"
              />
              <div>
                <p className="font-semibold leading-none">{authUser?.fullName}</p>
                <p className="text-sm text-base-content/70 mt-1">{authUser?.email}</p>
              </div>
            </div>

            <Link to="/profile" className="btn btn-outline btn-sm md:btn-md rounded-xl">
              Profile
            </Link>

            <Link to="/settings" className="btn btn-outline btn-sm md:btn-md rounded-xl">
              Settings
            </Link>

            <button onClick={logout} className="btn btn-primary btn-sm md:btn-md rounded-xl">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-5 overflow-hidden">
        <div className="h-full grid grid-cols-[340px_1fr] gap-5">
          <div className="rounded-3xl overflow-hidden bg-base-100 border border-base-300 shadow-sm">
            <Sidebar />
          </div>

          <div className="rounded-3xl overflow-hidden bg-base-100 border border-base-300 shadow-sm">
            <ChatContainer />
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;