DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS weights CASCADE;
DROP TABLE IF EXISTS badge CASCADE;
DROP TABLE IF EXISTS user_badge CASCADE;
DROP TABLE IF EXISTS post CASCADE;
DROP TABLE IF EXISTS comment CASCADE;
DROP TABLE IF EXISTS dietary_restrictions CASCADE;
DROP TABLE IF EXISTS user_restrictions CASCADE;
DROP TABLE IF EXISTS recipe_category CASCADE;
DROP TABLE IF EXISTS user_preferences CASCADE;


CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(90) NOT NULL,
    username VARCHAR(30) NOT NULL UNIQUE,
    current_weight INTEGER NOT NULL,
    goal_weight INTEGER NOT NULL,
    height INTEGER NOT NULL,
    age INTEGER NOT NULL,
    gender VARCHAR(15)
);

CREATE TABLE weights (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    date TIMESTAMP NOT NULL,
    weight INTEGER NOT NULL
);

CREATE TABLE badge (
    id SERIAL PRIMARY KEY NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE user_badge (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    badge_id INTEGER REFERENCES badge(id) ON DELETE CASCADE
);

CREATE TABLE post (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    message TEXT,
    date TIMESTAMP NOT NULL
);

CREATE TABLE comment (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER REFERENCES post(id) ON DELETE CASCADE,
    message TEXT,
    date TIMESTAMP NOT NULL
);

CREATE TABLE dietary_restrictions (
    id SERIAL PRIMARY KEY NOT NULL,
   restriction TEXT NOT NULL
);


CREATE TABLE user_restrictions (
    id SERIAL PRIMARY KEY NOT NULL,
   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
   dietary_restrictions_id INTEGER REFERENCES dietary_restrictions(id) ON DELETE CASCADE
);

CREATE TABLE recipe_category (
    id SERIAL PRIMARY KEY NOT NULL,
   category TEXT NOT NULL
);

CREATE TABLE user_preferences (
    id SERIAL PRIMARY KEY NOT NULL,
   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
   recipe_category_id INTEGER REFERENCES recipe_category(id) ON DELETE CASCADE
);

CREATE TABLE badges (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL,
    img_url VARCHAR(500) NOT NULL
);