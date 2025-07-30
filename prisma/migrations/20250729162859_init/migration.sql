-- CreateTable
CREATE TABLE "ProgramKerja" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "tanggal" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "penanggungJawab" TEXT NOT NULL
);
