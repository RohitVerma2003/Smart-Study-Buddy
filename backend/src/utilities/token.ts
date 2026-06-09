import jwt from "jsonwebtoken";

export const generateAccessToken = (
    userId: string, email: string
) => {
    return jwt.sign(
        { userId, email },
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: "1d" }
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