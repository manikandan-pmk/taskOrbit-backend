-- CreateEnum
CREATE TYPE "status" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "WorkspaceInvitation" ADD COLUMN     "status" "status" NOT NULL DEFAULT 'PENDING';
