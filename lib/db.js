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
        role VARCHAR(20) DEFAULT 'majdoor' CHECK (role IN ('maalik', 'majdoor')),
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
  // }
};

// Initialize the database on import
initializeDatabase();

// Insert sample data if users table is empty
const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
if (userCount.count === 0) {
  console.log('Inserting sample data...');
  
  // Insert sample user (you should hash the password properly)
  const bcrypt = require('bcryptjs');
  const hashedPassword = bcrypt.hashSync('password123', 10);
  
  dbOperations.createUser.run('u123', 'amith@example.com', hashedPassword, 'maalik');
  
  // Insert sample email
  dbOperations.insertEmail.run('support@example.com');
  
  // Insert sample request
  dbOperations.createRequest.run('{"request_id":"req001"}', 'u123', 'pending');
  
  console.log('Sample data inserted successfully');
}

module.exports = {
  db,
  dbOperations,
  dbHelpers
};