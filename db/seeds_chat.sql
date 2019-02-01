CREATE TABLE chat_sessions(
	id INT NOT NULL AUTO_INCREMENT,
  deal_id INT NOT NULL,
	buyer_id INT NOT NULL,
	seller_id INT NOT NULL,
  chat_status VARCHAR (10) DEFAULT 'normal',
  deleted_id INT DEFAULT 0,
	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (buyer_id) REFERENCES users(id),
	FOREIGN KEY (seller_id) REFERENCES users(id),
  FOREIGN KEY (deal_id) REFERENCES deals(id)
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

INSERT INTO chat_sessions (deal_id, buyer_id, seller_id) VALUES
(1, 2, 1),
(1, 3, 1);

-- INSERT INTO chat_messages (chat_session_id, message, message_owner_id) VALUES
-- (7, "hi, is it still available?", 2),
-- (7, "Yes!", 1);