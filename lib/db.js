// lib/db.js
const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'database.db');
let db;

function initializeDatabase() {
  db = new Database(dbPath);
  db.pragma('foreign_keys = ON');

  // User Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(20) PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Emails Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS emails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email_id VARCHAR(100) UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Request Item List Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS requests_item_list (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item TEXT NOT NULL,
        user_id VARCHAR(100) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // GitLab Project Requests Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS gitlab_project_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email VARCHAR(100) NOT NULL,
      group_name VARCHAR(255) NOT NULL,
      group_id VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      project_name VARCHAR(255) NOT NULL,
      status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      reviewed_by VARCHAR(100),
      reviewed_at DATETIME
    );
  `);

  console.log('Database initialized successfully');
}

initializeDatabase();

const dbOperations = {
  // User operations
  createUser: db.prepare(`
    INSERT INTO users (id, email, password_hash, role)
    VALUES (?, ?, ?, ?)
  `),
  getUserByEmail: db.prepare(`
    SELECT * FROM users WHERE email = ?
  `),
  getUserById: db.prepare(`
    SELECT * FROM users WHERE id = ?
  `),
  updateUserPassword: db.prepare(`
    UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `),

  // Email operations
  insertEmail: db.prepare(`
    INSERT INTO emails (email_id) VALUES (?)
  `),
  getEmailById: db.prepare(`
    SELECT * FROM emails WHERE email_id = ?
  `),

  // Request operations
  createRequest: db.prepare(`
    INSERT INTO requests_item_list (item, user_id, status)
    VALUES (?, ?, ?)
  `),
  getRequestsByUserId: db.prepare(`
    SELECT * FROM requests_item_list WHERE user_id = ?
  `),
  updateRequestStatus: db.prepare(`
    UPDATE requests_item_list SET status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE item = ?
  `),
  getAllRequests: db.prepare(`
    SELECT r.*, u.email, u.role
    FROM requests_item_list r
    JOIN users u ON r.user_id = u.id
  `),
  getRequestsByStatus: db.prepare('SELECT * FROM requests_item_list WHERE status = ?'),

  // GitLab Project Request Operations
  createGitlabProjectRequest: db.prepare(`
    INSERT INTO gitlab_project_requests (email, group_name, group_id, description, project_name, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
  `),
  getPendingGitlabProjectRequests: db.prepare(`
    SELECT * FROM gitlab_project_requests WHERE status = 'pending' ORDER BY created_at DESC
  `),
  updateGitlabProjectRequestStatus: db.prepare(`
    UPDATE gitlab_project_requests SET status = ?, reviewed_by = ?, reviewed_at = ? WHERE id = ?
  `),
  getGitlabProjectRequestById: db.prepare(`
    SELECT * FROM gitlab_project_requests WHERE id = ?
  `),
   getGitlabProjectRequestsByStatus: db.prepare('SELECT * FROM gitlab_project_requests WHERE status = ?'),
};

function getDB() {
  if (!db) {
    initializeDatabase();
  }
  return db;
}

module.exports = {
  getDB,
  dbOperations,
};