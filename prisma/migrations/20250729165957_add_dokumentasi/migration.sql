-- CreateTable
CREATE TABLE "Dokumentasi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageUrl" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "programKerjaId" INTEGER,
    CONSTRAINT "Dokumentasi_programKerjaId_fkey" FOREIGN KEY ("programKerjaId") REFERENCES "ProgramKerja" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
