import UserChatHeader from "./UserChatHeader";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const ChatContainer = () => {
  return (
    <div className="flex flex-col h-full bg-gray-900 md:w-auto">
      <UserChatHeader />
      <div className=" flex-1 overflow-y-auto">
        <Messages />
      </div>
      <div className="shrink p-4 bg-gray-800 border-t border-gray-700">
        <MessageInput />
      </div>
    </div>
  );
};
export default ChatContainer;