-- CreateTable
CREATE TABLE "Notion_Sync" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "executed_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Notion_Sync_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Notion_Sync_user_id_idx" ON "Notion_Sync"("user_id");
