-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.36 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for category_location
CREATE DATABASE IF NOT EXISTS `category_location` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `category_location`;

-- Dumping structure for table category_location.account
CREATE TABLE IF NOT EXISTS `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table category_location.account: ~5 rows (approximately)
INSERT INTO `account` (`id`, `username`, `password`, `avatar`) VALUES
	(1, 'maiqtruong2403', '12345678', 'ava1.png'),
	(2, 'john_doe', 'password123', 'ava2.png'),
	(3, 'jane_smith', 'securepassword', 'ava3.png');

-- Dumping structure for table category_location.category
CREATE TABLE IF NOT EXISTS `category` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table category_location.category: ~8 rows (approximately)
INSERT INTO `category` (`id`, `name`, `image`) VALUES
	(1, 'Resort', 'https://i.imgur.com/05e4V86.png'),
	(2, 'Homestay', 'https://i.imgur.com/Hj5mgBm.png'),
	(3, 'Hotel', 'https://i.imgur.com/bueMwgq.png'),
	(4, 'Lodge', 'https://i.imgur.com/qhkysxR.png'),
	(5, 'Villa', 'https://i.imgur.com/EEWX6UL.png'),
	(6, 'Apartment', 'https://i.imgur.com/rD3zVKG.png'),
	(7, 'Hostel', 'https://i.imgur.com/goK3GYX.png'),
	(8, 'See all', 'https://i.imgur.com/6wLDcNr.png');

-- Dumping structure for table category_location.location
CREATE TABLE IF NOT EXISTS `location` (
  `id` int NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table category_location.location: ~6 rows (approximately)
INSERT INTO `location` (`id`, `image`) VALUES
	(1, 'https://i.imgur.com/riEaO08.png'),
	(2, 'https://i.imgur.com/cai3XhU.png'),
	(3, 'https://i.imgur.com/oMSH0dg.png'),
	(4, 'https://i.imgur.com/4WW563e.png'),
	(5, 'https://i.imgur.com/Ze8iOUf.png'),
	(6, 'https://i.imgur.com/Ze8iOUf.png');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
