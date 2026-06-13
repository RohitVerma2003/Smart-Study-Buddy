import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';

import authRouter from './routes/auth.route'
import uploadRouter from './routes/upload.route'
import documentRouter from './routes/document.route'
import chatRouter from './routes/chat.route'
import quizRouter from './routes/quiz.route'
import path from "node:path";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(
    "/uploads",
    express.static(
        path.join(process.cwd(), "uploads")
    )
);
app.use('/api/v1', authRouter);
app.use('/api/v1', uploadRouter);
app.use('/api/v1', documentRouter);
app.use('/api/v1', chatRouter);
app.use('/api/v1', quizRouter);

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello from TypeScript backend!" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
