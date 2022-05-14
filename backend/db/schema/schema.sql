DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS weights CASCADE;
DROP TABLE IF EXISTS badge CASCADE;
DROP TABLE IF EXISTS user_badge CASCADE;
DROP TABLE IF EXISTS post CASCADE;
DROP TABLE IF EXISTS comment CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(80) NOT NULL,
    username VARCHAR(30) NOT NULL UNIQUE,
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
    message TEXT,
    date TIMESTAMP NOT NULL
);

CREATE TABLE comment (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER REFERENCES post(id) ON DELETE CASCADE,
    message TEXT,
    date TIMESTAMP NOT NULL
)