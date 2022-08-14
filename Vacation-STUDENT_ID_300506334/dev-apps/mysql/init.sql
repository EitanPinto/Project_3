CREATE DATABASE  IF NOT EXISTS `project_3_schema` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `project_3_schema`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: project_3_schema
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(45) NOT NULL DEFAULT 'user',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'john','doe','johndoe1234','dfdf','admin','2022-06-22 16:30:02'),(2,'benny','shlomo','bshlomo5554','ssvv','user','2022-06-22 16:30:57'),(3,'denis','rodman','drodman444','1212x','user','2022-06-22 16:31:54'),(4,'roi','bobo','bobo567','bobo','user','2022-06-22 16:39:51'),(5,'denis ','rodman','drodman444','vv77','user','2022-04-23 11:18:25'),(6,'denis','rodman','drodman444','ddgg','user','2022-05-19 11:19:06'),(7,'roi','roi','roi3921','bbbbd','user','2022-06-24 13:20:20'),(8,'gra','graf','graf555','1212xXGsdfdsfsdfdsfsdFF','user','2022-06-24 14:01:36'),(9,'grani','fofo','toto0332','1212xXGsdfdssdFF','user','2022-06-24 14:06:08'),(10,'vovo','bpbp','gogo0332','1212xXGsdfdssdFF','user','2022-06-24 14:07:23'),(11,'roi','valala','valalatoro4080','bbbbd','user','2022-06-24 17:06:45'),(12,'goro','gorposh','tytyoplop','gogogohhEEs334','user','2022-06-24 17:10:26'),(13,'sddasasd','sfdsdfasdas','gopeksll21321DPOP','vvvyYYx67v','user','2022-06-24 17:14:31'),(14,'sddasasd','asndbasjbdsaj','OPOAKnjsahdjs','Ff21837sakdjl','user','2022-06-24 17:15:53'),(15,'WEREWREW','wefr','TpSDKAHDJKSAJNDAS','JKHDKJ32SAHJKuqwoe','user','2022-06-24 17:38:43'),(16,'tomi','dasdjl','SUHDAKsddbfkjs324','aksdjkasYUI32','user','2022-06-24 17:40:41'),(17,'allan','fdfdgd','jkahsdYTU324','ksjhfcYUTksdj2389473298kkjn','user','2022-06-24 17:44:37'),(18,'allan','hardy','dgdsUEWIA34','ksjhfcYdsfsdUTksdj2389473298kkjn','user','2022-06-24 18:06:23'),(19,'roni','asdsadsa','dsjfhUIYWRWE324','JKASHDKJASHtuytsadnm66d','user','2022-06-24 18:23:57'),(22,'dogsi','pelex','dogadoga123','JKASHDKJASHtuytsadnm66d','user','2022-07-06 16:42:20'),(23,'gomi','kljo','jlkj798','JKASHDKJASHtuytsasadnm66d','user','2022-07-06 17:02:46'),(24,'dsfsdfsdfds','sdfdsfsdfsdfsd','fsdfdsfsdfsdfsd','ffffffff7E','user','2022-08-01 01:58:37'),(25,'dsfsdfsdfds','sdfdsfsdfsdfsd','fsdfdsfskkkkkkkkkkk','ffffffff7E','user','2022-08-01 01:59:11'),(26,'dsfsdfsdfds','sdfdsfsdfsdfsd','fsdfdsfsktttttttttttttt','ffffffff7E','user','2022-08-01 02:00:28'),(27,'dlssssssssssssssssss','dssssssssssss','ddddddddd','ggggg7E','user','2022-08-01 02:11:07'),(28,'ffffffffffffffff','dddddddddddddd','ffffffffffffff','fffff7E','user','2022-08-01 02:13:28'),(29,'dsssss','ddddddddddddd','ddddddd','ggggg6E','user','2022-08-01 02:18:14'),(30,'ggggggggggg','uuuuuuuuuuuuuuuu','uuuuuuuuu','uuuu6E','user','2022-08-01 02:29:51'),(31,'ggggggggggg','uuuuuuuuuuuuuuuu','uuuuuggg','uuuu6E','user','2022-08-01 02:31:58'),(32,'ffffffffff','fffffffffffffff','fffffffff','gggg5E','user','2022-08-01 02:34:13'),(33,'ssssssssssss','kljosssssssss','jlkj798ddddddd','dddd5E','user','2022-08-01 02:59:10'),(34,'sssss','dddd','dddddddsssa','ddddT6','user','2022-08-01 03:01:24'),(35,'dddd','sssssssss','aaaaaaaa','aaaaK8','user','2022-08-01 03:03:35'),(36,'gomi','ssss','dddddddddd','ddddS3','user','2022-08-01 03:04:12'),(37,'fffffffffffff','hhhhhhhhhh','fffffffffffffff','cccc4V','user','2022-08-01 14:48:41'),(38,'yyyyyyyyy','kljoyyyyyy','jlkj798yyy','cccc4E','user','2022-08-01 14:58:28'),(39,'ggggg','kljoddd','jlkj798ffffff','cccc4E','user','2022-08-01 15:01:16'),(40,'xzcxz','cxzxz','xzczx','cccc4E','user','2022-08-01 15:03:58'),(41,'sssss','ssssss','ssssssss','ssss4E','user','2022-08-01 15:05:08'),(42,'sadsf','asdfs','dsfsdfds','ssss4E','user','2022-08-01 15:05:43'),(43,'sdfdsf','sdfsd','sdfsd','ssss4E','user','2022-08-01 15:07:12'),(44,'ddd','dddddd','ddddd','dddd4E','user','2022-08-01 15:14:10'),(45,'ffffff','fffffff','ffffffffff','ffff4E','user','2022-08-01 15:16:49'),(46,'ddsss','ssss','xzcxfd','ffff4E','user','2022-08-01 15:21:52'),(47,'dddddddd','dddddddd','dddddddsaas','dddd4E','user','2022-08-01 15:25:05'),(48,'dsdsdfds','sdfsdfsdsdfsd','sdfsdfds','ccccV4','user','2022-08-01 15:37:49'),(49,'dddddddd','dddddd','ddddddddddss','ssss4E','user','2022-08-01 15:42:29'),(50,'dsfsdfdssdf','sdfsdfsd','sdfsdfsd','cccc4V','user','2022-08-03 01:11:07'),(51,'sdfdsfsd','sdfsdfsdfsd','sdfsdfdssdfds','vvvv4E','user','2022-08-05 11:12:53'),(52,'dsfsdfsdfsd','sdfsdfsdfsd','dsfsdfsddd','vvvvB4','user','2022-08-08 19:32:15'),(66,'testfirstname','lastnametest','gogodo','vvvv4E','user','2022-08-14 13:52:56');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(200) DEFAULT NULL,
  `destination` varchar(45) NOT NULL,
  `image` varchar(10000) DEFAULT NULL,
  `start_date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `price_usd` int NOT NULL DEFAULT '150',
  `number_of_followers` int NOT NULL DEFAULT '0',
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(45) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'bla bla','zanzibar','/zanzibar.jpg','2022-06-22 14:39:54','2022-06-22 14:39:54',900,1,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(2,'blaaa','rome','/rome.jpg','2022-06-22 15:28:16','2022-06-22 15:28:16',200,0,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(3,'blaaa','miami','/miami.jpg','2022-06-22 16:13:16','2022-06-22 16:13:16',300,0,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(4,'blaaa','san francisco','/san-francisco.jpg','2022-06-22 16:22:14','2022-06-22 16:22:14',250,0,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(5,'blaaa','paris','/paris.jpg','2022-06-22 16:23:27','2022-06-22 16:23:27',500,0,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(6,'blaaaa','london','/london.jpg','2022-06-22 16:24:08','2022-06-22 16:24:08',400,2,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(7,'blaaa','barcelona','/barcelona.png','2022-06-22 16:24:49','2022-06-22 16:24:49',380,2,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(8,'blaaaa','dubai','/dubai.jpg','2022-06-22 16:25:42','2022-06-22 16:25:42',270,1,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(9,'blaaa','hawaii','/hawaii.jpg','2022-06-22 16:26:26','2022-06-22 16:26:26',850,0,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(10,'blaa','maldives','/maldives.jpg','2022-06-22 16:27:09','2022-06-22 16:27:09',600,0,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(11,'blaa','prague','/prague.jpg','2022-07-07 18:58:18','2022-07-09 18:58:18',300,0,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(12,'bla','lisbon','/lisbon.jpg','2022-07-10 19:46:59','2022-07-13 19:46:59',270,0,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(13,'bla','ibiza','/ibiza.jpg','2022-08-11 13:01:56','2022-08-11 13:01:56',455,1,'2022-08-11 16:02:40','johndoe1234','2022-07-18 14:31:08','johndoe1234'),(14,'bla','madrid','/madrid.jpg','2022-09-07 19:56:28','2022-09-15 19:56:28',400,0,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(15,'bla','budapest','/budapest.jpg','2022-11-07 19:56:28','2022-11-15 19:56:28',300,6,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(16,'bla','bucharest','/bucharest.jpg','2023-07-07 19:56:28','2023-07-13 19:56:28',240,1,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(17,'bla','vienna','/vienna.jpg','2022-08-06 19:56:28','2022-08-09 19:56:28',400,0,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(18,'bla','tbilisi','/tbilisi.jpg','2023-01-07 19:56:28','2023-01-09 19:56:28',190,1,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(19,'bla','rio de janeiro','/rio de janeiro.jpg','2022-07-22 19:56:28','2022-07-25 19:56:28',550,0,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(20,'bla','mexico city','/mexico city.jpg','2022-08-07 13:00:00','2022-08-10 14:00:00',4600,2,'2022-08-11 19:24:34','johndoe1234','2022-07-18 14:31:08','johndoe1234'),(21,'bla','tokyo','/tokyo.jpg','2022-09-05 19:56:28','2022-09-08 19:56:28',600,2,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(60,'about seoul','seoul','/seoul.jpg','2022-07-09 16:38:58','2022-07-09 16:38:58',150,0,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(61,'about tel aviv','tel aviv','/tel-aviv.jpg','2022-07-09 16:38:58','2022-07-09 16:38:58',150,0,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(62,'about sydney','sydney','/sydney.jpg','2022-06-22 16:25:42','2022-06-22 16:25:42',0,0,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(63,'','bla','https://cdn.wallpapersafari.com/94/79/s7am0F.jpg','2022-06-22 16:25:42','2022-06-22 16:25:42',150,0,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(64,'','bla','https://cdn.wallpapersafari.com/94/79/s7am0F.jpg','2022-06-22 16:25:42','2022-06-22 16:25:42',150,0,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(65,'s','bla','https://cdn.wallpapersafari.com/94/79/s7am0F.jpg','2022-06-22 16:25:42','2022-06-22 16:25:42',56,0,'2022-07-18 15:16:58','johndoe1234','2022-07-18 14:31:08','johndoe1234'),(66,'','bla','https://cdn.wallpapersafari.com/94/79/s7am0F.jpg','2022-06-22 16:25:42','2022-06-22 16:25:42',150,0,NULL,NULL,'2022-07-18 14:31:08','johndoe1234'),(67,'','newVacTest','https://cdn.wallpapersafari.com/94/79/s7am0F.jpg','2022-08-14 10:59:44','2022-08-14 10:59:44',150,0,'2022-08-14 14:00:59','johndoe1234','2022-07-18 14:31:08','johndoe1234'),(75,'','dolomits','https://wallpaperaccess.com/full/1586840.jpg','2022-07-18 14:31:08','2022-07-18 14:31:08',5,0,NULL,NULL,'2022-07-18 14:53:40','johndoe1234'),(78,'','dolomits','https://wallpaperaccess.com/full/1586840.jpg','2022-07-18 14:31:08','2022-07-18 14:31:08',5,0,NULL,NULL,'2022-07-18 14:59:51','johndoe1234'),(79,'s','dolomits','https://wallpaperaccess.com/full/1586840.jpg','2022-07-18 14:31:08','2022-07-18 14:31:08',6000,1,'2022-07-19 00:35:55','johndoe1234','2022-07-18 15:15:32','johndoe1234'),(80,'','dolomits','https://wallpaperaccess.com/full/1586840.jpg','2022-07-18 14:31:08','2022-07-18 14:31:08',5,0,NULL,NULL,'2022-07-18 15:16:16','johndoe1234'),(82,'','dolomits','https://wallpaperaccess.com/full/1586840.jpg','2022-07-18 14:31:08','2022-07-18 14:31:08',5,0,NULL,NULL,'2022-08-10 15:27:09','johndoe1234'),(84,'xxx','czx','https://cdn.wallpapersafari.com/94/79/s7am0F.jpg','2022-08-13 17:12:49','2022-08-13 17:12:49',3800,0,'2022-08-13 20:13:08','johndoe1234','2022-08-10 17:18:19','johndoe1234'),(85,'blablalalalalalalalal','czxnew','https://wallpaperaccess.com/full/1586840.jpg','2022-08-13 20:00:23','2022-08-13 20:00:23',6000,0,'2022-08-13 23:00:37','johndoe1234','2022-08-10 17:24:12','johndoe1234'),(88,'sdfsdfsd','dsfsdfsd','https://c4.wallpaperflare.com/wallpaper/107/673/165/dolomites-ital%D1%83-tre-cime-di-lavaredo-sunset-landscape-photography-desktop-hd-wallpaper-for-pc-tablet-and-mobile-3840%C3%972400-wallpaper-preview.jpg','2022-08-13 17:15:08','2022-08-13 17:15:08',5000,0,'2022-08-13 20:15:16','johndoe1234','2022-08-11 12:46:51','johndoe1234');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations_followers`
--

DROP TABLE IF EXISTS `vacations_followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations_followers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `vacation_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `vacation_id_idx` (`vacation_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `vacation_id` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations_followers`
--

LOCK TABLES `vacations_followers` WRITE;
/*!40000 ALTER TABLE `vacations_followers` DISABLE KEYS */;
INSERT INTO `vacations_followers` VALUES (5,4,1),(47,3,6),(49,3,7),(51,7,7),(52,7,8),(60,16,20),(61,16,15),(62,16,15),(63,16,15),(64,16,15),(65,16,15),(66,16,20),(67,16,21),(82,4,18),(88,2,79),(98,2,6),(103,4,21),(104,2,15),(105,2,16),(106,2,13);
/*!40000 ALTER TABLE `vacations_followers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-14 15:51:57
