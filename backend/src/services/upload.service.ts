import prisma from "../db/prisma"

export class UploadService{
    upload = async (userId: string , file: Express.Multer.File)=>{
        const res = await prisma.file.create({
            data:{
                fileName: file.filename,
                originalName: file.originalname,
                fileType: file.mimetype,
                fileSize: file.size,
                path: file.path,
                userId
            }
        });

        return {data: res}
    }
}