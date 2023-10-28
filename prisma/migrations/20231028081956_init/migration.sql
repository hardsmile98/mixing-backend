-- CreateTable
CREATE TABLE `RecipientAddresses` (
    `uuid` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `delay` INTEGER NOT NULL,
    `percent` INTEGER NOT NULL,
    `orderUuid` VARCHAR(191) NULL,
    `isSent` BOOLEAN NOT NULL DEFAULT false,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `uuid` VARCHAR(191) NOT NULL,
    `transferAddress` VARCHAR(191) NOT NULL,
    `feePercent` INTEGER NOT NULL,
    `mixCode` VARCHAR(191) NOT NULL,
    `isDone` BOOLEAN NOT NULL DEFAULT false,
    `currency` ENUM('BTC') NOT NULL DEFAULT 'BTC',
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RecipientAddresses` ADD CONSTRAINT `RecipientAddresses_orderUuid_fkey` FOREIGN KEY (`orderUuid`) REFERENCES `Order`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
