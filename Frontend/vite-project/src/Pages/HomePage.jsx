import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/Sidebar";
import { chatStore } from "../store/chatStore";


const HomePage = () => {
  const { selectedUser } = chatStore();
  return (
    <div className="flex flex-row h-screen overflow-hidden bg-gray-900 rounded-lg shadow-lg w-full border border-gray-800">
      <Sidebar />
      <main className="flex-1 bg-gray-900">
        {selectedUser ? <ChatContainer /> : <NoChatSelected />}
      </main>
    </div>
  );
};

export default HomePage;