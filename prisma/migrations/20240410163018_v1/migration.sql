-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT,
    "image" TEXT
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "total_date" INTEGER NOT NULL,
    "week_days" TEXT NOT NULL,
    "if_then" TEXT,
    "database_id" TEXT,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "user_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Post_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    CONSTRAINT "Like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Like_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Follow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "follower_id" TEXT NOT NULL,
    "followee_id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    CONSTRAINT "Follow_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Follow_followee_id_fkey" FOREIGN KEY ("followee_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Project_user_id_idx" ON "Project"("user_id");

-- CreateIndex
CREATE INDEX "Post_user_id_idx" ON "Post"("user_id");

-- CreateIndex
CREATE INDEX "Post_project_id_idx" ON "Post"("project_id");

-- CreateIndex
CREATE INDEX "Like_user_id_idx" ON "Like"("user_id");

-- CreateIndex
CREATE INDEX "Like_post_id_idx" ON "Like"("post_id");

-- CreateIndex
CREATE INDEX "Follow_follower_id_idx" ON "Follow"("follower_id");

-- CreateIndex
CREATE INDEX "Follow_followee_id_idx" ON "Follow"("followee_id");
