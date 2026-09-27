import User from "../models/user.js";
import bcrypt from "bcryptjs";
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
        res.status(201).json(user);
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
            return res.status(400).json({ error: "Invalid email or password" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};





// api to update enrollerd courese

export { register, login };