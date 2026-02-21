import User from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import tokenGeneration from '../lib/token.js';
import cloudinary from '../lib/cloudinary.js';
import { io } from '../lib/socket.js';




export const signup = async(req, res) => {
    const { email, password, username, profilepic } = req.body;
    try{
        if(!email || !password || !username){
            return res.status(400).json({ message: "All fields are required" });
        }
        if(password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            username
        });
        await newUser.save();
        if(newUser){
            tokenGeneration(newUser._id, res);
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilepic: newUser.profilepic,
            });
        }

    } catch (error) {
        console.log('error in signup:', error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
}





export const login = async(req, res) => {
   const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "User does not exist" });
        }
        const ispassword = await bcrypt.compare(password, user.password);
        if(!ispassword){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        tokenGeneration(user._id, res);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilepic: user.profilepic,
        });
    } catch (error) {
        console.log('error in login:', error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
}




export const logout = (req, res) => {
    try{
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log('error in logout:', error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
}



export const updateprofile=async(req,res)=>{
try{
const {profilepic}=req.body;
const userId=req.user._id;

if (profilepic === undefined) {
    return res.status(400).json({ message: "profilepic field is required" });
}

let updatedProfileUrl = "";
if (typeof profilepic === "string" && profilepic.trim() !== "") {
    const uploadImage = await cloudinary.uploader.upload(profilepic);
    updatedProfileUrl = uploadImage.secure_url;
}

const updateUser = await User.findByIdAndUpdate(
    userId,
    { profilepic: updatedProfileUrl },
    { new: true }
).select('-password');

io.emit("profileUpdated", { userId: String(userId), profilepic: updatedProfileUrl });

res.status(200).json(updateUser);
}catch (error) {
    console.log('error in updateprofile:', error.message);
    return res.status(500).json({ message: "error in updating profile", error: error.message });
    
}
}


export const getSignupCount = async (req, res) => {
    try {
        const count = await User.countDocuments();
        return res.status(200).json({ count });
    } catch (error) {
        console.log('error in getSignupCount:', error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
};


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        return res.status(200).json({ users });
    } catch (error) {
        console.log('error in getAllUsers:', error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
};


export const getMe = async (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log('error in getMe:', error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
};