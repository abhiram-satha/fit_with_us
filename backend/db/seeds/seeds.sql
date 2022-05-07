INSERT INTO users(email, password, username, current_weight, goal_weight, height, age, gender, dietary_restrictions) VALUES ('test123@123.com', 'test123', 'LoseWeightWithMe', 200, 150, 180, 25,null, 'Chicken');
INSERT INTO users(email, password, username, current_weight, goal_weight, height, age, gender, dietary_restrictions) VALUES ('test123@1234.com', 'test123', 'Foodie', 200, 150, 180, 25,null, 'Chicken');


INSERT INTO weights(user_id, date, weight) VALUES (1, '2022-04-21', 135);
INSERT INTO weights(user_id, date, weight) VALUES (1, '2022-04-28', 150);
INSERT INTO weights(user_id, date, weight) VALUES (1, '2022-05-01', 140);
INSERT INTO weights(user_id, date, weight) VALUES (2, '2022-05-02', 135);
INSERT INTO weights(user_id, date, weight) VALUES (2, '2022-05-03', 150);
INSERT INTO weights(user_id, date, weight) VALUES (2, '2022-05-04', 140);

INSERT INTO post(user_id, message, date) VALUES (1, 'I lost 5 pounds', '2022-05-01');
INSERT INTO post(user_id, message, date) VALUES (2, 'I need some encouragement', '2022-05-01');

INSERT INTO comment(user_id, post_id, message, date) VALUES (2, 1, 'OMG Congrats','2022-05-01');
INSERT INTO comment(user_id, post_id, message, date) VALUES (1, 2, 'You got this','2022-05-02');