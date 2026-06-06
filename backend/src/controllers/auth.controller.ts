import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { AppError } from "../utilities/error";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    signup = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.signup(req.body);

            res.cookie("accessToken", result.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 15 * 60 * 1000
            });

            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: result.user,
            });
        } catch (error) {
            return this.handleError(error, res);
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.login(req.body);

            res.cookie("accessToken", result.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 15 * 60 * 1000
            });

            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.status(200).json({
                success: true,
                message: "Login successful",
                data: result.user,
            });
        } catch (error) {
            return this.handleError(error, res);
        }
    };

    refresh = async (req: Request, res: Response) => {
        try {
            const { refreshToken } = req.cookies;

            const result = await this.authService.refresh(
                refreshToken
            );

            res.cookie("accessToken", result.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 15 * 60 * 1000
            });

            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.status(200).json({
                success: true
            });
        } catch (error) {
            return this.handleError(error, res);
        }
    };

    logout = async (req: Request, res: Response) => {
        try {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");

            return res.status(200).json({
                success: true,
                message: "Logged out"
            });
        } catch (error) {
            return this.handleError(error, res);
        }
    };

    me = async (req: Request , res: Response) => {
        return res.status(200).json({
            success: true,
            data:{
                userId: req.user?.userId,
                email: req.user?.email
            }
        })
    }

    private handleError(error: unknown, res: Response) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}