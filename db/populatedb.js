// Fake data seeding for development
require("dotenv").config();

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR ( 255 )
);

INSERT INTO usernames (username)
VALUES
    ('Bryan'),
    ('Odin'),
    ('Damon');
`;

async function main() {
    console.log("seeding..");
    const client = new Client({
        connectionString: `postgresql://${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_NAME}`,
    });

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();
