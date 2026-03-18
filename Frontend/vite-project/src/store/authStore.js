import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export const authStore = create((set, get) => ({
  loggedUser: null,
  onlineUsers: [],
  socket: null,
  isCheckingAuth: true,

  signup: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ loggedUser: res.data });
      toast.success("Signup successfull");
      get().connectSocket();
    } catch {
      toast.error("Signup failed. Please try again.");
      set({ loggedUser: null });
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      set({ loggedUser: res.data });
      get().connectSocket();
    } catch {
      set({ loggedUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },


  login: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      console.log(res);
      set({ loggedUser: res.data });
      toast.success("Login successfull");
      get().connectSocket();
    } catch {
      toast.error("Login failed. please try again");
      set({ loggedUser: null });
    }
  },


  logout: async () => {
    try {
      await axiosInstance.get("/auth/logout");
      set({ loggedUser: null });
      toast.success("Logout successful");
      get().disconnectSocket();
    } catch {
      toast.error("Logout failed. please try again");
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/update-profile", data);
      set({ loggedUser: res.data });
      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.response?.data?.message || "Updating Profile failed.");
    }
  },

  connectSocket: () => {
    const { loggedUser } = get();
    if (!loggedUser?._id) return;
    if (get().socket?.connected) return;

    const socket = io(socketUrl, {
      query: { userId: loggedUser._id },
    });
    socket.connect();
    set({ socket: socket });
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
      console.log(userIds);
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));