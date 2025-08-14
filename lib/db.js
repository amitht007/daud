import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "devops-secops";
let client;
let db;

export async function getDB() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
  }
  return db;
}

export const dbHelpers = {
  // Email search across users & emails collection
  async searchEmailsByQuery(query) {
    const db = await getDB();
    const userEmails = await db.collection("users")
      .find({ email: { $regex: query, $options: "i" } })
      .limit(10)
      .project({ email: 1, _id: 0 })
      .toArray();
    const extraEmails = await db.collection("emails")
      .find({ email_id: { $regex: query, $options: "i" } })
      .limit(10)
      .project({ email_id: 1, _id: 0 })
      .toArray();
    return Array.from(new Set([
      ...userEmails.map(r => r.email),
      ...extraEmails.map(r => r.email_id)
    ]));
  },

  // Requests
  async createRequest(request) {
    const db = await getDB();
    const res = await db.collection("requests_item_list").insertOne({
      item: request.item,
      user_id: request.user_id,
      status: request.status || "pending",
      created_at: new Date(),
      updated_at: new Date()
    });
    return res.insertedId;
  },
  async getRequestsByUserId(userId) {
    const db = await getDB();
    return db.collection("requests_item_list").find({ user_id: userId }).toArray();
  },
  async getRequestsByStatus(status) {
    const db = await getDB();
    return db.collection("requests_item_list").find({ status }).toArray();
  },
  async updateRequestStatus(requestId, status, adminId, rejectionReason) {
    const db = await getDB();
    const res = await db.collection("requests_item_list").findOneAndUpdate(
      { _id: new ObjectId(requestId) },
      {
        $set: {
          status,
          rejectionReason: rejectionReason || null,
          updated_at: new Date(),
          reviewed_by: adminId
        }
      },
      { returnDocument: "after" }
    );
    return res.value;
  },
  async getAllRequests() {
    const db = await getDB();
    return db.collection("requests_item_list").aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "id",
          as: "user"
        }
      }
    ]).toArray();
  },

  // GitLab Project Requests
  async createGitlabProjectRequest(data) {
    const db = await getDB();
    const res = await db.collection("gitlab_project_requests").insertOne({
      email: data.email,
      group_name: data.group_name,
      group_id: data.group_id,
      description: data.description,
      project_name: data.project_name,
      status: data.status || "pending",
      maintainers: data.maintainers || [],
      developers: data.developers || [],
      techStack: data.techStack || "",
      tags: data.tags || [],
      created_at: new Date(),
      updated_at: new Date()
    });
    return db.collection("gitlab_project_requests").findOne({ _id: res.insertedId });
  },
  async getGitlabProjectRequestsByStatus(status) {
    const db = await getDB();
    if (status === "all") {
      return db.collection("gitlab_project_requests").find({}).sort({ created_at: -1 }).toArray();
    }
    return db.collection("gitlab_project_requests").find({ status }).sort({ created_at: -1 }).toArray();
  },
  async updateGitlabProjectRequestStatus(id, status) {
    const db = await getDB();
    await db.collection("gitlab_project_requests").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updated_at: new Date() } }
    );
    return db.collection("gitlab_project_requests").findOne({ _id: new ObjectId(id) });
  },
  async getGitlabProjectRequestById(id) {
    const db = await getDB();
    return db.collection("gitlab_project_requests").findOne({ _id: new ObjectId(id) });
  },

  // Logging actions
  async logAction(userId, action, entity, entityId, description, before, after) {
    const db = await getDB();
    await db.collection("action_logs").insertOne({
      userId,
      action,
      entity,
      entityId,
      description,
      before,
      after,
      timestamp: new Date()
    });
  }
};

export default dbHelpers;
