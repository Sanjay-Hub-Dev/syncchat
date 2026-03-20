import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import defaultProfile from "../assets/defaultProfile.png";

function Sidebar() {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) {
    return <div className="h-full p-5 text-base-content/70">Loading users...</div>;
  }

  return (
    <div className="h-full flex flex-col bg-base-100">
      <div className="px-5 py-5 border-b border-base-300">
        <h2 className="text-2xl font-semibold">Chats</h2>
        <p className="text-sm text-base-content/70 mt-1">Recent conversations</p>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 bg-base-100">
        {users.length === 0 ? (
          <p className="p-4 text-sm text-base-content/70">No other users found</p>
        ) : (
          <div className="space-y-2">
            {users.map((user) => {
              const isOnline = onlineUsers.includes(user._id);
              const isActive = selectedUser?._id === user._id;

              return (
                <button
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full text-left px-3 py-3 rounded-2xl transition border ${
                    isActive
                      ? "bg-primary/10 border-primary/30 shadow-sm"
                      : "bg-base-100 border-transparent hover:bg-base-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={user.profilePic?.trim() ? user.profilePic : defaultProfile}
                        alt={user.fullName}
                        className="w-12 h-12 rounded-full object-cover border border-base-300"
                      />
                      <span
                        className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-base-100 ${
                          isOnline ? "bg-success" : "bg-base-300"
                        }`}
                      ></span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-semibold truncate">{user.fullName}</p>
                      <p className="text-sm text-base-content/70 truncate">{user.email}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;