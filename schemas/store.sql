-- Drop the table if it already exists
DROP TABLE IF EXISTS rate_limits;

-- Create the rate_limits table if it does not exist
CREATE TABLE IF NOT EXISTS rate_limits (
    key TEXT PRIMARY KEY,   -- The identifier for a client, with a prefix
    totalHits INTEGER NOT NULL,  -- The total number of hits
    resetTime INTEGER NOT NULL   -- The time when the hit counter resets (in milliseconds)
);

-- Optionally, insert initial data if needed (example)
INSERT INTO rate_limits (key, totalHits, resetTime) VALUES ('rl_someclient', 0, 0);
