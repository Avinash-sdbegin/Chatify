import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { authStore } from "./authStore";

export const chatStore = create((set, get) => ({
  users: [],
  selectedUser: null,
  messages: [],
  isLoadingMessages: false,

  newMessageHandler: null,
  profileUpdatedHandler: null,

  getUsers: async () => {
    try {
      const res = await axiosInstance.post("/messages/users");
      set({ users: res.data.users });
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      toast.error("Failed to fetch contacts");
    }
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  getMessages: async () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    set({ isLoadingMessages: true });
    try {
      const res = await axiosInstance.get(`/messages/getmessages/${selectedUser._id}`);
      set({ messages: res.data.messages || [] });
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      toast.error("Failed to fetch messages");
      set({ messages: [] });
    } finally {
      set({ isLoadingMessages: false });
    }
  },

  sendMessage: async (data) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;

    try {
      const res = await axiosInstance.post(`/messages/sendmessage/${selectedUser._id}`, data);
      set({ messages: [...messages, res.data.newMessage] });
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    }
  },

  listenForNewMessage: () => {
    const { socket } = authStore.getState();
    if (!socket) return;

    if (get().newMessageHandler) return;

    const handler = (newMessage) => {
      const { selectedUser, messages } = get();
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        set({ messages: [...messages, newMessage] });
      }
    };

    set({ newMessageHandler: handler });
    socket.on("newMessage", handler);
  },

  stopListeningForMessages: () => {
    const { socket } = authStore.getState();
    if (!socket) return;

    const handler = get().newMessageHandler;
    if (handler) {
      socket.off("newMessage", handler);
      set({ newMessageHandler: null });
    }
  },

  listenForProfileUpdates: () => {
    const { socket } = authStore.getState();
    if (!socket) return;

    if (get().profileUpdatedHandler) return;

    const handler = ({ userId, profilepic }) => {
      const { users, selectedUser } = get();

      const nextUsers = users.map((user) =>
        String(user._id) === String(userId) ? { ...user, profilepic } : user
      );

      const nextSelectedUser =
        selectedUser && String(selectedUser._id) === String(userId)
          ? { ...selectedUser, profilepic }
          : selectedUser;

      set({ users: nextUsers, selectedUser: nextSelectedUser });
    };

    set({ profileUpdatedHandler: handler });
    socket.on("profileUpdated", handler);
  },

  stopListeningForProfileUpdates: () => {
    const { socket } = authStore.getState();
    if (!socket) return;

    const handler = get().profileUpdatedHandler;
    if (handler) {
      socket.off("profileUpdated", handler);
      set({ profileUpdatedHandler: null });
    }
  },
}));

export default chatStore;