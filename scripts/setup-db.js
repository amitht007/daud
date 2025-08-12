// import sqlite3 from "sqlite3"
// import fs from "fs"
const Database = require("better-sqlite3");
const bcrypt = require("bcryptjs"); // Add bcryptjs

// Hash the admin password synchronously
const adminPassword = "123";
const adminPasswordHash = bcrypt.hashSync(adminPassword, 10);

// Open (or create) the database
const db = new Database('./database.db');

// Create gitlab_project_requests table if it doesn't exist
db.exec(`CREATE TABLE IF NOT EXISTS gitlab_project_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  group_name TEXT NOT NULL,
  group_id TEXT,
  description TEXT,
  project_name TEXT NOT NULL,
  maintainers TEXT,
  developers TEXT,
  techStack TEXT,
  tags TEXT,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  approved_by TEXT,
  approved_at DATETIME,
  rejected_by TEXT,
  rejected_at DATETIME,
  rejection_reason TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`);

const schema = `
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(20) PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email);

CREATE TABLE IF NOT EXISTS emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email_id VARCHAR(100) UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_emails_email_id ON emails(email_id);

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
`;

db.exec(schema);

// Insert sample data with hashed password
db.prepare(
  `INSERT OR IGNORE INTO users (id, email, password_hash, role)
   VALUES (?, ?, ?, ?)`
).run('234', 'amitht007@gmail.com', adminPasswordHash, 'admin');

// Insert emails
db.prepare(
  `INSERT OR IGNORE INTO emails (email_id) VALUES (?)`
).run('amitht007@gmail.com');
db.prepare(
  `INSERT OR IGNORE INTO emails (email_id) VALUES (?)`
).run('tom@gmail.com');

// Insert request item
db.prepare(
  `INSERT OR IGNORE INTO requests_item_list (item, user_id, status)
   VALUES (?, ?, ?)`
).run('req001', 'u123', 'pending');

console.log("Database initialized successfully!");
db.close();