/*
  Warnings:

  - The primary key for the `todo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `int` on the `todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "todo" DROP CONSTRAINT "todo_pkey",
DROP COLUMN "int",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "todo_pkey" PRIMARY KEY ("id");
