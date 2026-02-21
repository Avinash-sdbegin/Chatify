import { FiMessageSquare } from "react-icons/fi";

const NoChatSelected = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <FiMessageSquare className="text-5xl text-blue-600 animate-bounce bg-gray-900 p-2 rounded-lg" />
      <div className="flex flex-col justify-center text-white py-5 items-center">
        <h1 className="text-3xl text-white mb-4">Welcome to Chatify</h1>
        <p className="text-gray-200 mb-4">
          This is your home page where you can start chatting with your friends.
        </p>
      </div>
    </div>
  );
};
export default NoChatSelected;