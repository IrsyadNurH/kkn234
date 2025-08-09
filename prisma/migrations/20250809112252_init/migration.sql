-- CreateTable
CREATE TABLE "public"."ProgramKerja" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "penanggungJawab" TEXT NOT NULL,

    CONSTRAINT "ProgramKerja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Dokumentasi" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "siklus" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "programKerjaId" INTEGER,

    CONSTRAINT "Dokumentasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Artikel" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "tanggalTerbit" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artikel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Dokumentasi" ADD CONSTRAINT "Dokumentasi_programKerjaId_fkey" FOREIGN KEY ("programKerjaId") REFERENCES "public"."ProgramKerja"("id") ON DELETE SET NULL ON UPDATE CASCADE;
