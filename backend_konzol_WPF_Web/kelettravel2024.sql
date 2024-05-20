-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Nov 16. 16:53
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `kelettravel2024`
--
CREATE DATABASE IF NOT EXISTS `kelettravel2024` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `kelettravel2024`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `celok`
--

CREATE TABLE `celok` (
  `celok_id` int(11) NOT NULL,
  `celok_nev` varchar(100) NOT NULL,
  `celok_kep` varchar(100) NOT NULL,
  `celok_kultura_honap` varchar(255) NOT NULL,
  `celok_orszag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `celok`
--

INSERT INTO `celok` (`celok_id`, `celok_nev`, `celok_kep`, `celok_kultura_honap`, `celok_orszag`) VALUES
(1, 'Bangkok', 'utazas01.jpg', 'április', 1),
(2, 'Phi-phi sziget', 'utazas02.jpg', 'április', 1),
(3, 'Úszó piac', 'utazas03.jpg', 'április', 1),
(4, 'Angkor', 'utazas04.jpg\r\n', 'március', 4),
(5, 'Kuala Lumpur', 'utazas05.jpg', 'június', 2),
(6, 'Cameron felföld', 'utazas06.jpg', 'június', 2),
(7, 'Tiltott város', 'utazas07.jpg', 'április', 3),
(8, 'Kínai Nagy fal', 'utazas08.jpg', 'augusztus', 3),
(9, 'Nagy Buddha', 'utazas09.jpg', 'augusztus', 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kapcsolatfelvetel`
--

CREATE TABLE `kapcsolatfelvetel` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefon` varchar(100) NOT NULL,
  `megjegyzes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `kapcsolatfelvetel`
--

INSERT INTO `kapcsolatfelvetel` (`id`, `nev`, `email`, `telefon`, `megjegyzes`) VALUES
(1, 'Fekete Ferenc', 'fekete@gmail.com', '20-222-22-22', 'Csak Kínai utazás érdekelne'),
(2, 'Nagy Natália', 'nagy@gmail.com', '30-456-34-23', 'Bármilyen utazás érdekelne, de csak szeptemberben.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orszag`
--

CREATE TABLE `orszag` (
  `orszag_id` int(11) NOT NULL,
  `orszag_nev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `orszag`
--

INSERT INTO `orszag` (`orszag_id`, `orszag_nev`) VALUES
(1, 'Thaiföld'),
(2, 'Malajzia'),
(3, 'Kína'),
(4, 'Kambodzsa');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `celok`
--
ALTER TABLE `celok`
  ADD PRIMARY KEY (`celok_id`),
  ADD KEY `celok_orszag` (`celok_orszag`);

--
-- A tábla indexei `kapcsolatfelvetel`
--
ALTER TABLE `kapcsolatfelvetel`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `orszag`
--
ALTER TABLE `orszag`
  ADD PRIMARY KEY (`orszag_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `celok`
--
ALTER TABLE `celok`
  MODIFY `celok_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT a táblához `kapcsolatfelvetel`
--
ALTER TABLE `kapcsolatfelvetel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT a táblához `orszag`
--
ALTER TABLE `orszag`
  MODIFY `orszag_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `celok`
--
ALTER TABLE `celok`
  ADD CONSTRAINT `celok_ibfk_1` FOREIGN KEY (`celok_orszag`) REFERENCES `orszag` (`orszag_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
