CREATE DATABASE IF NOT EXISTS newspaper;

USE newspaper;

CREATE TABLE news (
  id INT(11) NOT NULL AUTO_INCREMENT,
  headline VARCHAR(45) DEFAULT NULL,
  author VARCHAR(45) DEFAULT NULL,
  content VARCHAR(45) DEFAULT NULL,
  creationDate VARCHAR(45) DEFAULT NULL,
  updateDate VARCHAR(45) DEFAULT NULL,
  
  PRIMARY KEY(id)
);

DESCRIBE news;

INSERT INTO news values 

  (1, 'Noticia de Prueba', 'Javier Tenza','Esto es una noticia de prueba','2020-02-20 02:59:00', '2020-02-20 14:59:00');

SELECT * FROM news;