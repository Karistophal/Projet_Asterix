-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 23 avr. 2024 à 17:31
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
-- Base de données : `dbasterix`
--

-- --------------------------------------------------------

--
-- Structure de la table `alerte`
--

DROP TABLE IF EXISTS `alerte`;
CREATE TABLE IF NOT EXISTS `alerte` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  `description` text,
  `niveau_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `niveau_id` (`niveau_id`)
) ENGINE=MyISAM AUTO_INCREMENT=1632 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `alerte`
--

INSERT INTO `alerte` (`id`, `titre`, `description`, `niveau_id`) VALUES
(1, 'Alerte Faible', 'Ceci est une alerte de niveau faible.', 1),
(2, 'Alerte Moyenne', 'Ceci est une alerte de niveau moyen.', 2),
(3, 'Alerte Élevée', 'Ceci est une alerte de niveau élevé.', 3);

-- --------------------------------------------------------

--
-- Structure de la table `equipe`
--

DROP TABLE IF EXISTS `equipe`;
CREATE TABLE IF NOT EXISTS `equipe` (
  `equipe_id` int(11) NOT NULL,
  `libelle` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`equipe_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `equipe`
--

INSERT INTO `equipe` (`equipe_id`, `libelle`) VALUES
(1, 'Equipe technique'),
(2, 'Equipe accueil'),
(3, 'Equipe commerce');

-- --------------------------------------------------------

--
-- Structure de la table `missiondujour`
--

DROP TABLE IF EXISTS `missiondujour`;
CREATE TABLE IF NOT EXISTS `missiondujour` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valide` tinyint(1) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `poste_id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `commentaire` varchar(255) DEFAULT NULL,
  `structure` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `poste_id` (`poste_id`),
  KEY `structure` (`structure`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `missiondujour`
--

INSERT INTO `missiondujour` (`id`, `valide`, `date`, `poste_id`, `description`, `commentaire`, `structure`, `titre`) VALUES
(1, 0, '2024-04-18', 1, 'Réparer cette barre rouillée', 'Bonjour la famille', 1, 'Réparation barre metal'),
(2, 1, '2024-04-19', 1, 'Réparer la fenetre brisée ici', 'ceci est un commentaire', 3, 'Fenetre cassée'),
(21, 0, '2024-04-24', 3, 'Trier par la couleur bleue', NULL, 5, 'Rangement'),
(13, 0, '2024-04-23', 5, 'Attention aux papiers', NULL, 10, 'S\'occuper de l\'accueil'),
(20, 0, '2024-04-25', 5, '', NULL, 12, 'S\'occuper du centre d\'accueil'),
(12, 0, '2024-04-24', 2, '', NULL, 7, 'Conseiller billeterie');

-- --------------------------------------------------------

--
-- Structure de la table `niveau`
--

DROP TABLE IF EXISTS `niveau`;
CREATE TABLE IF NOT EXISTS `niveau` (
  `idNiv` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(255) NOT NULL,
  PRIMARY KEY (`idNiv`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `niveau`
--

INSERT INTO `niveau` (`idNiv`, `libelle`) VALUES
(1, 'Faible'),
(2, 'Moyen'),
(3, 'Élevé');

-- --------------------------------------------------------

--
-- Structure de la table `poste`
--

DROP TABLE IF EXISTS `poste`;
CREATE TABLE IF NOT EXISTS `poste` (
  `poste_id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(255) DEFAULT NULL,
  `equipe_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`poste_id`),
  KEY `equipe_id` (`equipe_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `poste`
--

INSERT INTO `poste` (`poste_id`, `libelle`, `equipe_id`) VALUES
(1, 'MAINTENANCE ATTRACTION', 1),
(2, 'CONSEILLER VENDEUR BILLETTERIE ', 3),
(3, 'VENDEUR CONSEIL ', 3),
(4, 'MANAGER BOUTIQUES', 3),
(5, 'AGENT D\'ACCUEIL', 2);

-- --------------------------------------------------------

--
-- Structure de la table `structure`
--

DROP TABLE IF EXISTS `structure`;
CREATE TABLE IF NOT EXISTS `structure` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `theme` varchar(255) NOT NULL,
  `lieu` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text,
  `tailleMini` varchar(255) DEFAULT NULL,
  `tailleMiniAccomp` varchar(255) DEFAULT NULL,
  `typeStructure` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `typeStructure` (`typeStructure`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `structure`
--

INSERT INTO `structure` (`id`, `nom`, `theme`, `lieu`, `image`, `description`, `tailleMini`, `tailleMiniAccomp`, `typeStructure`) VALUES
(1, 'Tonnerre de Zeus', 'Montagnes Russes', 'Gaulois', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_slider_bloc/public/images/attractions/Tonnerre%202%20Zeus%20%284%29_0.jpg.webp?itok=6OoMxTED', 'Montagnes russes en bois emblématiques du Parc Astérix.', '1.40m', '1.20m accompagné', 0),
(2, 'Oziris', 'Montagnes Russes Inversées', 'Gaulois', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_slider_bloc/public/images/attractions/Oziris_miniature_0_0.png.webp?itok=d947beg8', 'Montagnes russes inversées inspirées de l\'univers égyptien.', '1.40m', '1.20m accompagné', 0),
(3, 'Pégase Express', 'Montagnes Russes', 'Gaulois', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_slider_bloc/public/images/attractions/pegase-express-parc-asterix.jpg.webp?itok=zOfVDuTl', 'Montagnes russes familiales à thème de la mythologie grecque.', '1.20m', NULL, 0),
(4, 'Le Palais des Bonbons et du Souvenir', 'Souvenirs & Confiseries', 'Village Gaulois', 'https://eureennormandie.fr/wp-content/uploads/2020/06/Boutique_test_departement_de_leure.jpg', 'Boutique proposant des souvenirs et des bonbons à thème Astérix.', NULL, NULL, 1),
(5, 'La Fleur de Lys', 'Mode & Accessoires', 'Allée des Voluptés', 'https://eureennormandie.fr/wp-content/uploads/2020/06/Boutique_test_departement_de_leure.jpg', 'Boutique offrant une sélection de vêtements et d\'accessoires à thème Astérix.', NULL, NULL, 1),
(6, 'Asterix Bieres', 'Boutique de Boissons', 'Rue des Gourmands', 'https://eureennormandie.fr/wp-content/uploads/2020/06/Boutique_test_departement_de_leure.jpg', 'Boutique proposant une variété de bières artisanales inspirées de l\'univers d\'Astérix.', NULL, NULL, 1),
(7, 'Billeterie Principale', 'Standard', 'Entrée du Parc', 'https://www.azimut.net/mediacenter/uploads/l/20210826_azimut-finistere_j2a6442_hr31.jpeg', 'Point de vente de billets standard pour l\'entrée au Parc Astérix.', NULL, NULL, 2),
(8, 'Billeterie Express', 'En ligne', 'Site Web', 'https://www.azimut.net/mediacenter/uploads/l/20210826_azimut-finistere_j2a6442_hr31.jpeg', 'Plateforme en ligne pour acheter des billets pour le Parc Astérix.', NULL, NULL, 2),
(9, 'Billeterie VIP', 'VIP', 'Quartier VIP', 'https://www.azimut.net/mediacenter/uploads/l/20210826_azimut-finistere_j2a6442_hr31.jpeg', 'Billeterie réservée aux visiteurs VIP avec des avantages exclusifs.', NULL, NULL, 2),
(10, 'Point Info', 'Informations', 'Place Centrale', 'https://www.oscar.fr/wp-content/uploads/2023/02/qualite-agent-d-accueil.jpeg', 'Point d\'information pour les visiteurs du Parc Astérix.', NULL, NULL, 3),
(11, 'Information Desk', 'Informations', 'Entrée du Parc', 'https://www.oscar.fr/wp-content/uploads/2023/02/qualite-agent-d-accueil.jpeg', 'Bureau d\'information pour les visiteurs fournissant des informations sur les attractions, les horaires et les événements du Parc Astérix.', NULL, NULL, 3),
(12, 'Centre d\'Accueil', 'Accueil', 'Entrée du Parc', 'https://www.oscar.fr/wp-content/uploads/2023/02/qualite-agent-d-accueil.jpeg', 'Centre d\'accueil pour les nouveaux arrivants fournissant des informations sur le Parc Astérix.', NULL, NULL, 3);

-- --------------------------------------------------------

--
-- Structure de la table `typestructure`
--

DROP TABLE IF EXISTS `typestructure`;
CREATE TABLE IF NOT EXISTS `typestructure` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `typestructure`
--

INSERT INTO `typestructure` (`id`, `libelle`) VALUES
(0, 'Attraction'),
(1, 'Boutique'),
(2, 'Billeterie'),
(3, 'Accueil');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `adresse_mail` varchar(100) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `equipe_id` int(11) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `adresse_mail` (`adresse_mail`),
  KEY `equipe_id` (`equipe_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`user_id`, `adresse_mail`, `mot_de_passe`, `equipe_id`, `admin`) VALUES
(7, 'SuperAdmin2024', '$2b$10$8B/CJFdSr.Acq1.erdcNLOAghG.uPPgrB/aE46bRLY55Nx9dHZmV.', 1, 1),
(11, 'user1234', '$2b$10$sGqEvo5i2qTRSSpFNs2riO4kfrUubSqwX5SO7B3cxjam1DldQHyL.', 2, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
