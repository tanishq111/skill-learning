import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
    // it does not ready any thing relted to role.
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Not authorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // this started giving expired -> then we will generate
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Not authorized" });
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

export { protect, restricTo };
export default protect;