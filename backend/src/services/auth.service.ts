import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { UserLogin, UserSignUp } from "../types/auth.types";
import { generateAccessToken, generateRefreshToken } from "../utilities/token";
import prisma from "../db/prisma";
import { AppError } from '../utilities/error';

export class AuthService {
    login = async (data: UserLogin) => {
        const { email, password } = data;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) throw new AppError(404, "User not found");

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) throw new AppError(401, "Invalid credentials");

        const accessToken = generateAccessToken(user.id , user.email);
        const refreshToken = generateRefreshToken(user.id , user.email);

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                refreshToken
            }
        });

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            accessToken,
            refreshToken
        };
    };

    signup = async (data: UserSignUp) => {
        const { name, email, password } = data;

        const userExists = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (userExists) throw new AppError(409, "User already exists");
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword }
        });

        const accessToken = generateAccessToken(newUser.id , newUser.email);
        const refreshToken = generateRefreshToken(newUser.id , newUser.email);

        await prisma.user.update({
            where: { id: newUser.id },
            data: { refreshToken }
        })

        return {
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
            accessToken,
            refreshToken
        }
    }

    refresh = async (refreshToken: string) => {
        const payload = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET!
        ) as { userId: string };

        const user = await prisma.user.findUnique({
            where: {
                id: payload.userId
            }
        });

        if (!user || user.refreshToken !== refreshToken) {
            throw new Error("Invalid refresh token");
        }

        const newAccessToken = generateAccessToken(user.id , user.email);
        const newRefreshToken = generateRefreshToken(user.id , user.email);

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                refreshToken: newRefreshToken
            }
        });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    };
};