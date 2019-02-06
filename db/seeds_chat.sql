CREATE TABLE chat_sessions(
	id INT NOT NULL AUTO_INCREMENT,
  deal_id INT NOT NULL,
  session_status VARCHAR (10) DEFAULT 'normal',
	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
  FOREIGN KEY (deal_id) REFERENCES deals(id)
);

CREATE TABLE chat_session_participants(
	id INT NOT NULL AUTO_INCREMENT,
  chat_session_id INT NOT NULL,
  user_id INT NOT NULL,
  seller_id INT NOT NULL,
  buyer_id INT NOT NULL,
  participant_status VARCHAR (10) DEFAULT 'normal',
	date_joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  message_read BOOLEAN NOT NULL DEFAULT TRUE,
	PRIMARY KEY (id),
  FOREIGN KEY (chat_session_id) REFERENCES chat_sessions(id),
	FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (seller_id) REFERENCES users(id),
  FOREIGN KEY (buyer_id) REFERENCES users(id)
);

CREATE TABLE chat_messages(
	id INT NOT NULL AUTO_INCREMENT,
	chat_session_id INT NOT NULL,
	message VARCHAR(255) NOT NULL,
	date_message_sent TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  message_owner_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (chat_session_id) REFERENCES chat_sessions(id)
);

INSERT INTO chat_sessions (deal_id) VALUES
(37), (38), (39);

INSERT INTO chat_session_participants (chat_session_id, user_id, seller_id, buyer_id) VALUES
(1, 1, 1, 2),
(1, 2, 1, 2);

-- INSERT INTO chat_messages (chat_session_id, message, message_owner_id) VALUES
-- (7, "hi, is it still available?", 2),
-- (7, "Yes!", 1);