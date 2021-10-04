-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 04 oct. 2021 à 15:07
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `betweenus`
--

-- --------------------------------------------------------

--
-- Structure de la table `actif-room-private`
--

DROP TABLE IF EXISTS `actif-room-private`;
CREATE TABLE IF NOT EXISTS `actif-room-private` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` int(11) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `type_room` enum('private','free','vip') NOT NULL DEFAULT 'free',
  `roomPrivateId` int(11) DEFAULT NULL,
  `peerId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3e788663cdef0d04153794000a4` (`clientId`),
  KEY `FK_76b144c277f10c082a7dedc2479` (`roomPrivateId`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `role` enum('admin','user','client','model') NOT NULL DEFAULT 'admin',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `pseudo` varchar(255) NOT NULL DEFAULT 'Admin',
  `url` varchar(255) NOT NULL DEFAULT './../../../../../assets/images/user_chat.png',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_de87485f6489f5d0995f584195` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`, `salt`, `role`, `createdAt`, `updatedAt`, `deletedAt`, `pseudo`, `url`) VALUES
(1, 'admin_betweenus@yahoo.fr', '$2b$10$9h5PCxFtMXhjZM/dlHHw/Ot/qW/ANvPzKY3UqrQ1L.AXjeKxniMuG', '$2b$10$9h5PCxFtMXhjZM/dlHHw/O', 'admin', '2021-08-29 19:20:25.470347', '2021-08-31 11:14:04.000000', NULL, 'Admin', 'http://localhost/betweenUs/uploads/fd2a89552edd78156517961361680c26');

-- --------------------------------------------------------

--
-- Structure de la table `album`
--

DROP TABLE IF EXISTS `album`;
CREATE TABLE IF NOT EXISTS `album` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_album` enum('private','free','vip') NOT NULL DEFAULT 'free',
  `path_album` varchar(255) NOT NULL,
  `price_album` int(11) NOT NULL DEFAULT '0',
  `modelId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_191b9aa7cfba6469fa8f5c6f800` (`modelId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `banish`
--

DROP TABLE IF EXISTS `banish`;
CREATE TABLE IF NOT EXISTS `banish` (
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `modelId` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `isBanished` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `buy-pack`
--

DROP TABLE IF EXISTS `buy-pack`;
CREATE TABLE IF NOT EXISTS `buy-pack` (
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `designation` enum('bienvenue','bronze','argent','or') DEFAULT NULL,
  `credit` int(11) NOT NULL,
  `montant` int(11) NOT NULL,
  `card` varchar(255) NOT NULL,
  `mm` varchar(255) NOT NULL,
  `yyyy` varchar(255) NOT NULL,
  `cvv` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `clientId` int(11) DEFAULT NULL,
  `idClient` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_5349be7d834aa9c56061ff5b1c3` (`clientId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `chat`
--

DROP TABLE IF EXISTS `chat`;
CREATE TABLE IF NOT EXISTS `chat` (
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idRoom` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `id_source` int(11) NOT NULL,
  `code_couleur` varchar(255) NOT NULL,
  `type_source` enum('admin','user','client','model') NOT NULL DEFAULT 'client',
  `type_chat` enum('private','free','vip') NOT NULL DEFAULT 'free',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `state` enum('En attente','Valide','Desactive','Supprime','Refuse','Bloque','Suppression','Desactivation') NOT NULL DEFAULT 'En attente',
  `status` int(11) NOT NULL DEFAULT '1',
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `role` enum('admin','user','client','model') NOT NULL DEFAULT 'client',
  `creditId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_6436cc6b79593760b9ef921ef1` (`email`),
  UNIQUE KEY `IDX_aff2f43e15bb4d5c04b2d3e790` (`pseudo`),
  UNIQUE KEY `REL_984b54d48c32e7f77548a36d06` (`creditId`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `cost-show`
--

DROP TABLE IF EXISTS `cost-show`;
CREATE TABLE IF NOT EXISTS `cost-show` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `credit` int(11) NOT NULL DEFAULT '0',
  `second` int(11) NOT NULL DEFAULT '60',
  `type` enum('private','free','vip') NOT NULL DEFAULT 'free',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `cost-show`
--

INSERT INTO `cost-show` (`id`, `credit`, `second`, `type`) VALUES
(1, 0, 60, 'free'),
(2, 5, 60, 'private'),
(3, 15, 60, 'vip');

-- --------------------------------------------------------

--
-- Structure de la table `credit`
--

DROP TABLE IF EXISTS `credit`;
CREATE TABLE IF NOT EXISTS `credit` (
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `credit` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `log`
--

DROP TABLE IF EXISTS `log`;
CREATE TABLE IF NOT EXISTS `log` (
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` enum('admin','user','client','model') NOT NULL DEFAULT 'model',
  `description` varchar(255) NOT NULL,
  `modelId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7e6141e91a5a47d7aef8e1ebec1` (`modelId`)
) ENGINE=InnoDB AUTO_INCREMENT=265 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `log`
--

INSERT INTO `log` (`createdAt`, `updatedAt`, `deletedAt`, `id`, `type`, `description`, `modelId`) VALUES
('2021-10-04 17:02:14.267477', '2021-10-04 17:02:14.267477', NULL, 264, 'model', 'deconnection', 23);

-- --------------------------------------------------------

--
-- Structure de la table `model`
--

DROP TABLE IF EXISTS `model`;
CREATE TABLE IF NOT EXISTS `model` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `month_birth` varchar(255) NOT NULL,
  `year_birth` int(11) NOT NULL,
  `date_birth` varchar(255) NOT NULL,
  `state` enum('En attente','Valide','Desactive','Supprime','Refuse','Bloque','Suppression','Desactivation') NOT NULL DEFAULT 'En attente',
  `path_recto` varchar(255) NOT NULL,
  `path_verso` varchar(255) NOT NULL,
  `path_soft` varchar(255) NOT NULL,
  `path_cin` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `role` enum('admin','user','client','model') NOT NULL DEFAULT 'model',
  `day_birth` varchar(255) NOT NULL,
  `profileId` int(11) DEFAULT NULL,
  `settingId` int(11) DEFAULT NULL,
  `creditId` int(11) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_211d5e5988e797d9b238da987b` (`pseudo`),
  UNIQUE KEY `IDX_0049b8eed7227e82c98220525f` (`email`),
  UNIQUE KEY `REL_6b100f496048d7517738cf69b2` (`profileId`),
  UNIQUE KEY `REL_0d2bdb57d8d1eb453ad2420078` (`settingId`),
  UNIQUE KEY `REL_b9e353f30dd59b7ad6cdce2c59` (`creditId`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `paiement`
--

DROP TABLE IF EXISTS `paiement`;
CREATE TABLE IF NOT EXISTS `paiement` (
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_source` varchar(255) NOT NULL,
  `id_source` int(11) NOT NULL,
  `credit` int(11) NOT NULL,
  `montant` int(11) DEFAULT NULL,
  `pseudo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `flux` enum('in','out') NOT NULL DEFAULT 'in',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `profile`
--

DROP TABLE IF EXISTS `profile`;
CREATE TABLE IF NOT EXISTS `profile` (
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `like` varchar(255) NOT NULL,
  `dislike` varchar(255) NOT NULL,
  `social_network` varchar(255) NOT NULL,
  `sex_orientation` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` enum('Hors ligne','En ligne','En live','En vip') NOT NULL DEFAULT 'Hors ligne',
  `date_last_connection` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `room`
--

DROP TABLE IF EXISTS `room`;
CREATE TABLE IF NOT EXISTS `room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `actif` int(11) NOT NULL DEFAULT '0',
  `modelId` int(11) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_dae356e011e5183abb359fb4222` (`modelId`)
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `room-private`
--

DROP TABLE IF EXISTS `room-private`;
CREATE TABLE IF NOT EXISTS `room-private` (
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `actif` int(11) NOT NULL DEFAULT '0',
  `modelId` int(11) DEFAULT NULL,
  `gain` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_03fcdacee567965f8bba065f691` (`modelId`)
) ENGINE=InnoDB AUTO_INCREMENT=150 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `room-vip`
--

DROP TABLE IF EXISTS `room-vip`;
CREATE TABLE IF NOT EXISTS `room-vip` (
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `actif` int(11) NOT NULL DEFAULT '0',
  `modelId` int(11) DEFAULT NULL,
  `clientId` int(11) NOT NULL DEFAULT '0',
  `gain` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_a63a3acb64c20c5ec9a5b66ef6c` (`modelId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `setting`
--

DROP TABLE IF EXISTS `setting`;
CREATE TABLE IF NOT EXISTS `setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sound_notification` int(11) NOT NULL,
  `mail_notification` int(11) NOT NULL,
  `sound_message` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `taboo`
--

DROP TABLE IF EXISTS `taboo`;
CREATE TABLE IF NOT EXISTS `taboo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `word` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `taboo`
--

INSERT INTO `taboo` (`id`, `word`) VALUES
(1, 'fuck'),
(3, 'enfoiré'),
(4, 'petasse');

-- --------------------------------------------------------

--
-- Structure de la table `timer`
--

DROP TABLE IF EXISTS `timer`;
CREATE TABLE IF NOT EXISTS `timer` (
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `leaved` tinyint(4) NOT NULL DEFAULT '0',
  `type` varchar(255) NOT NULL,
  `clientId` int(11) DEFAULT NULL,
  `modelId` int(11) DEFAULT NULL,
  `push` varchar(255) DEFAULT NULL,
  `lastUpdated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8a6e15eb0f790e7b50b88e82e8f` (`clientId`),
  KEY `FK_ada883c69676e5bcd11a5a22b8b` (`modelId`)
) ENGINE=InnoDB AUTO_INCREMENT=188 DEFAULT CHARSET=utf8mb4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `actif-room-private`
--
ALTER TABLE `actif-room-private`
  ADD CONSTRAINT `FK_3e788663cdef0d04153794000a4` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_76b144c277f10c082a7dedc2479` FOREIGN KEY (`roomPrivateId`) REFERENCES `room-private` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `album`
--
ALTER TABLE `album`
  ADD CONSTRAINT `FK_191b9aa7cfba6469fa8f5c6f800` FOREIGN KEY (`modelId`) REFERENCES `model` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `buy-pack`
--
ALTER TABLE `buy-pack`
  ADD CONSTRAINT `FK_5349be7d834aa9c56061ff5b1c3` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `FK_984b54d48c32e7f77548a36d066` FOREIGN KEY (`creditId`) REFERENCES `credit` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `log`
--
ALTER TABLE `log`
  ADD CONSTRAINT `FK_7e6141e91a5a47d7aef8e1ebec1` FOREIGN KEY (`modelId`) REFERENCES `model` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `model`
--
ALTER TABLE `model`
  ADD CONSTRAINT `FK_0d2bdb57d8d1eb453ad24200786` FOREIGN KEY (`settingId`) REFERENCES `setting` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_6b100f496048d7517738cf69b2c` FOREIGN KEY (`profileId`) REFERENCES `profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_b9e353f30dd59b7ad6cdce2c595` FOREIGN KEY (`creditId`) REFERENCES `credit` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `FK_dae356e011e5183abb359fb4222` FOREIGN KEY (`modelId`) REFERENCES `model` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `room-private`
--
ALTER TABLE `room-private`
  ADD CONSTRAINT `FK_03fcdacee567965f8bba065f691` FOREIGN KEY (`modelId`) REFERENCES `model` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `room-vip`
--
ALTER TABLE `room-vip`
  ADD CONSTRAINT `FK_a63a3acb64c20c5ec9a5b66ef6c` FOREIGN KEY (`modelId`) REFERENCES `model` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `timer`
--
ALTER TABLE `timer`
  ADD CONSTRAINT `FK_8a6e15eb0f790e7b50b88e82e8f` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ada883c69676e5bcd11a5a22b8b` FOREIGN KEY (`modelId`) REFERENCES `model` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
