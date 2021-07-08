CREATE TABLE IF NOT EXISTS `tmp_pexapark_data` (
  `farm_id` tinyint(3) unsigned NOT NULL,
  `timemark` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `value` decimal(4,2) NOT NULL,
  PRIMARY KEY (`farm_id`,`timemark`),
  KEY `farm_id` (`farm_id`),
  KEY `timemark` (`timemark`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `tmp_pexapark_farms` (
  `farm_id` tinyint(3) unsigned NOT NULL,
  `capacity` tinyint(3) unsigned NOT NULL,
  `visible` char(0) DEFAULT NULL,
  PRIMARY KEY (`farm_id`),
  KEY `visible` (`visible`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
