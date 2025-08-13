// Load environment variables from .env file
require('dotenv').config();
const bcrypt = require("bcryptjs");

module.exports = async function(db) {
  // Create collections if they don't exist
  await db.createCollection("users");
  await db.createCollection("emails");
  await db.createCollection("requests_item_list");
  await db.createCollection("gitlab_project_requests");

  // Create indexes
  await db.collection("users").createIndex({ email: 1 }, { unique: true });
  await db.collection("emails").createIndex({ email_id: 1 }, { unique: true });
  await db.collection("requests_item_list").createIndex({ item: 1 }, { unique: true });
  await db.collection("requests_item_list").createIndex({ user_id: 1 });
  await db.collection("requests_item_list").createIndex({ status: 1 });

  // Hash the admin password
  const adminPassword = "123";
  const adminPasswordHash = bcrypt.hashSync(adminPassword, 10);

  // Insert sample user (admin)
  await db.collection("users").updateOne(
    { email: "amitht007@gmail.com" },
    {
      $setOnInsert: {
        email: "amitht007@gmail.com",
        password_hash: adminPasswordHash,
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      }
    },
    { upsert: true }
  );

  // Insert sample emails
  await db.collection("emails").updateOne(
    { email_id: "amitht007@gmail.com" },
    { $setOnInsert: { email_id: "amitht007@gmail.com", created_at: new Date(), updated_at: new Date() } },
    { upsert: true }
  );
  await db.collection("emails").updateOne(
    { email_id: "tom@gmail.com" },
    { $setOnInsert: { email_id: "tom@gmail.com", created_at: new Date(), updated_at: new Date() } },
    { upsert: true }
  );

  // Create gitlab_project_requests indexes
  await db.collection("gitlab_project_requests").createIndex({ email: 1 });
  await db.collection("gitlab_project_requests").createIndex({ status: 1 });

  console.log("MongoDB initialization completed!");
};

// Add this block to make the script runnable directly
if (require.main === module) {
  const { MongoClient } = require("mongodb");
  const uri = process.env.MONGODB_URI;
  console.log("MONGODB_URI:", process.env.MONGODB_URI);
  console.log("Final URI:", uri);
  
  if (!uri) {
    console.error("Error: MONGODB_URI or MONGO_URI environment variable is not set!");
    console.error("Please set it with: set MONGODB_URI=your_connection_string");
    process.exit(1);
  }
  const dbName = "ssi"; // Change to your DB name - FIXED: Added semicolon

  (async () => {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const db = client.db(dbName);
      await module.exports(db);
      console.log("Migration completed.");
    } catch (err) {
      console.error("Migration failed:", err);
    } finally {
      await client.close();
    }
  })();
}