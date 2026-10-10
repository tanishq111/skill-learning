import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Not authorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // this started giving expired -> then we will generate
        req.user = decoded;
        next();
    } catch (error) {
        const code = error.name === "TokenExpiredError" ? "TOKEN_EXPIRED" : "TOKEN_INVALID";
        return res.status(401).json({ error: "Not authorized", code });
    }
};


const restricTo = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: "Forbidden" });
        }
        next();
    };
};

const restricToFresh = (...allowedRoles) => async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("role");
        if (!user) {
            return res.status(401).json({ error: "Account no longer exists" });
        }
        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({ error: "Forbidden" });
        }

        req.user.role = user.role;
        next();
    } catch (error) {
        next(error);
    }
};

export { protect, restricTo, restricToFresh };
export default protect;