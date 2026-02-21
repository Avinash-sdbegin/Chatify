import { FaUserCircle } from "react-icons/fa";
import { chatStore } from "../store/chatStore";
import { useEffect } from "react";
import { authStore } from "../store/authStore";
import { getProfilePicture } from "../lib/utils";

const Sidebar = () => {


  const { users, getUsers, setSelectedUser, listenForProfileUpdates, stopListeningForProfileUpdates } = chatStore();

  const { onlineUsers } = authStore();
  
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    listenForProfileUpdates();
    return () => stopListeningForProfileUpdates();
  }, [listenForProfileUpdates, stopListeningForProfileUpdates]);

  return (


    <aside className="h-full w-20 lg:w-72 flex flex-col transition-all duration-200 bg-linear-to-b from-gray-900 to-gray-800 border-r border-gray-800">
      <div className="w-full p-5 bg-gray-900/80 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-3">
          <FaUserCircle className="size-7 text-blue-500" />
          <span className="font-semibold text-lg hidden lg:block tracking-wide text-blue-400">
            Contacts
          </span>
        </div>
      </div>



      <div className="overflow-y-auto w-full py-4 px-2 flex-1">
        {users.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            No contacts found.
          </div>



        )}

        {users.map((user) => (
          <button
            key={user._id}
            className="w-full flex items-center gap-4 p-2 my-2 rounded-xl hover:bg-blue-500/10 transition-colors bg-gray-900 shadow-lg group border border-gray-800"
            onClick={() => setSelectedUser(user)}
          >


            <div className="relative shrink-0">
              <img
                src={getProfilePicture(user.profilepic, user.username)}
                alt="profile"
                className="size-12 object-cover rounded-full group-hover:border-primary/60 transition-all"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow"></span>
              )}
            </div>




            <div className="hidden lg:flex flex-col items-start flex-1 min-w-0">
              <span className="font-medium text-gray-100 truncate">
                {user.username}
              </span>
              <span className="text-xs text-gray-400 truncate">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </span>
            </div>



          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;