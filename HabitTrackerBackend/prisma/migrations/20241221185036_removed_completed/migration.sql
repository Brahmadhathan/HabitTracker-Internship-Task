/*
  Warnings:

  - The values [Completed] on the enum `HabitStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "HabitStatus_new" AS ENUM ('Active', 'Inactive');
ALTER TABLE "Habit" ALTER COLUMN "status" TYPE "HabitStatus_new" USING ("status"::text::"HabitStatus_new");
ALTER TYPE "HabitStatus" RENAME TO "HabitStatus_old";
ALTER TYPE "HabitStatus_new" RENAME TO "HabitStatus";
DROP TYPE "HabitStatus_old";
COMMIT;
