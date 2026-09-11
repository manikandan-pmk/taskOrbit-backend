/*
  Warnings:

  - Added the required column `Role` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WorkspaceRole" AS ENUM ('PERSONAL', 'ORGANIZATION');

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "Role" "WorkspaceRole" NOT NULL;
