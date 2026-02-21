import { chatStore } from "../store/chatStore";
import { MdImage } from "react-icons/md";
import { LuSendHorizontal } from "react-icons/lu";
import { authStore } from "../store/authStore";

import { useState } from "react";
import { useRef } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = chatStore();
  const { onlineUsers } = authStore();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      await chatStore().sendMessage({
        text: text.trim(),
        image: image,
      });
      setText("");
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("failed to send message");
    }
  };

  return (
    <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="rounded-lg hover:bg-gray-700/60 flex items-center justify-center"
          title="Attach image"
        >
          <MdImage className="size-11 text-blue-400" />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImage}
        />
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-lg md:rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors text-gray-100 bg-slate-700 shadow-sm border border-gray-600 text-sm md:text-base"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="p-2 md:p-3 bg-blue-600 text-white rounded-lg md:rounded-xl hover:bg-blue-700 flex items-center justify-center shadow-xl"
        >
          <LuSendHorizontal className="w-5 h-5" />
        </button>
    </div>
  );
};

export default ChatHeader;