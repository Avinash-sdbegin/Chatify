import express from 'express';
const route = express.Router();
import { signup, login, logout, updateprofile, getSignupCount, getAllUsers, getMe } from '../controllers/authController.js';
import { checkAuth } from '../middlewares/authMiddleware.js';

route.post("/signup", signup);
route.post("/login", login);

route.get("/logout", logout);

route.post("/update-profile",checkAuth, updateprofile);

route.get("/me", checkAuth, getMe);

route.get("/users-count", getSignupCount);

route.get("/users", checkAuth, getAllUsers);

export default route;

