CREATE SCHEMA IF NOT EXISTS "public";

CREATE TABLE "Url" (
    "id" BIGSERIAL NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortCode" VARCHAR(16) NOT NULL,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Url_shortCode_key" ON "Url"("shortCode");
CREATE INDEX "Url_createdAt_idx" ON "Url"("createdAt");
