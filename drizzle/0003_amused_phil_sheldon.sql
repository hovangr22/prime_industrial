CREATE TABLE `staff_admins` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(255),
	`passwordHash` varchar(255),
	`passwordSalt` varchar(255),
	`mustChangePassword` boolean NOT NULL DEFAULT true,
	`active` boolean NOT NULL DEFAULT true,
	`lastSignedIn` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `staff_admins_id` PRIMARY KEY(`id`),
	CONSTRAINT `staff_admins_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `staff_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tokenHash` varchar(255) NOT NULL,
	`staffId` int NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `staff_sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `staff_sessions_tokenHash_unique` UNIQUE(`tokenHash`)
);
