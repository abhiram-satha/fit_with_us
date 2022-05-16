INSERT INTO users(email, password, username, current_weight, goal_weight, height, age, gender) VALUES ('test123@123.com', 'test123', 'LoseWeightWithMe', 200, 150, 180, 25,null);
INSERT INTO users(email, password, username, current_weight, goal_weight, height, age, gender) VALUES ('test123@1234.com', 'test123', 'Foodie', 200, 150, 180, 25,null);
INSERT INTO users(email, password, username, current_weight, goal_weight, height, age, gender) VALUES ('test123@12345.com', 'test123', 'Luv2Eat', 120, 150, 180, 25,null);


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


INSERT INTO dietary_restrictions(restriction) VALUES ('None');
INSERT INTO dietary_restrictions(restriction) VALUES ('Dairy-Free');
INSERT INTO dietary_restrictions(restriction) VALUES ('Egg-Free');
INSERT INTO dietary_restrictions(restriction) VALUES ('Peanut-Free');
INSERT INTO dietary_restrictions(restriction) VALUES ('Fish-Free');

INSERT INTO user_restrictions(user_id, dietary_restrictions_id) VALUES (1,1);
INSERT INTO user_restrictions(user_id, dietary_restrictions_id) VALUES (1,2);
INSERT INTO user_restrictions(user_id, dietary_restrictions_id) VALUES (1,3);

INSERT INTO recipe_category(category) VALUES ('chicken');
INSERT INTO recipe_category(category) VALUES ('fish');
INSERT INTO recipe_category(category) VALUES ('beef');
INSERT INTO recipe_category(category) VALUES ('pork');
INSERT INTO recipe_category(category) VALUES ('vegetarian');
INSERT INTO recipe_category(category) VALUES ('vegan');

INSERT INTO user_preferences(user_id, recipe_category_id) VALUES (1, 1);
INSERT INTO user_preferences(user_id, recipe_category_id) VALUES (1, 2);
INSERT INTO user_preferences(user_id, recipe_category_id) VALUES (1, 4);


INSERT INTO badges(name, img_url) VALUES ('High Fiver', 'https://cdn-icons.flaticon.com/png/512/676/premium/676066.png?token=exp=1652664042~hmac=c0796700b96bbb147fc882b76ed7edf8');
INSERT INTO badges(name, img_url) VALUES ('Tens!', 'https://cdn-icons.flaticon.com/png/512/6198/premium/6198527.png?token=exp=1652664108~hmac=06da73e75a1f0baaf7561042d314418a');
INSERT INTO badges(name, img_url) VALUES ('Chatter', 'https://cdn-icons-png.flaticon.com/512/953/953810.png');