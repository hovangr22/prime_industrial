CREATE TABLE `site_content` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contentKey` varchar(191) NOT NULL,
	`groupName` varchar(64) NOT NULL,
	`label` varchar(191) NOT NULL,
	`valueEn` text,
	`valueEl` text,
	`multiline` boolean NOT NULL DEFAULT false,
	`sortOrder` int NOT NULL DEFAULT 0,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_content_id` PRIMARY KEY(`id`),
	CONSTRAINT `site_content_contentKey_unique` UNIQUE(`contentKey`)
);
