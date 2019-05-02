CREATE TABLE `scg_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login_id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user_type` varchar(55) DEFAULT NULL,
  `created_date` timestamp DEFAULT current_timestamp(),
  `last_modified_date` timestamp  NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `scg_user_uk1` (`login_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

CREATE TABLE `scg_file` (
  `id` varchar(255) NOT NULL,
  `file_type` varchar(255) NOT NULL,
  `file_size` bigint(20) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `object_type` varchar(10) DEFAULT NULL,
  `file_ext` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `scg_board` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_modified_date` timestamp  NULL,
  `creator_id` int(11) DEFAULT NULL,
  `last_modifier_id` int(11) DEFAULT NULL,
  `content` varchar(4000) DEFAULT NULL,
  `title` varchar(4000) NOT NULL,
  `is_open` tinyint(1) NOT NULL,
  `category_code` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_id` (`creator_id`),
  KEY `last_modifier_id` (`last_modifier_id`),
  CONSTRAINT `scg_board_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `scg_user` (`id`),
  CONSTRAINT `scg_board_ibfk_2` FOREIGN KEY (`last_modifier_id`) REFERENCES `scg_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

CREATE TABLE `scg_check` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_modified_date` timestamp  NULL,
  `creator_id` int(11) DEFAULT NULL,
  `last_modifier_id` int(11) DEFAULT NULL,
  `content` varchar(4000) DEFAULT NULL,
  `start_date` timestamp NOT NULL,
  `end_date` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_id` (`creator_id`),
  KEY `last_modifier_id` (`last_modifier_id`),
  CONSTRAINT `scg_check_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `scg_user` (`id`),
  CONSTRAINT `scg_check_ibfk_2` FOREIGN KEY (`last_modifier_id`) REFERENCES `scg_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;


CREATE TABLE `scg_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_modified_date` timestamp  NULL,
  `creator_id` int(11) DEFAULT NULL,
  `last_modifier_id` int(11) DEFAULT NULL,
  `content` varchar(4000) DEFAULT NULL,
  `title` varchar(4000) NOT NULL,
  `status` varchar(10) NOT NULL,
  `color` varchar(10) NOT NULL,
  `sort_index` int(11) NOT NULL,
  `file_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_id` (`creator_id`),
  KEY `last_modifier_id` (`last_modifier_id`),
  KEY `file_id` (`file_id`),
  CONSTRAINT `scg_info_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `scg_user` (`id`),
  CONSTRAINT `scg_info_ibfk_2` FOREIGN KEY (`last_modifier_id`) REFERENCES `scg_user` (`id`),
  CONSTRAINT `scg_info_ibfk_3` FOREIGN KEY (`file_id`) REFERENCES `scg_file` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

CREATE TABLE `scg_random` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_modified_date` timestamp  NULL,
  `creator_id` int(11) DEFAULT NULL,
  `last_modifier_id` int(11) DEFAULT NULL,
  `description` varchar(4000) DEFAULT NULL,
  `name` varchar(4000) NOT NULL,
  `category_code` varchar(10) NOT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_id` (`creator_id`),
  KEY `last_modifier_id` (`last_modifier_id`),
  CONSTRAINT `scg_random_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `scg_user` (`id`),
  CONSTRAINT `scg_random_ibfk_2` FOREIGN KEY (`last_modifier_id`) REFERENCES `scg_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

CREATE TABLE `scg_random_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_modified_date` timestamp  NULL,
  `creator_id` int(11) DEFAULT NULL,
  `last_modifier_id` int(11) DEFAULT NULL,
  `item_list` varchar(4000) DEFAULT NULL,
  `name` varchar(4000) NOT NULL,
  `random_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_id` (`creator_id`),
  KEY `last_modifier_id` (`last_modifier_id`),
  KEY `random_id` (`random_id`),
  CONSTRAINT `scg_randomitem_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `scg_user` (`id`),
  CONSTRAINT `scg_randomitem_ibfk_2` FOREIGN KEY (`last_modifier_id`) REFERENCES `scg_user` (`id`),
  CONSTRAINT `scg_randomitem_ibfk_3` FOREIGN KEY (`random_id`) REFERENCES `scg_random` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `scg_block` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_modified_date` timestamp  NULL,
  `creator_id` int(11) DEFAULT NULL,
  `last_modifier_id` int(11) DEFAULT NULL,
  `description` varchar(4000) DEFAULT NULL,
  `name` varchar(4000) NOT NULL,
  `api_version` varchar(10) NOT NULL,
  `status` varchar(10) NOT NULL,
  `file_id` varchar(255) DEFAULT NULL,
  `random_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_id` (`creator_id`),
  KEY `last_modifier_id` (`last_modifier_id`),
  KEY `scg_block_ibfk_3` (`file_id`),
  KEY `scg_block_ibfk_4` (`random_id`),
  CONSTRAINT `scg_block_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `scg_user` (`id`),
  CONSTRAINT `scg_block_ibfk_2` FOREIGN KEY (`last_modifier_id`) REFERENCES `scg_user` (`id`),
  CONSTRAINT `scg_block_ibfk_3` FOREIGN KEY (`file_id`) REFERENCES `scg_file` (`id`),
  CONSTRAINT `scg_block_ibfk_4` FOREIGN KEY (`random_id`) REFERENCES `scg_random` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

CREATE TABLE `scg_block_relation` (
  `block_id` int(11) NOT NULL,
  `block_child_id` int(11) NOT NULL,
  KEY `block_id` (`block_id`),
  KEY `block_child_id` (`block_child_id`),
  CONSTRAINT `scg_blockchild_ibfk_1` FOREIGN KEY (`block_id`) REFERENCES `scg_block` (`id`),
  CONSTRAINT `scg_blockchild_ibfk_2` FOREIGN KEY (`block_child_id`) REFERENCES `scg_block` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 수정분
ALTER TABLE scg_info ADD COLUMN color varchar(10);