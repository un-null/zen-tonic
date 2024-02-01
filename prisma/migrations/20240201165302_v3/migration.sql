/*
  Warnings:

  - You are about to drop the column `frequency` on the `Project` table. All the data in the column will be lost.
  - Added the required column `days_of_week` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Project` DROP COLUMN `frequency`,
    ADD COLUMN `days_of_week` JSON NOT NULL;
