DROP TABLE IF EXISTS links;
CREATE TABLE IF NOT EXISTS links (id VARCHAR(8) PRIMARY KEY, src TEXT NOT NULL, curl TEXT NOT NULL);
INSERT INTO links (id, src, curl) VALUES ('ggl', 'https://google.com', 'https://dry.nl.eu.org/ggl');

