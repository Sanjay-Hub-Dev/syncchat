import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import defaultProfile from "../assets/defaultProfile.png";

function ChatContainer() {
  const {
    selectedUser,
    messages,
    getMessages,
    sendMessage,
    deleteMessage,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser, onlineUsers } = useAuthStore();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }

    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white flex items-center justify-center text-3xl font-bold shadow-lg mb-5">
            S
          </div>
          <h3 className="text-3xl font-semibold text-slate-800">Welcome to SyncChat</h3>
          <p className="text-slate-500 mt-3 leading-relaxed">
            Select a conversation to start chatting in a clean real-time workspace.
          </p>
        </div>
      </div>
    );
  }

  const isSelectedUserOnline = onlineUsers.includes(selectedUser._id);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 500;
        const scaleSize = Math.min(maxWidth / img.width, 1);

        canvas.width = img.width * scaleSize;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
        setImagePreview(compressedBase64);
      };
    };
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    await sendMessage({
      text,
      image: imagePreview,
    });

    setText("");
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={selectedUser.profilePic?.trim() ? selectedUser.profilePic : defaultProfile}
              alt={selectedUser.fullName}
              className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shadow-sm"
            />
            <span
              className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                isSelectedUserOnline ? "bg-emerald-500" : "bg-slate-300"
              }`}
            ></span>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">{selectedUser.fullName}</h2>
            <p className="text-sm text-slate-500">
              {isSelectedUserOnline ? "Online now" : "Currently offline"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 bg-gradient-to-b from-slate-50 via-slate-50 to-indigo-50/40">
        {isMessagesLoading ? (
          <p className="text-slate-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-slate-700 font-medium text-lg">No messages yet</p>
              <p className="text-slate-400 text-sm mt-1">Say hello and start the conversation</p>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {messages.map((msg) => {
              const isOwnMessage = msg.senderId?.toString() === authUser?._id;
              const hasOnlyImage = msg.image && !msg.text;

              return (
                <div
                  key={msg._id}
                  className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                    <div className="group flex flex-col">
                      {hasOnlyImage ? (
                        <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-md">
                          <img
                            src={msg.image}
                            alt="sent"
                            className="rounded-xl w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className={`rounded-2xl px-4 py-3 shadow-md ${
                            isOwnMessage
                              ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-br-md"
                              : "bg-white text-slate-800 border border-slate-200 rounded-bl-md"
                          }`}
                        >
                          {msg.text && (
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                              {msg.text}
                            </p>
                          )}

                          {msg.image && (
                            <div className="mt-3 bg-white/95 rounded-xl p-2">
                              <img
                                src={msg.image}
                                alt="sent"
                                className="rounded-lg w-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {isOwnMessage && (
                        <button
                          onClick={() => deleteMessage(msg._id)}
                          className="mt-1 text-xs text-red-500 opacity-0 group-hover:opacity-100 transition self-end hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef}></div>
          </div>
        )}
      </div>

      {imagePreview && (
        <div className="px-5 pt-4 bg-white border-t border-slate-200">
          <div className="relative w-28">
            <img
              src={imagePreview}
              alt="preview"
              className="rounded-2xl border border-slate-200 shadow-sm"
            />
            <button
              type="button"
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-slate-900 text-white text-xs shadow-md"
              onClick={() => {
                setImagePreview("");
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSend}
        className="p-4 border-t border-slate-200 bg-white flex gap-3 items-center"
      >
        <input
          type="text"
          placeholder="Write a message..."
          className="flex-1 h-12 px-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />

        <button
          type="button"
          className="h-12 px-5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition font-medium shadow-sm"
          onClick={() => fileInputRef.current?.click()}
        >
          Image
        </button>

        <button className="h-12 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 transition font-medium shadow-md">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatContainer;