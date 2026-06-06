import jwt from "jsonwebtoken";

export const generateAccessToken = (
    userId: string, email: string
) => {
    return jwt.sign(
        { userId, email },
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: "15m" }
    );
};

export const generateRefreshToken = (
    userId: string, email: string
) => {
    return jwt.sign(
        { userId, email },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: "7d" }
    );
};