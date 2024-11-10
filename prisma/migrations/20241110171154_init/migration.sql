-- CreateTable
CREATE TABLE "BlogPost" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "imageUrl" VARCHAR(255),

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);
