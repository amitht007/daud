import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("devops-secops"); // Use your DB name if needed
    const usersCollection = db.collection("test");
    const users = await usersCollection.find({}).toArray();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const newUser = await req.json();
    console.log(newUser)
    const client = await clientPromise;
    const db = client.db("devops-secops");
    const usersCollection = db.collection("test");

    const result = await usersCollection.insertOne(newUser);
    return NextResponse.json({ insertedId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}