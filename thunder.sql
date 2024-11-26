-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (x86_64)
--
-- Host: localhost    Database: thunder
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  `price` int NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (10,'맥북 프로 m4','깨끗하게 사용해서 새상품 같습니다! 가격 안 깎아드립니다^^','전자제품','2024-11-25 22:49:27',3980500,'/uploads/1732542567371-2021011901887_1.jpg'),(11,'검정색 책가방','판다 키링도 함께 드립니다.','생활용품','2024-11-25 22:52:09',15000,'/uploads/1732542729380-400x400.jpeg'),(12,'버즈 프로 3','좀 썼지만 급전이 필요해서 팝니다.. ','전자제품','2024-11-25 22:53:51',231875,'/uploads/1732542831447-9aa2fe8acc85ecb52bba4e2f91ad2fb1.jpg'),(13,'2단 독서대','좋아요','생활용품','2024-11-25 22:56:46',12500,'/uploads/1732543006351-1a9e4cbbce14d7c3690dc7dd54674512.jpg'),(14,'낮잠인형','침 안흘렸어요ㅜㅜ','생활용품','2024-11-25 22:58:06',4300,'/uploads/1732543086810-A005353636_01.jpg'),(15,'아이패드 에어 5세대','저는 더 좋은 거 샀어요','전자제품','2024-11-25 22:58:49',849000,'/uploads/1732543129850-1667290461000_áá¢áá³á¯ááµáº_áá¢áá³á¯.png');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-25 23:43:31
