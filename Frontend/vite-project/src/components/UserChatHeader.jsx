import { chatStore } from "../store/chatStore";
import { authStore } from "../store/authStore";
import { getProfilePicture } from "../lib/utils";
import { AiOutlineClose } from "react-icons/ai";

const UserChatHeader = () => {
  const { selectedUser, setSelectedUser } = chatStore();
  const { onlineUsers } = authStore();

  if (!selectedUser) return null;

  return (
    <div className="sticky top-0 z-10 bg-linear-to-r from-gray-800 to-gray-900 p-4 shadow-lg border-b border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={getProfilePicture(selectedUser.profilepic, selectedUser.username)}
              alt={selectedUser.username}
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow-md"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></span>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">
              {selectedUser.username}
            </h3>
            <p className="text-xs text-gray-400">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          title="Close chat"
        >
          <AiOutlineClose className="w-5 h-5 text-gray-400 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default UserChatHeader;
