import prisma from "../db/prisma"

export class UploadService {
    upload = async (userId: string, file: Express.Multer.File) => {
        const res = await prisma.file.create({
            data: {
                fileName: file.filename,
                originalName: file.originalname,
                fileType: file.mimetype,
                fileSize: file.size,
                path: file.path,
                userId
            }
        });

        return { data: res }
    }

    getFiles = async (userId: string, page: number, skip: number, limit: number) => {
        const [documents, totalDocuments] = await Promise.all([
            prisma.file.findMany({
                where: {
                    userId
                },
                skip,
                take: limit,
                orderBy: {
                    createdAt: "desc"
                }
            }),

            prisma.file.count({
                where: {
                    userId
                }
            })
        ]);

        return {
            data: documents,
            pagination: {
                page,
                limit,
                totalDocuments,
                totalPages: Math.ceil(
                    totalDocuments / limit
                ),
                hasNextPage:
                    page < Math.ceil(totalDocuments / limit),
                hasPreviousPage: page > 1
            }
        };
    }
}