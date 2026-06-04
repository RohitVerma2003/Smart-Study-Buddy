import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";

import authRouter from './routes/auth.route'
import uploadRouter from './routes/upload.route'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1' , authRouter);
app.use('/api/v1' , uploadRouter);

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello from TypeScript backend!" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
