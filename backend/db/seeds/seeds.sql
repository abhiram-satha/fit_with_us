INSERT INTO users(email, password, username, current_weight, goal_weight, height, age, gender) VALUES ('test123@123.com', '$2a$10$6/gff9POlthCUx.E3wXtm.uQYRhUplOeoi7uKk52ga8qD3VE6WPvS', 'LoseWeightWithMe', 200, 150, 180, 25,null);
INSERT INTO users(email, password, username, current_weight, goal_weight, height, age, gender) VALUES ('test123@1234.com', '$2a$10$6/gff9POlthCUx.E3wXtm.uQYRhUplOeoi7uKk52ga8qD3VE6WPvS', 'Foodie', 200, 150, 180, 25,null);
INSERT INTO users(email, password, username, current_weight, goal_weight, height, age, gender) VALUES ('test123@12345.com', '$2a$10$6/gff9POlthCUx.E3wXtm.uQYRhUplOeoi7uKk52ga8qD3VE6WPvS', 'Luv2Eat', 120, 150, 180, 25,null);


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


INSERT INTO badges(name, img_url, description) VALUES ('High Fiver', 'https://icon-library.com/images/5-icon/5-icon-7.jpg', 'This badge is earned by logging in a total of 5 weights! Hoping you keep up your journey with Fit With Us!');
INSERT INTO badges(name, img_url, description) VALUES ('Tens!', 'https://icon-library.com/images/number-10-icon/number-10-icon-26.jpg', 'This badge is earned by logging in a total of 10 weights! Thank you for your commitment with Fit With Us! We are excited for your journey and hope you reach your goal!');
INSERT INTO badges(name, img_url, description) VALUES ('Chatter', 'https://cdn-icons-png.flaticon.com/512/953/953810.png', 'This badge is earned by making a total of 20 comments or posts. Thank you for being an active member of the community! Sharing your journey or showing support within the community is always a great feeling!');
INSERT INTO badges(name, img_url, description) VALUES ('Weight', 'https://cdn4.iconfinder.com/data/icons/kitchen-tools-line/32/Weighing-scale_Weight_Scale-512.png', 'This badge is earned by losing 10 pounds or more. Thank you for being an active member of the community! Sharing your journey or showing support within the community is always a great feeling!');