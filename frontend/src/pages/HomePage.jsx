import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import { useAuthStore } from "../store/useAuthStore";
import defaultProfile from "../assets/defaultProfile.png";

function HomePage() {
  const { authUser, logout } = useAuthStore();

  return (
    <div className="h-screen bg-gradient-to-br from-slate-100 via-slate-100 to-indigo-100/40 text-slate-900 flex flex-col">
      <header className="bg-white/90 backdrop-blur border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-indigo-700 bg-clip-text text-transparent">
              SyncChat
            </h1>
            <p className="text-sm text-slate-500 mt-1">Simple real-time messaging</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-3 py-2 shadow-sm">
              <img
                src={authUser?.profilePic?.trim() ? authUser.profilePic : defaultProfile}
                alt={authUser?.fullName}
                className="w-11 h-11 rounded-full object-cover border-2 border-slate-100"
              />
              <div>
                <p className="font-semibold text-slate-800 leading-none">{authUser?.fullName}</p>
                <p className="text-sm text-slate-500 mt-1">{authUser?.email}</p>
              </div>
            </div>

            <Link
              to="/profile"
              className="h-11 px-5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition font-medium shadow-sm flex items-center"
            >
              Profile
            </Link>

            <Link
              to="/settings"
              className="h-11 px-5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition font-medium shadow-sm flex items-center"
            >
              Settings
            </Link>

            <button
              onClick={logout}
              className="h-11 px-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 transition font-medium shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-5 overflow-hidden">
        <div className="h-full grid grid-cols-[340px_1fr] gap-5">
          <div className="rounded-3xl overflow-hidden shadow-lg shadow-slate-200/60">
            <Sidebar />
          </div>

          <div className="rounded-3xl overflow-hidden shadow-lg shadow-slate-200/60">
            <ChatContainer />
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;