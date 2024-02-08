/*
  Warnings:

  - You are about to drop the column `days_of_week` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `database_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `weekDays` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Project` DROP COLUMN `days_of_week`,
    ADD COLUMN `database_id` VARCHAR(191) NULL,
    ADD COLUMN `weekDays` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `database_id`;
