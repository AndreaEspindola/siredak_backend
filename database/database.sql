-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema  heroku_3ac8e0c96c58c97
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema  heroku_3ac8e0c96c58c97
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `heroku_3ac8e0c96c58c97` DEFAULT CHARACTER SET  utf8 COLLATE  utf8_general_ci ;
USE `heroku_3ac8e0c96c58c97` ;

-- -----------------------------------------------------
-- Table ` heroku_3ac8e0c96c58c97`.`clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ` heroku_3ac8e0c96c58c97`.`clients` (
  `id_clients` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `lastName` VARCHAR(70) NULL DEFAULT NULL,
  `birthday` DATE NULL DEFAULT NULL,
  `nationality` VARCHAR(50) NULL DEFAULT NULL,
  `state` VARCHAR(50) NULL DEFAULT NULL,
  `curp` VARCHAR(18) NULL DEFAULT NULL,
  `cellphone` VARCHAR(50) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `is_client` INT NULL DEFAULT NULL,
  `gender` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_clients`),
  UNIQUE INDEX `id_clients_UNIQUE` (`id_clients` ASC) ,
  UNIQUE INDEX `curp_UNIQUE` (`curp` ASC) ,
  UNIQUE INDEX `cellphone_UNIQUE` (`cellphone` ASC) ,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET =  utf8
COLLATE =  utf8_general_ci;


-- -----------------------------------------------------
-- Table ` heroku_3ac8e0c96c58c97`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ` heroku_3ac8e0c96c58c97`.`address` (
  `id_address` INT NOT NULL AUTO_INCREMENT,
  `country` VARCHAR(50) NULL DEFAULT NULL,
  `state` VARCHAR(50) NULL DEFAULT NULL,
  `colony` VARCHAR(50) NULL DEFAULT NULL,
  `postalCode` VARCHAR(5) NULL DEFAULT NULL,
  `street` VARCHAR(100) NULL DEFAULT NULL,
  `ext_num` VARCHAR(10) NULL DEFAULT NULL,
  `int_num` VARCHAR(10) NULL DEFAULT NULL,
  `id_client` INT NOT NULL,
  PRIMARY KEY (`id_address`),
  INDEX `id_client_address_idx` (`id_client` ASC) ,
  CONSTRAINT `id_client_address`
    FOREIGN KEY (`id_clients`)
    REFERENCES ` heroku_3ac8e0c96c58c97`.`clients` (`id_clients`))
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET =  utf8
COLLATE =  utf8_general_ci;


-- -----------------------------------------------------
-- Table ` heroku_3ac8e0c96c58c97`.`derechos_arco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ` heroku_3ac8e0c96c58c97`.`derechos_arco` (
  `id_derecho_arco` INT NOT NULL AUTO_INCREMENT,
  `name_derecho_arco` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_derecho_arco`),
  UNIQUE INDEX `id_derecho_arco_UNIQUE` (`id_derecho_arco` ASC) ,
  UNIQUE INDEX `name_derecho_arco_UNIQUE` (`name_derecho_arco` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET =  utf8
COLLATE =  utf8_general_ci;


-- -----------------------------------------------------
-- Table ` heroku_3ac8e0c96c58c97`.`fields`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ` heroku_3ac8e0c96c58c97`.`fields` (
  `field_id` INT NOT NULL AUTO_INCREMENT,
  `nameField` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`field_id`),
  UNIQUE INDEX `field_id_UNIQUE` (`field_id` ASC) ,
  UNIQUE INDEX `nameField_UNIQUE` (`nameField` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET =  utf8
COLLATE =  utf8_general_ci;


-- -----------------------------------------------------
-- Table ` heroku_3ac8e0c96c58c97`.`disable_fields`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ` heroku_3ac8e0c96c58c97`.`disable_fields` (
  `id_client` INT NOT NULL,
  `id_field` INT NOT NULL,
  INDEX `id_client_disable_fields_idx` (`id_client` ASC) ,
  INDEX `id_fields_disable_fields_idx` (`id_field` ASC) ,
  CONSTRAINT `id_client_disable_fields`
    FOREIGN KEY (`id_client`)
    REFERENCES ` heroku_3ac8e0c96c58c97`.`clients` (`id_clients`),
  CONSTRAINT `id_fields_disable_fields`
    FOREIGN KEY (`id_field`)
    REFERENCES ` heroku_3ac8e0c96c58c97`.`fields` (`field_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET =  utf8
COLLATE =  utf8_general_ci;


-- -----------------------------------------------------
-- Table ` heroku_3ac8e0c96c58c97`.`identifications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ` heroku_3ac8e0c96c58c97`.`identifications` (
  `id_identification` INT NOT NULL AUTO_INCREMENT,
  `type` TEXT NOT NULL,
  `id_num` INT NOT NULL,
  `id_client` INT NOT NULL,
  PRIMARY KEY (`id_identification`),
  UNIQUE INDEX `id_identification_UNIQUE` (`id_identification` ASC) ,
  INDEX `id_client_identifications_idx` (`id_client` ASC) ,
  CONSTRAINT `id_client_identifications`
    FOREIGN KEY (`id_client`)
    REFERENCES ` heroku_3ac8e0c96c58c97`.`clients` (`id_clients`))
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET =  utf8
COLLATE =  utf8_general_ci;


-- -----------------------------------------------------
-- Table ` heroku_3ac8e0c96c58c97`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ` heroku_3ac8e0c96c58c97`.`user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `name_user` VARCHAR(50) NOT NULL,
  `last_name_user` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `id_user_UNIQUE` (`id_user` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 1011
DEFAULT CHARACTER SET =  utf8
COLLATE =  utf8_general_ci;


-- -----------------------------------------------------
-- Table ` heroku_3ac8e0c96c58c97`.`logs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ` heroku_3ac8e0c96c58c97`.`logs` (
  `id_logs` INT NOT NULL AUTO_INCREMENT,
  `id_client` INT NOT NULL,
  `id_user` INT NOT NULL,
  `id_derecho_arco` INT NOT NULL,
  `date_performed` DATE NOT NULL,
  `comment` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id_logs`),
  UNIQUE INDEX `id_logs_UNIQUE` (`id_logs` ASC) ,
  INDEX `id_client_logs_idx` (`id_client` ASC) ,
  INDEX `id_user_logs_idx` (`id_user` ASC) ,
  INDEX `id_derecho_arco_logs_idx` (`id_derecho_arco` ASC) ,
  CONSTRAINT `id_client_logs`
    FOREIGN KEY (`id_client`)
    REFERENCES ` heroku_3ac8e0c96c58c97`.`clients` (`id_clients`),
  CONSTRAINT `id_derecho_arco_logs`
    FOREIGN KEY (`id_derecho_arco`)
    REFERENCES ` heroku_3ac8e0c96c58c97`.`derechos_arco` (`id_derecho_arco`),
  CONSTRAINT `id_user_logs`
    FOREIGN KEY (`id_user`)
    REFERENCES ` heroku_3ac8e0c96c58c97`.`user` (`id_user`))
ENGINE = InnoDB
AUTO_INCREMENT = 61
DEFAULT CHARACTER SET =  utf8
COLLATE =  utf8_general_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
