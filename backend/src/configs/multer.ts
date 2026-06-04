import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination: (req: any, file, cb) => {
        const userId = req.user.userId;

        const userDir = path.join(
            process.cwd(),
            "uploads",
            userId
        );

        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, {
                recursive: true
            });
        }

        cb(null, userDir);
    },

    filename: (req, file, cb) => {
        const uniqueName =
            `${Date.now()}-${file.originalname}`;

        cb(null, uniqueName);
    }
});

const fileFilter = (
    req: any,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    const ext = path.extname(
        file.originalname
    ).toLowerCase();

    const allowedExtensions = [
        ".pdf",
        ".txt"
    ];

    if (!allowedExtensions.includes(ext)) {
        return cb(
            new Error(
                "Only PDF and TXT files are allowed"
            )
        );
    }

    cb(null, true);
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024
    }
})