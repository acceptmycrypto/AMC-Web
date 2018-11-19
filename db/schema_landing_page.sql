
USE crypto_db;
DROP TABLE landing_users_cryptos;
DROP TABLE landing_cryptos;
DROP TABLE landing_users;


CREATE TABLE landing_cryptos(
	id INT NOT NULL AUTO_INCREMENT,
	crypto_name VARCHAR(255) NOT NULL UNIQUE,
    crypto_symbol VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY (id)
);

CREATE TABLE landing_users(
	id INT NOT NULL AUTO_INCREMENT,
	email VARCHAR(100) NOT NULL UNIQUE,
	PRIMARY KEY (id)
);


CREATE TABLE landing_users_cryptos(
    id INT NOT NULL AUTO_INCREMENT,
    landing_users_id INT NOT NULL,
    landing_cryptos_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (landing_users_id) REFERENCES landing_users(id),
    FOREIGN KEY (landing_cryptos_id) REFERENCES landing_cryptos(id)
  );

CREATE TABLE vendor_subscription (
	id INT NOT NULL AUTO_INCREMENT,
	vendor_email VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY (id)

);