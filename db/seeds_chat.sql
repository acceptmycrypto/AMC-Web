INSERT INTO chat_sessions (deal_id, buyer_id, seller_id) VALUES
(1, 2, 1),
(1, 3, 1);

INSERT INTO chat_messages (chat_session_id, messsage, message_owner_id) VALUES
(7, "hi, is it still available?", 2),
(7, "Yes!", 1);