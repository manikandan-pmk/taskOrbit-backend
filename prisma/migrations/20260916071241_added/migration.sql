-- CreateEnum
CREATE TYPE "Role" AS ENUM ('VIEWER', 'ADMIN', 'MEMBER');

-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_user_Id_fkey";

-- CreateTable
CREATE TABLE "WorkSpaceMembers" (
    "id" SERIAL NOT NULL,
    "membership_Id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workspaceId" TEXT NOT NULL,
    "user_Id" TEXT NOT NULL,

    CONSTRAINT "WorkSpaceMembers_pkey" PRIMARY KEY ("membership_Id")
);

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkSpaceMembers" ADD CONSTRAINT "WorkSpaceMembers_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("org_Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkSpaceMembers" ADD CONSTRAINT "WorkSpaceMembers_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
