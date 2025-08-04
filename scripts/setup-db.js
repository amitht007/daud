// import sqlite3 from "sqlite3"
// import fs from "fs"
const sqlite3=require("sqlite3").verbose();

// Open (or create) the database
const db = new sqlite3.Database('./database.db');

// Your entire schema + insert script
const schema = `
-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(20) PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'majdoor' CHECK (role IN ('maalik', 'majdoor')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- EMAILS TABLE
CREATE TABLE IF NOT EXISTS emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email_id VARCHAR(100) UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_emails_email_id ON emails(email_id);

-- REQUEST ITEM LIST TABLE
CREATE TABLE IF NOT EXISTS requests_item_list (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item TEXT NOT NULL,
    user_id VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_requests_item ON requests_item_list(item);
CREATE INDEX IF NOT EXISTS idx_requests_user_id ON requests_item_list(user_id);
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests_item_list(status);

-- Insert sample data
INSERT OR IGNORE INTO users (id, email, password_hash, role)
VALUES ('234', 'amitht007@gmail.com', '123', 'maalik');

INSERT INTO emails (email_id)
VALUES ('amitht007@gmail.com'),('tom@gmail.com');

INSERT OR IGNORE INTO requests_item_list (item, user_id, status)
VALUES ('req001', 'u123', 'pending');
`;

// Run all the SQL statements
db.exec(schema, (err) => {
  if (err) {
    console.error("Error initializing database:", err.message);
  } else {
    console.log("Database initialized successfully!");
  }
  db.close();
});
