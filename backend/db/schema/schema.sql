DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS weights CASCADE;
DROP TABLE IF EXISTS badge CASCADE;
DROP TABLE IF EXISTS user_badge CASCADE;
DROP TABLE IF EXISTS post CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    username VARCHAR(30) NOT NULL,
    current_weight INTEGER NOT NULL,
    goal_weight INTEGER NOT NULL,
    height INTEGER NOT NULL,
    age INTEGER NOT NULL,
    gender VARCHAR(15),
    dietary_restrictions TEXT
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
    parent_id INTEGER,
    message TEXT,
    date TIMESTAMP NOT NULL
);