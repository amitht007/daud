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
  `);

  // Index on email
  db.exec(`
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
  `);

  // Index on email_id
  db.exec(`
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
  `);

  // Indexes for performance
  db.exec(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_requests_item ON requests_item_list(item);
  `);
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_requests_user_id ON requests_item_list(user_id);
  `);
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_requests_status ON requests_item_list(status);
  `);

  console.log('Database initialized successfully');
}

// Database operations

const createGitlabProjectRequest = db.prepare(`
  INSERT INTO gitlab_project_requests (email, group, groupId, description, projectName, status, createdAt)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`).run.bind(
  db.prepare(`
    INSERT INTO gitlab_project_requests (email, group, groupId, description, projectName, status, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)
);

const getPendingGitlabProjectRequests = db.prepare(`
  SELECT * FROM gitlab_project_requests WHERE status = 'pending' ORDER BY createdAt DESC
`).all.bind(
  db.prepare(`
    SELECT * FROM gitlab_project_requests WHERE status = 'pending' ORDER BY createdAt DESC
  `)
);

const updateGitlabProjectRequestStatus = db.prepare(`
  UPDATE gitlab_project_requests SET status = ?, reviewedBy = ?, reviewedAt = ? WHERE id = ?
`).run.bind(
  db.prepare(`
    UPDATE gitlab_project_requests SET status = ?, reviewedBy = ?, reviewedAt = ? WHERE id = ?
  `)
);

const getGitlabProjectRequestById = db.prepare(`
  SELECT * FROM gitlab_project_requests WHERE id = ?
`).get.bind(
  db.prepare(`
    SELECT * FROM gitlab_project_requests WHERE id = ?
  `)
);

exports.dbOperations = {
  // ...existing code...
  createGitlabProjectRequest: ({ email, group, groupId, description, projectName, status, createdAt }) =>
    createGitlabProjectRequest(email, group, groupId, description, projectName, status, createdAt),
  getPendingGitlabProjectRequests: () => getPendingGitlabProjectRequests(),
  updateGitlabProjectRequestStatus: ({ id, status, reviewedBy, reviewedAt }) =>
    updateGitlabProjectRequestStatus(status, reviewedBy, reviewedAt, id),
  getGitlabProjectRequestById: (id) => getGitlabProjectRequestById(id),
  // ...existing code...
};
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

  // --- GitLab Project Request Operations ---
  createGitlabProjectRequest: db.prepare(`
    INSERT INTO gitlab_project_requests (email, group, groupId, description, projectName, status, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `),

  getPendingGitlabProjectRequests: db.prepare(`
    SELECT * FROM gitlab_project_requests WHERE status = 'pending' ORDER BY createdAt DESC
  `),

  updateGitlabProjectRequestStatus: db.prepare(`
    UPDATE gitlab_project_requests SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?
  `),

  getGitlabProjectRequestById: db.prepare(`
    SELECT * FROM gitlab_project_requests WHERE id = ?
  `)
};

// Helper for requests
const dbHelpers = {
  createRequest: (request) => {
    console.log('[DB] createRequest called with:', request);
    console.log('[DB] Preparing to insert into requests_item_list...');
    const result = dbOperations.createRequest.run(
      request.item,
      request.user_id,
      request.status || 'pending'
    );
    console.log('[DB] Insert result:', result);
    return result;
  },
  getRequestsByUserId: (userId) => {
    console.log('[DB] getRequestsByUserId called with:', userId);
    const result = dbOperations.getRequestsByUserId.all(userId);
    console.log('[DB] getRequestsByUserId result:', result);
    return result;
  },
  getRequestsByStatus: (status) => {
    console.log('[DB] getRequestsByStatus called with:', status);
    const result = db.prepare('SELECT * FROM requests_item_list WHERE status = ?').all(status);
    console.log('[DB] getRequestsByStatus result:', result);
    return result;
  },
  // logAction: (...args) => {
  //   // Only log, do not return console.log(...)
  //   console.log('[DB] logAction called with:', args);
  //   // Remove return value entirely to avoid TypeError
  // },

  // --- GitLab Project Request Helpers ---
  createGitlabProjectRequest: (data) => {
    // data: { email, group, groupId, description, projectName, status }
    try {
      const result = db.prepare(
        `INSERT INTO gitlab_project_requests (email, group_name, group_id, description, project_name, status, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`
      ).run(
        data.email,
        data.group,
        data.groupId,
        data.description,
        data.projectName,
        data.status || 'pending'
      );
      console.log('[DB] createGitlabProjectRequest result:', result);
      return result;
    } catch (err) {
      console.error('[DB] createGitlabProjectRequest error:', err);
      throw err;
    }
  },
  getGitlabProjectRequestsByStatus: (status) => {
    try {
      const result = db.prepare('SELECT * FROM gitlab_project_requests WHERE status = ?').all(status);
      return result;
    } catch (err) {
      console.error('[DB] getGitlabProjectRequestsByStatus error:', err);
      return [];
    }
  },
  updateGitlabProjectRequestStatus: (id, status) => {
    try {
      const result = db.prepare('UPDATE gitlab_project_requests SET status = ? WHERE id = ?').run(status, id);
      return result;
    } catch (err) {
      console.error('[DB] updateGitlabProjectRequestStatus error:', err);
      throw err;
    }
  },
  getGitlabProjectRequestById: (id) => {
    try {
      const result = db.prepare('SELECT * FROM gitlab_project_requests WHERE id = ?').get(id);
      return result;
    } catch (err) {
      console.error('[DB] getGitlabProjectRequestById error:', err);
      return null;
    }
  },
};

// Export helpers
module.exports = {
  ...dbHelpers,
  dbHelpers,
  dbOperations,
  db,
};

// Add GitLab project requests table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS gitlab_project_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(100) NOT NULL,
    group VARCHAR(255) NOT NULL,
    groupId VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    projectName VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Initialize the database on import
initializeDatabase();

// Insert sample data if users table is empty
const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
if (userCount.count === 0) {
  console.log('Inserting sample data...');
  
  // Insert sample user (you should hash the password properly)
  dbOperations.createUser.run('u123', 'amith@example.com', /*hashedPassword*/ 'password123', 'admin');
  
  // Insert sample email
  dbOperations.insertEmail.run('support@example.com');
  
  // Insert sample request
  dbOperations.createRequest.run('{"request_id":"req001"}', 'u123', 'pending');
  
  console.log('Sample data inserted successfully');
}

// Commented out bcrypt import and usage
// const bcrypt = require('bcryptjs');
// const hashedPassword = bcrypt.hashSync('password123', 10);

module.exports = {
  db,
  dbOperations,
  dbHelpers
};