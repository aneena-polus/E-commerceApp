import jwt from 'jsonwebtoken';

export const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN);
        return next();
    } 
    catch {
        return res.sendStatus(403);
    }
};