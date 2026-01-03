import jwt from "jsonwebtoken";


function verifyJWT(req, res,next) {
    try {
        const auth = req.headers.authorization;
        if (!auth || !auth.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorization"
            });
        };

        const token = auth.split(" ")[1];

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode
        next();
    } catch (error) {
        console.log(error.message)
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    };

}

export default verifyJWT;
