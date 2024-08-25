/*
  Warnings:

  - You are about to drop the `UserShoppingList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserShoppingList" DROP CONSTRAINT "UserShoppingList_shoppingListId_fkey";

-- DropForeignKey
ALTER TABLE "UserShoppingList" DROP CONSTRAINT "UserShoppingList_userId_fkey";

-- DropTable
DROP TABLE "UserShoppingList";

-- CreateTable
CREATE TABLE "UserShoppingListLink" (
    "userId" TEXT NOT NULL,
    "shoppingListId" TEXT NOT NULL,

    CONSTRAINT "UserShoppingListLink_pkey" PRIMARY KEY ("userId","shoppingListId")
);

-- AddForeignKey
ALTER TABLE "UserShoppingListLink" ADD CONSTRAINT "UserShoppingListLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserShoppingListLink" ADD CONSTRAINT "UserShoppingListLink_shoppingListId_fkey" FOREIGN KEY ("shoppingListId") REFERENCES "ShoppingList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
