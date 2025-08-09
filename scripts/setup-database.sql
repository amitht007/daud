-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(20) PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index on email (already unique, but just for clarity)
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email);


-- EMAILS TABLE
CREATE TABLE IF NOT EXISTS emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email_id VARCHAR(100) UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index on email_id
CREATE UNIQUE INDEX IF NOT EXISTS idx_emails_email_id ON emails(email_id);


-- REQUEST ITEM LIST TABLE
CREATE TABLE IF NOT EXISTS requests_item_list (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    request_item_id VARCHAR(20) UNIQUE NOT NULL,
    user_id VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE UNIQUE INDEX IF NOT EXISTS idx_requests_request_item_id ON requests_item_list(request_item_id);
CREATE INDEX IF NOT EXISTS idx_requests_user_id ON requests_item_list(user_id);
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests_item_list(status);


-- Insert into users
INSERT INTO users (id, email, password_hash, role)
VALUES ('u123', 'amitht007@gmail.com.com', '123', 'admin');

-- Insert into emails
INSERT INTO emails (email_id)
VALUES ('support@example.com');

-- Insert into requests_item_list
INSERT INTO requests_item_list (request_item_id, user_id, status)
VALUES ('req001', 'u123', 'pending');
