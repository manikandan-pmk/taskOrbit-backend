-- CreateTable
CREATE TABLE "Workspace" (
    "id" SERIAL NOT NULL,
    "org_Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "user_Id" TEXT NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("org_Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_org_Id_key" ON "Workspace"("org_Id");

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
