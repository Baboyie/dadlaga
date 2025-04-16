-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "title" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "guest" INTEGER NOT NULL,
    "bed" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Items" (
    "id" SERIAL NOT NULL,
    "tv" BOOLEAN NOT NULL,
    "phone" BOOLEAN NOT NULL,
    "minibar" BOOLEAN NOT NULL,
    "fridge" BOOLEAN NOT NULL,
    "shower" BOOLEAN NOT NULL,
    "microwave" BOOLEAN NOT NULL,
    "hairdryer" BOOLEAN NOT NULL,
    "wifi" BOOLEAN NOT NULL,
    "service" BOOLEAN NOT NULL,
    "tools" BOOLEAN NOT NULL,
    "tea" BOOLEAN NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
