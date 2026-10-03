import jwt from "jsonwebtoken";

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
        res.status(401).json({ error: "Not authorized" });
    }
};

export default protect;