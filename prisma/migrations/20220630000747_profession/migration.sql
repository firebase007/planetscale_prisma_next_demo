/*
  Warnings:

  - You are about to drop the column `Profession` on the `User` table. All the data in the column will be lost.
  - Added the required column `profession` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `Profession`,
    ADD COLUMN `profession` VARCHAR(191) NOT NULL;
