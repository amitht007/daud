// lib/db.js
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = process.env.DATABASE_PATH || './database.db';
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database with your schema
function initializeDatabase() {
  // USERS TABLE
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(20) PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email);
  `);

  // EMAILS TABLE
  db.exec(`
    CREATE TABLE IF NOT EXISTS emails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email_id VARCHAR(100) UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE UNIQUE INDEX IF NOT EXISTS idx_emails_email_id ON emails(email_id);
  `);

  // REQUEST ITEM LIST TABLE
  db.exec(`
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
  `);

  // GITLAB PROJECT REQUESTS TABLE
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
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('Database initialized successfully');
}

// Prepared statements
const dbOperations = {
  // User
  createUser: db.prepare(`INSERT INTO users (id, email, password_hash, role) VALUES (?, ?, ?, ?)`),
  getUserByEmail: db.prepare(`SELECT * FROM users WHERE email = ?`),
  getUserById: db.prepare(`SELECT * FROM users WHERE id = ?`),
  updateUserPassword: db.prepare(`UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`),

  // Email
  insertEmail: db.prepare(`INSERT INTO emails (email_id) VALUES (?)`),
  getEmailById: db.prepare(`SELECT * FROM emails WHERE email_id = ?`),

  // Requests
  createRequest: db.prepare(`INSERT INTO requests_item_list (item, user_id, status) VALUES (?, ?, ?)`),
  getRequestsByUserId: db.prepare(`SELECT * FROM requests_item_list WHERE user_id = ?`),
  updateRequestStatus: db.prepare(`UPDATE requests_item_list SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE item = ?`),
  getAllRequests: db.prepare(`
    SELECT r.*, u.email, u.role 
    FROM requests_item_list r 
    JOIN users u ON r.user_id = u.id
  `),

  // GitLab Project Requests
  createGitlabProjectRequest: db.prepare(`
    INSERT INTO gitlab_project_requests (email, group_name, group_id, description, project_name, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `),
  getPendingGitlabProjectRequests: db.prepare(`SELECT * FROM gitlab_project_requests WHERE status = 'pending' ORDER BY created_at DESC`),
  updateGitlabProjectRequestStatus: db.prepare(`UPDATE gitlab_project_requests SET status = ?, updated_at = datetime('now') WHERE id = ?`),
  getGitlabProjectRequestById: db.prepare(`SELECT * FROM gitlab_project_requests WHERE id = ?`)
};

// Helper methods
const dbHelpers = {
  // Email search across users & emails table
  searchEmailsByQuery(query) {
    try {
      const userEmails = db.prepare('SELECT email FROM users WHERE email LIKE ? LIMIT 10')
        .all(`%${query}%`).map(r => r.email);
      const extraEmails = db.prepare('SELECT email_id as email FROM emails WHERE email_id LIKE ? LIMIT 10')
        .all(`%${query}%`).map(r => r.email);
      return Array.from(new Set([...userEmails, ...extraEmails]));
    } catch (err) {
      console.error('[DB] searchEmailsByQuery error:', err);
      return [];
    }
  },

  // Requests
  createRequest(request) {
    return dbOperations.createRequest.run(
      request.item,
      request.user_id,
      request.status || 'pending'
    );
  },
  getRequestsByUserId(userId) {
    return dbOperations.getRequestsByUserId.all(userId);
  },
  getRequestsByStatus(status) {
    return db.prepare('SELECT * FROM requests_item_list WHERE status = ?').all(status);
  },

  // GitLab Project Requests
  createGitlabProjectRequest(data) {
    const result = dbOperations.createGitlabProjectRequest.run(
      data.email,
      data.group_name,
      data.group_id,
      data.description,
      data.project_name,
      data.status || 'pending'
    );
    if (result.lastInsertRowid) {
      return db.prepare('SELECT * FROM gitlab_project_requests WHERE id = ?').get(result.lastInsertRowid);
    }
    return null;
  },
  getGitlabProjectRequestsByStatus(status) {
    if (status === 'all') {
      return db.prepare('SELECT * FROM gitlab_project_requests ORDER BY created_at DESC').all();
    }
    return db.prepare('SELECT * FROM gitlab_project_requests WHERE status = ? ORDER BY created_at DESC').all(status);
  },
  updateGitlabProjectRequestStatus(id, status) {
    return dbOperations.updateGitlabProjectRequestStatus.run(status, id);
  },
  getGitlabProjectRequestById(id) {
    return dbOperations.getGitlabProjectRequestById.get(id);
  }
};

// Init DB
initializeDatabase();

// Sample seed data
const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
if (userCount.count === 0) {
  console.log('Inserting sample data...');
  dbOperations.createUser.run('u123', 'amith@example.com', 'password123', 'admin');
  dbOperations.insertEmail.run('support@example.com');
  dbOperations.createRequest.run('{"request_id":"req001"}', 'u123', 'pending');
  console.log('Sample data inserted successfully');
}

module.exports = { db, dbOperations, dbHelpers };
