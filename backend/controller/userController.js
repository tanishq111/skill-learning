import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (user) => { // this is the function that generates a JWT token for the user
    return jwt.sign({ id: user._id , role: user.role ,name: user.name}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const issueRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
};

const PublicUser = (user) => {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        enrolledCourses: user.enrolledCourses
    };
};

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password }); // model
        // check if user already exists
        const existingUser = await User.findOne({ email });
        console.log("Checking if user already exists with email:", email);
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        console.log("Saving new user with email:", email);
        await user.save();
        res.status(201).json({
            user: PublicUser(user),
            token: generateToken(user),
            refreshToken: issueRefreshToken(user)
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid password attempt for email:", email);
            return res.status(400).json({ error: "Invalid email or password" });
        }
        res.status(200).json({ user: PublicUser(user), token: generateToken(user), refreshToken: issueRefreshToken(user) });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ error: "Refresh token is required" });
        }
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ token: generateToken(user) , refreshToken: issueRefreshToken(user) });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ user: PublicUser(user) });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// api to update enrollerd courese

export { register, login, PublicUser, generateToken, issueRefreshToken, me, refresh };