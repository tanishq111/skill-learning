import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const REFRESH_COOKIE = "refreshTokenCookie";
const REFRESH_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

const generateToken = (user) => { // this is the function that generates a JWT token for the user
    return jwt.sign({ id: user._id , role: user.role ,name: user.name}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "15m" });
};

const issueRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" });
};

// The refresh token never reaches JS on the client; only the browser can send it back.
const isProd = process.env.NODE_ENV === "production";
const setRefreshCookie = (res, user) => {
    res.cookie(REFRESH_COOKIE, issueRefreshToken(user), { // key value thing -> in cookies refreshTokenCookie -> the refresh token
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "strict", // cross-site cookie needs none+secure in prod
        path: "/auth",
        maxAge: REFRESH_MAX_AGE_MS,
    });
};

const clearRefreshCookie = (res) => {
    res.clearCookie(REFRESH_COOKIE, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "strict",
        path: "/auth",
    });
};

const toPublicUser = (user) => {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        enrolledCourses: user.enrolledCourses
    };
};

const SIGNUP_ROLES = ["student", "instructor"];

const register = async (req, res, next) => {
    try {
        const { name, email, password, role = "student" } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "name, email and password are required" });
        }
        if (typeof password !== "string" || password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters" });
        }
        if (!SIGNUP_ROLES.includes(role)) {
            return res.status(400).json({ error: `role must be one of: ${SIGNUP_ROLES.join(", ")}` });
        }

        const normalizedName = String(name).trim();
        const normalizedEmail = String(email).trim().toLowerCase();
        if (!normalizedName || !normalizedEmail) {
            return res.status(400).json({ error: "name, email and password are required" });
        }

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({ error: "An account with this email already exists" });
        }

        const user = await User.create({
            name: normalizedName,
            email: normalizedEmail,
            password,
            role,
        });

        const token = generateToken(user);
        setRefreshCookie(res, user);
        res.status(201).json({
            user: toPublicUser(user),
            token,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: "An account with this email already exists" });
        }
        next(error);
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = String(email ?? "").trim().toLowerCase();
        const user = await User.findOne({ email: normalizedEmail }).select("+password");
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid password attempt for email:", email);
            return res.status(400).json({ error: "Invalid email or password" });
        }
        setRefreshCookie(res, user);
        res.status(200).json({ user: toPublicUser(user), token: generateToken(user) });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const refresh = async (req, res) => {
    const token = req.cookies?.[REFRESH_COOKIE];
    if (!token) {
        return res.status(401).json({ error: "Not authorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            clearRefreshCookie(res);
            return res.status(401).json({ error: "Not authorized" });
        }
        setRefreshCookie(res, user); // rotate on every use // should we issue new refresh when it is expired ?
        res.status(200).json({ token: generateToken(user), user: toPublicUser(user) });
    } catch {
        clearRefreshCookie(res);
        res.status(401).json({ error: "Not authorized" });
    }
};

const logout = async (req, res) => {
    clearRefreshCookie(res);
    res.status(200).json({ message: "Logged out" });
};


const ROLES = ["student", "instructor", "admin"];

const changeUserRole = async (req, res, next) => {
    try {
        const { role } = req.body;

        if (!ROLES.includes(role)) {
            return res.status(400).json({ error: `role must be one of: ${ROLES.join(", ")}` });
        }
        if (req.params.id === req.user.id) {
            return res.status(403).json({ error: "You cannot change your own role" });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        console.warn(`[audit] ${req.user.id} set role=${role} on user ${user._id}`);
        res.status(200).json({ user: toPublicUser(user) });
    } catch (error) {
        next(error);
    }
};


const me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ user: toPublicUser(user) });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// api to update enrollerd courese

export {
    register,
    login,
    toPublicUser,
    toPublicUser as PublicUser,
    generateToken,
    issueRefreshToken,
    me,
    refresh,
    logout,
    changeUserRole,
    changeUserRole as promoteToInstructor,
};