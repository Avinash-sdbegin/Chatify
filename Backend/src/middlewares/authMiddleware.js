import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

export const checkAuth = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({ message: "token is required" });
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({ message: "Invalid token" });
        }
        const user = await User.findById(decode.userId).select('-password');
        if(!user){
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
        next();
    }catch(error){
        console.log('error in authMiddleware:', error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
}
