-- --------------------------------------------------------
-- Host:                         localhost
-- Wersja serwera:               10.4.27-MariaDB - mariadb.org binary distribution
-- Serwer OS:                    Win64
-- HeidiSQL Wersja:              12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Zrzut struktury tabela megak_headhunter.recruiter
CREATE TABLE IF NOT EXISTS `recruiter` (
  `id` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fullName` varchar(55) NOT NULL,
  `company` varchar(55) NOT NULL,
  `maxReservedStudents` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ec6610f232573009dfecae5bdf` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Zrzucanie danych dla tabeli megak_headhunter.recruiter: ~2 rows (około)
INSERT INTO `recruiter` (`id`, `email`, `fullName`, `company`, `maxReservedStudents`) VALUES
	('cda9db29-360a-4f69-9380-e2fa5803e403', 'firma@test.pl', 'Testowa Firmowa', 'Testownia', 2),
	('e4a24cad-5591-4e0d-8ab1-dcd49d46109b', 'bedrijf@test.nl', 'Wim van Won', 'Nederlanden', 3);

-- Zrzut struktury tabela megak_headhunter.student_initial
CREATE TABLE IF NOT EXISTS `student_initial` (
  `email` varchar(255) NOT NULL,
  `courseCompletion` decimal(3,2) NOT NULL,
  `courseEngagement` decimal(3,2) NOT NULL,
  `projectDegree` decimal(3,2) NOT NULL,
  `teamProjectDegree` decimal(3,2) NOT NULL,
  `bonusProjectUrls` text NOT NULL,
  `status` enum('0','1','2') NOT NULL DEFAULT '0',
  `reservationExpirationDate` datetime DEFAULT NULL,
  `recruiterId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`email`),
  KEY `FK_adc958cfe77bcc417f7081c8f78` (`recruiterId`),
  CONSTRAINT `FK_adc958cfe77bcc417f7081c8f78` FOREIGN KEY (`recruiterId`) REFERENCES `recruiter` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Zrzucanie danych dla tabeli megak_headhunter.student_initial: ~10 rows (około)
INSERT INTO `student_initial` (`email`, `courseCompletion`, `courseEngagement`, `projectDegree`, `teamProjectDegree`, `bonusProjectUrls`, `status`, `reservationExpirationDate`, `recruiterId`) VALUES
	('aaa@test.pl', 3.50, 2.00, 5.00, 3.00, 'https://megak.pl', '1', '2024-02-15 19:51:00', 'cda9db29-360a-4f69-9380-e2fa5803e403'),
	('bbb@test.pl', 3.50, 2.00, 5.00, 3.00, 'www.bbb.pl', '1', '2024-02-15 20:45:56', 'cda9db29-360a-4f69-9380-e2fa5803e403'),
	('ccc@test.pl', 3.50, 2.00, 5.00, 3.00, 'www.ccc.com', '0', NULL, NULL),
	('ddd@test.pl', 3.50, 2.00, 5.00, 3.00, 'www.ddd.de', '0', NULL, 'cda9db29-360a-4f69-9380-e2fa5803e403'),
	('eee@test.pl', 3.50, 2.00, 5.00, 3.00, 'https://eeej.ni', '0', NULL, NULL),
	('fff@test.pl', 3.50, 2.00, 5.00, 3.00, 'www.fafafafa.fr', '0', NULL, NULL),
	('ggg@test.pl', 3.50, 2.00, 5.00, 3.00, 'www.google.com', '0', NULL, NULL),
	('hhh@test.pl', 3.50, 2.00, 5.00, 3.00, 'https://hahaha.ha', '0', NULL, NULL),
	('jjj@test.pl', 3.50, 2.00, 5.00, 3.00, 'www.jajo.po', '0', NULL, NULL),
	('kkk@test.pl', 3.50, 2.00, 5.00, 3.00, 'www.kot.it', '0', NULL, NULL);

-- Zrzut struktury tabela megak_headhunter.student_profile
CREATE TABLE IF NOT EXISTS `student_profile` (
  `id` varchar(36) NOT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `githubUsername` varchar(39) NOT NULL,
  `portfolioUrls` text DEFAULT NULL,
  `projectUrls` text NOT NULL,
  `bio` varchar(1500) NOT NULL,
  `expectedTypeWork` enum('0','1','2','3','4') NOT NULL,
  `targetWorkCity` varchar(50) NOT NULL,
  `expectedContractType` enum('0','1','2','3') NOT NULL,
  `expectedSalary` decimal(10,2) DEFAULT NULL,
  `canTakeApprenticeship` tinyint(4) NOT NULL DEFAULT 0,
  `monthsOfCommercialExp` int(3) NOT NULL DEFAULT 0,
  `education` text DEFAULT NULL,
  `workExperience` text DEFAULT NULL,
  `courses` text DEFAULT NULL,
  `initialData` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_4d8602e59163d1b629ab231898` (`initialData`),
  CONSTRAINT `FK_4d8602e59163d1b629ab2318982` FOREIGN KEY (`initialData`) REFERENCES `student_initial` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Zrzucanie danych dla tabeli megak_headhunter.student_profile: ~5 rows (około)
INSERT INTO `student_profile` (`id`, `tel`, `firstName`, `lastName`, `githubUsername`, `portfolioUrls`, `projectUrls`, `bio`, `expectedTypeWork`, `targetWorkCity`, `expectedContractType`, `expectedSalary`, `canTakeApprenticeship`, `monthsOfCommercialExp`, `education`, `workExperience`, `courses`, `initialData`) VALUES
	('2b77fb68-5c9b-4048-ad99-2548abdb71c7', NULL, 'Dariusz', 'Adamski', 'daras', '', 'www.nic.pl', '', '0', 'Poznań', '1', 0.00, 0, 0, NULL, NULL, NULL, 'ddd@test.pl'),
	('319aed8d-3f59-4c25-9712-c64902dc0945', NULL, 'Bartek', 'Baranowski', 'Baran', '', 'www.cos.com', '', '3', 'Wrocław', '3', 0.00, 0, 0, NULL, NULL, NULL, 'bbb@test.pl'),
	('67b1e841-1c6a-4059-8bda-d1844265f246', NULL, 'Alina', 'Alowa', 'Abbas', '', 'www.asd.com', '', '4', 'Wrocław', '0', 0.00, 0, 0, NULL, NULL, NULL, 'aaa@test.pl'),
	('743ebbf5-a3b9-48ec-872b-53044b55db7c', NULL, 'Edward', 'Nożyczki', 'edison', '', 'www.edi.com', '', '4', 'Warszawa', '1', 0.00, 1, 0, NULL, NULL, NULL, 'eee@test.pl'),
	('b0b714af-fd39-4d89-b8ac-044326bb19c4', NULL, 'Celka', 'Celowa', 'asda', '', 'www.asd.com', '', '0', '', '2', 0.00, 0, 0, NULL, NULL, NULL, 'ccc@test.pl');

-- Zrzut struktury tabela megak_headhunter.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `pwdHash` varchar(255) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 0,
  `activationToken` varchar(255) DEFAULT uuid(),
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `recruiterId` varchar(36) DEFAULT NULL,
  `studentEmail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  UNIQUE KEY `REL_3521c495ee1ab11586baff8e87` (`recruiterId`),
  UNIQUE KEY `REL_506fbaa27f3d0302a596044d8a` (`studentEmail`),
  CONSTRAINT `FK_3521c495ee1ab11586baff8e87a` FOREIGN KEY (`recruiterId`) REFERENCES `recruiter` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_506fbaa27f3d0302a596044d8aa` FOREIGN KEY (`studentEmail`) REFERENCES `student_initial` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Zrzucanie danych dla tabeli megak_headhunter.user: ~13 rows (około)
INSERT INTO `user` (`id`, `email`, `role`, `pwdHash`, `isActive`, `activationToken`, `createdAt`, `recruiterId`, `studentEmail`) VALUES
	('286b0d5f-1bae-41f1-a080-38c31402eb6f', 'bbb@test.pl', 2, '$2b$10$HYtpO.IMzV77UkwU8C6uxOxQ4iGVz5bKiykhiA6NJi87m165pQReK', 1, NULL, '2023-12-14 19:26:51.204599', NULL, 'bbb@test.pl'),
	('2dbef405-5bae-4f2d-b36a-3b01727d7773', 'ccc@test.pl', 2, '$2b$10$/Byl9ID07HKep.kABiNPY.dAk5HbAWVo.XnkNks.hqbYd3LH.Y1xC', 1, NULL, '2023-12-14 19:26:51.297941', NULL, 'ccc@test.pl'),
	('4a841b88-8a15-4336-9424-4ec2543dd153', 'fff@test.pl', 2, '$2b$10$V1pt03Xf/1gE39ihIUE..OpVxaJO/U8t.n10VA5uBoXq8MHsyOLGi', 1, NULL, '2023-12-14 19:26:51.577673', NULL, 'fff@test.pl'),
	('7be370f1-2bb4-4f0f-821a-8085dcc9e200', 'ggg@test.pl', 2, '$2b$10$WQPd6EOncGXaqFsVbUKLcOlmXyfg21.OE0aZ96RXwP2Dk4J.SPeVC', 1, NULL, '2023-12-14 19:26:51.669468', NULL, 'ggg@test.pl'),
	('82c847e2-c06c-44b5-b07a-ca36f485e80f', 'hhh@test.pl', 2, '$2b$10$095rbx65NO/DBTF93XpQPuLdI12vkBiP60h2m.xaN1Bms3ZJ7prl2', 0, '5b8e5bf0-9aae-11ee-9906-309c2381f43b', '2023-12-14 19:26:51.771111', NULL, 'hhh@test.pl'),
	('9c65ba0d-7475-4371-832c-ada550d9e57e', 'eee@test.pl', 2, '$2b$10$V18XRfzQwL.9LPYCEwS2RuhHxamxGFt3N3VS./Xp3wgw4380fqpJO', 1, NULL, '2023-12-14 19:26:51.485179', NULL, 'eee@test.pl'),
	('ac589b6e-cd72-432d-9771-19f62f147da8', 'aaa@test.pl', 2, '$2b$10$OhOwNFPBhSr8SCOCVc9fGuiRtL3QTNOS8UM2vOJK0N7ZYd/SjlXN2', 1, NULL, '2023-12-14 19:26:51.095325', NULL, 'aaa@test.pl'),
	('b04dd37d-5c4d-46a9-82c9-a4b3e7e11ecf', 'jjj@test.pl', 2, '$2b$10$2XRfb5FTzwRLBSH1xaEczOGWIProexjVxB1CFUEgdBp/pzefd5cs6', 0, '5b9bc9a5-9aae-11ee-9906-309c2381f43b', '2023-12-14 19:26:51.859134', NULL, 'jjj@test.pl'),
	('b3cacbb3-4ccb-4717-be1d-f736cc44f4b2', 'admin@admin.com', 1, '$2b$10$GIMoCkmx6vZY0xaGuae9reGlOFfw8FdJSkQ/MhCll2Hx3YVuVW./u', 1, NULL, '2023-12-14 19:26:12.480754', NULL, NULL),
	('c40e5682-2755-4b85-b5a4-175d55d237c5', 'firma@test.pl', 3, '$2b$10$1wPx3RgBZs5fEy33DhX5x.jSOT2vw9AnaVGRFoOBzuN11oqpueNJe', 1, NULL, '2023-12-14 19:27:26.553638', 'cda9db29-360a-4f69-9380-e2fa5803e403', NULL),
	('e6deea6c-c728-41c2-b241-b48f620432cd', 'bedrijf@test.nl', 3, '$2b$10$0kli.NjvlCXOV39O6Pf8I.lxeUvzcTmBpNWUTWQrtrrSGA/nyxhmO', 1, NULL, '2023-12-14 19:27:58.476465', 'e4a24cad-5591-4e0d-8ab1-dcd49d46109b', NULL),
	('e7573813-c96d-4534-b5b0-bcb016587a4c', 'kkk@test.pl', 2, '$2b$10$moWspFvJvULy8PHfwbA6Cezu4.q8ZJEky2m2TNXw1v/3NznPP8.d.', 0, '5ba98040-9aae-11ee-9906-309c2381f43b', '2023-12-14 19:26:51.948972', NULL, 'kkk@test.pl'),
	('f47230e8-70a8-405a-9d2e-d0a70c75ddb4', 'ddd@test.pl', 2, '$2b$10$bodvfMX8BJZq2mlQwq.cee/X0ZIEc22kB00ecAkf.5Ta3b4SiWrne', 1, NULL, '2023-12-14 19:26:51.390358', NULL, 'ddd@test.pl');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
