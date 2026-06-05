/*
  Warnings:

  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_userId_fkey";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "embeddedAt" TIMESTAMP(3),
ADD COLUMN     "embeddingStatus" "EmbeddingStatus" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "Document";
