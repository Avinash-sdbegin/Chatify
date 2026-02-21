import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";

import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { authStore } from "./store/authStore";
import { useEffect } from "react";
import { chatStore } from "./store/chatStore";

function App() {
  const { loggedUser, socket, checkAuth, isCheckingAuth } = authStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!socket || !loggedUser) return;

    const handleNewMessage = (newMessage) => {
      const { selectedUser, users } = chatStore.getState();

      if (selectedUser && String(newMessage.senderId) === String(selectedUser._id)) {
        return;
      }

      const sender = users?.find((u) => String(u._id) === String(newMessage.senderId));
      const senderName = sender?.username || "New message";

      const preview =
        newMessage?.text && String(newMessage.text).trim() !== ""
          ? String(newMessage.text).slice(0, 50)
          : newMessage?.image
            ? "sent a photo"
            : "";

      toast(`${senderName}${preview ? `: ${preview}` : ""}`);
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, loggedUser]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>

        <Route
          path="/"
          element={
            isCheckingAuth ? (
              <div className="p-6 text-gray-300">Checking session...</div>
            ) : loggedUser ? (
              <HomePage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/signup"
          element={
            isCheckingAuth ? (
              <div className="p-6 text-gray-300">Checking session...</div>
            ) : !loggedUser ? (
              <SignUpPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/login"
          element={
            isCheckingAuth ? (
              <div className="p-6 text-gray-300">Checking session...</div>
            ) : !loggedUser ? (
              <LoginPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/profile"
          element={
            isCheckingAuth ? (
              <div className="p-6 text-gray-300">Checking session...</div>
            ) : loggedUser ? (
              <ProfilePage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        </Routes>
      </main>
      <Toaster />
    </div>
  );
}
export default App;