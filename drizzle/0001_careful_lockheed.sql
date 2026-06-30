CREATE TABLE `applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titleEn` varchar(255) NOT NULL,
	`titleEl` varchar(255) NOT NULL,
	`summaryEn` varchar(512),
	`summaryEl` varchar(512),
	`descriptionEn` text,
	`descriptionEl` text,
	`imageUrl` text,
	`imageKey` varchar(512),
	`sortOrder` int NOT NULL DEFAULT 0,
	`published` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `inquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`company` varchar(255),
	`email` varchar(320) NOT NULL,
	`phone` varchar(64),
	`message` text NOT NULL,
	`sector` varchar(32) NOT NULL DEFAULT 'general',
	`handled` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `inquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` varchar(64) NOT NULL,
	`code` varchar(128) NOT NULL,
	`nameEn` varchar(255) NOT NULL,
	`nameEl` varchar(255) NOT NULL,
	`descriptionEn` text,
	`descriptionEl` text,
	`imageUrl` text,
	`imageKey` varchar(512),
	`sortOrder` int NOT NULL DEFAULT 0,
	`published` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
