-- Drop the table if it already exists
DROP TABLE IF EXISTS users;

-- Create the users table if it does not exist
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,   -- is
    username VARCHAR(512) NOT NULL,  -- usernames
    password VARCHAR(512) NOT NULL   -- passwords
);