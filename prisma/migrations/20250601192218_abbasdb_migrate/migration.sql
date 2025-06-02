-- CreateEnum
CREATE TYPE "IconType" AS ENUM ('REACT_ICON', 'IMAGE_URL');

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "diberikan" TEXT NOT NULL,
    "berlaku" TEXT NOT NULL,
    "id_certificate" TEXT,
    "by" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "during" TEXT NOT NULL,
    "profession" TEXT NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "link_demo" TEXT NOT NULL,
    "link_github" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "is_show" BOOLEAN NOT NULL,
    "is_featured" BOOLEAN NOT NULL,
    "aos_delay" INTEGER NOT NULL,
    "params_slug" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechStack" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "iconType" "IconType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TechStack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectTechStack" (
    "id" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "techStackId" TEXT NOT NULL,

    CONSTRAINT "ProjectTechStack_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_slug_key" ON "Certificate"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "ProjectTechStack_projectId_idx" ON "ProjectTechStack"("projectId");

-- CreateIndex
CREATE INDEX "ProjectTechStack_techStackId_idx" ON "ProjectTechStack"("techStackId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTechStack_projectId_techStackId_key" ON "ProjectTechStack"("projectId", "techStackId");

-- AddForeignKey
ALTER TABLE "ProjectTechStack" ADD CONSTRAINT "ProjectTechStack_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTechStack" ADD CONSTRAINT "ProjectTechStack_techStackId_fkey" FOREIGN KEY ("techStackId") REFERENCES "TechStack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
