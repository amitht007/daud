import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

let db: Db;

export async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db("ssi");
  }
  return db;
}
