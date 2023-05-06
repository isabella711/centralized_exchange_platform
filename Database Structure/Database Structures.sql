CREATE DATABASE  IF NOT EXISTS `joehocom_21010627g` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `joehocom_21010627g`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 185.27.133.16    Database: joehocom_21010627g
-- ------------------------------------------------------
-- Server version	5.7.41-cll-lve

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Fiat`
--

DROP TABLE IF EXISTS `Fiat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Fiat` (
  `fiat_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `order_date` datetime NOT NULL,
  `status` varchar(5) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  PRIMARY KEY (`fiat_id`),
  KEY `user_id_idx` (`customer_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Transactions`
--

DROP TABLE IF EXISTS `Transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Transactions` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `transactioner_id_A` varchar(255) NOT NULL,
  `transaction_date` datetime NOT NULL,
  `status` varchar(5) DEFAULT NULL,
  `transactioner_id_B` varchar(255) NOT NULL,
  `transactioner_A_currency_type` varchar(255) NOT NULL,
  `transactioner_A_currency_amount` double NOT NULL,
  `transactioner_B_currency_type` varchar(255) NOT NULL,
  `transactioner_B_currency_amount` double NOT NULL,
  `tx_id` varchar(255) DEFAULT NULL,
  `tx_id2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `users_id_idx` (`transactioner_id_A`)
) ENGINE=MyISAM AUTO_INCREMENT=100 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL DEFAULT '',
  `user_wallet_id` varchar(255) DEFAULT NULL,
  `user_balance` double NOT NULL DEFAULT '0' COMMENT 'Fiat Currency',
  `personal_info` text,
  `user_icon` varchar(255) DEFAULT NULL,
  `user_create_date` datetime NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `session` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_address_UNIQUE` (`email_address`)
) ENGINE=MyISAM AUTO_INCREMENT=80 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Wallets`
--

DROP TABLE IF EXISTS `Wallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Wallets` (
  `wallet_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `currency_type` varchar(255) NOT NULL,
  `wallet_create_date` datetime NOT NULL,
  `wallet_address` varchar(255) NOT NULL,
  `wallet_private_key` varchar(255) NOT NULL,
  `classicAddress` varchar(255) DEFAULT NULL,
  `seed` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`wallet_id`),
  KEY `user_id_idx` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=141 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'joehocom_21010627g'
--

--
-- Dumping routines for database 'joehocom_21010627g'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-06 18:14:26
