-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: trippee
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1

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
-- Table structure for table `expense`
--

DROP TABLE IF EXISTS `expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expense` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tripid` int(11) NOT NULL,
  `description` varchar(300) NOT NULL,
  `amount` double NOT NULL,
  `added_by` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense`
--

LOCK TABLES `expense` WRITE;
/*!40000 ALTER TABLE `expense` DISABLE KEYS */;
/*!40000 ALTER TABLE `expense` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iata_codes`
--

DROP TABLE IF EXISTS `iata_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iata_codes` (
  `city` varchar(200) NOT NULL,
  `code` char(3) NOT NULL,
  `worldareacode` varchar(5) NOT NULL,
  `country` varchar(15) NOT NULL,
  `airportname` varchar(60) NOT NULL,
  `gmt` varchar(10) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iata_codes`
--

LOCK TABLES `iata_codes` WRITE;
/*!40000 ALTER TABLE `iata_codes` DISABLE KEYS */;
INSERT INTO `iata_codes` VALUES ('Agra','AGR','733','India','Kheria','+5.5'),('Agatti Island','AGX','733','India','Agatti Island','+5.5'),('Aizawl','AJL','733','India','Aizawl','+5.5'),('Akola','AKD','733','India','Akola','+5.5'),('Ahmedabad','AMD','733','India','Ahmedabad','+5.5'),('Amritsar','ATQ','733','India','Raja Sansi','+5.5'),('Bhubaneswar','BBI','733','India','Bhubaneswar','+5.5'),('Vadodara','BDQ','265','India','Vadodara','+5.5'),('Bareli','BEK','733','India','Bareli','+5.5'),('Bellary','BEP','733','India','Bellary','+5.5'),('Bhuj','BHJ','733','India','Rudra Mata','+5.5'),('Bhopal','BHO','733','India','Bhopal','+5.5'),('Bhavnagar','BHU','733','India','Bhavnagar','+5.5'),('Bikaner','BKB','733','India','Bikaner','+5.5'),('Bangalore','BLR','733','India','Bangalore International Airport','+5.5'),('Mumbai','BOM','733','India','Chhatrapati Shivaji International','+5.5'),('Bhatinda','BUP','733','India','Bhatinda','+5.5'),('Car Nicobar','CBD','733','India','Car Nicobar','+5.5'),('Calicut','CCJ','733','India','Kozhikode Airport','+5.5'),('Kolkata','CCU','733','India','Netaji Subhas Chandra','+5.5'),('Cuddapah','CDP','733','India','Cuddapah','+5.5'),('Coimbatore','CJB','733','India','Peelamedu','+5.5'),('Cooch Behar','COH','733','India','Cooch Behar','+5.5'),('Kochi','COK','733','India','Cochin International','+5.5'),('Daparizo','DAE','733','India','Daparizo','+5.5'),('Darjeeling','DAI','733','India','Darjeeling','+5.5'),('Dhanbad','DBD','733','India','Dhanbad','+5.5'),('Dehra Dun','DED','733','India','Dehra Dun','+5.5'),('New Delhi','DEL','733','India','Indira Gandhi Intl','+5.5'),('Deparizo','DEP','733','India','Deparizo','+5.5'),('Dharamshala','DHM','733','India','Gaggal Airport','+5.5'),('Dibrugarh','DIB','733','India','Dibrugarh','+5.5'),('Diu','DIU','733','India','Diu','+5.5'),('Dimapur','DMU','733','India','Dimapur','+5.5'),('Guwahati','GAU','733','India','Borjhar','+5.5'),('Gaya','GAY','733','India','Gaya','+5.5'),('Goa','GOI','733','India','Dabolim','+5.5'),('Gorakhpur','GOP','733','India','Gorakhpur','+5.5'),('Guna','GUX','733','India','Guna','+5.5'),('Gwalior','GWL','733','India','Gwalior','+5.5'),('Hubli','HBX','733','India','Hubli','+5.5'),('Khajuraho','HJR','733','India','Khajuraho','+5.5'),('Hissar','HSS','733','India','Hissar','+5.5'),('Hyderabad','HYD','733','India','Hyderabad Airport','+5.5'),('Indore','IDR','733','India','Devi Ahilyabai Holkar','+5.5'),('Imphal','IMF','733','India','Municipal','+5.5'),('Nasik','ISK','733','India','Gandhinagar Arpt','+5.5'),('Agartala','IXA','733','India','Singerbhil','+5.5'),('Siliguri','IXB','733','India','Bagdogra','+5.5'),('Chandigarh','IXC','733','India','Chandigarh','+5.5'),('Allahabad','IXD','733','India','Bamrauli','+5.5'),('Mangalore','IXE','733','India','Bajpe','+5.5'),('Belgaum','IXG','733','India','Sambre','+5.5'),('Kailashahar','IXH','733','India','Kailashahar','+5.5'),('Lilabari','IXI','733','India','Lilabari','+5.5'),('Jammu','IXJ','733','India','Satwari','+5.5'),('Keshod','IXK','733','India','Keshod','+5.5'),('Leh','IXL','733','India','Bakula Rimpoche','+5.5'),('Madurai','IXM','733','India','Madurai','+5.5'),('Khowai','IXN','733','India','Khowai','+5.5'),('Pathankot','IXP','733','India','Pathankot','+5.5'),('Kamalpur','IXQ','733','India','Kamalpur','+5.5'),('Ranchi','IXR','733','India','Birsa Munda International','+5.5'),('Silchar','IXS','733','India','Kumbhirgram','+5.5'),('Pasighat','IXT','733','India','Pasighat','+5.5'),('Aurangabad','IXU','733','India','Chikkalthana','+5.5'),('Along','IXV','733','India','Along','+5.5'),('Jamshedpur','IXW','733','India','Sonari','+5.5'),('Kandla','IXY','733','India','Kandla','+5.5'),('Port Blair','IXZ','733','India','Port Blair','+5.5'),('Jaipur','JAI','733','India','Sanganeer','+5.5'),('Jodhpur','JDH','733','India','Jodhpur','+5.5'),('Jamnagar','JGA','733','India','Govardhanpur','+5.5'),('Jagdalpur','JGB','733','India','Jagdalpur','+5.5'),('Jabalpur','JLR','733','India','Jabalpur','+5.5'),('Jorhat','JRH','733','India','Rowriah','+5.5'),('Jaisalmer','JSA','733','India','Jaisalmer','+5.5'),('Kolhapur','KLH','733','India','Kolhapur','+5.5'),('Kanpur','KNU','733','India','Kanpur','+5.5'),('Kota','KTU','733','India','Kota','+5.5'),('Bhuntar Kullu.','KUU','733','India','Kullu Manali','+5.5'),('Malda','LDA','733','India','Malda','+5.5'),('Lucknow','LKO','733','India','Amausi','+5.5'),('Latur','LTU','733','India','Latur','+5.5'),('Ludhiana','LUH','733','India','Amritsar','+5.5'),('Chennai','MAA','733','India','Madras International (Meenambakkam)','+5.5'),('Dibrugarh','MOH','733','India','Mohanbari','+5.5'),('Mysore','MYQ','733','India','Mysore','+5.5'),('Muzaffarnagar','MZA','733','India','Muzaffarnagar','+5.5'),('Muzaffarpur','MZU','733','India','Muzaffarpur','+5.5'),('Nagpur','NAG','733','India','Sonegaon','+5.5'),('Nanded','NDC','733','India','Nanded','+5.5'),('Daman','NMB','733','India','Daman','+5.5'),('Neyveli','NVY','733','India','Neyveli','+5.5'),('Osmanabad','OMN','733','India','Osmanabad','+5.5'),('Bilaspur','PAB','733','India','Bilaspur','+5.5'),('Patna','PAT','733','India','Patna','+5.5'),('Porbandar','PBD','733','India','Porbandar','+5.5'),('Pantnagar','PGH','733','India','Pantnagar','+5.5'),('Pune','PNQ','733','India','Lohegaon','+5.5'),('Pondicherry','PNY','733','India','Pondicherry','+5.5'),('Puttaparthi','PUT','733','India','Puttaprathe','+5.5'),('Jeypore','PYB','733','India','Jeypore','+5.5'),('Rajkot','RAJ','733','India','Civil','+5.5'),('Rewa','REW','733','India','Rewa','+5.5'),('Balurghat','RGH','733','India','Balurghat','+5.5'),('Rajahmundry','RJA','733','India','Rajahmundry','+5.5'),('Rajouri','RJI','733','India','Rajouri','+5.5'),('Ramagundam','RMD','733','India','Ramagundam','+5.5'),('Raipur','RPR','733','India','Raipur','+5.5'),('Rourkela','RRK','733','India','Rourkela','+5.5'),('Ratnagiri','RTC','733','India','Ratnagiri','+5.5'),('Rupsi','RUP','733','India','Rupsi','+5.5'),('Shillong','SHL','733','India','Barapani','+5.5'),('Simla','SLV','733','India','Simla','+5.5'),('Sholapur','SSE','733','India','Sholapur','+5.5'),('Surat','STV','733','India','Surat','+5.5'),('Srinagar','SXR','733','India','Srinagar','+5.5'),('Salem','SXV','733','India','Salem','+5.5'),('Tuticorin','TCR','733','India','Tuticorin','+5.5'),('Tezu','TEI','733','India','Tezu','+5.5'),('Tezpur','TEZ','733','India','Salonibari','+5.5'),('Tirupati','TIR','733','India','Tirupati','+5.5'),('Thanjavur','TJV','733','India','Thanjavur','+5.5'),('Satna','TNI','733','India','Satna','+5.5'),('Thiruvananthapuram','TRV','733','India','Thiruvananthapuram International','+5.5'),('Trichy','TRZ','733','India','Civil','+5.5'),('Udaipur','UDR','733','India','Dabok','+5.5'),('Vijayawada','VGA','733','India','Vijayawada','+5.5'),('Varanasi','VNS','733','India','Varanasi','+5.5'),('Visakhapatnam','VTZ','733','India','Vishakhapatnam','+5.5'),('Warangal','WGC','733','India','Warangal','+5.5'),('Zero','ZER','733','India','Zero','+5.5');
/*!40000 ALTER TABLE `iata_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tripid` int(11) NOT NULL,
  `expenseid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `amount` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trips`
--

DROP TABLE IF EXISTS `trips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trips` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `creator` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator` (`creator`),
  CONSTRAINT `trips_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trips`
--

LOCK TABLES `trips` WRITE;
/*!40000 ALTER TABLE `trips` DISABLE KEYS */;
/*!40000 ALTER TABLE `trips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_trip`
--

DROP TABLE IF EXISTS `user_trip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_trip` (
  `userid` int(11) NOT NULL,
  `tripid` int(11) NOT NULL,
  PRIMARY KEY (`userid`,`tripid`),
  KEY `tripid` (`tripid`),
  CONSTRAINT `user_trip_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`),
  CONSTRAINT `user_trip_ibfk_2` FOREIGN KEY (`tripid`) REFERENCES `trips` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_trip`
--

LOCK TABLES `user_trip` WRITE;
/*!40000 ALTER TABLE `user_trip` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_trip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Shreyansh','shreyanshmurarka97@gmail.com','blaaah');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-08 18:48:13
