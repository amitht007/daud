import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body)
    const db = await connectDB();
    const collection = db.collection("users"); // use your collection name
    const result = await collection.insertOne(body);
    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.log(console.error(error));
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const db = await connectDB();
    const collection = db.collection("users"); // use your collection name
    const users = await collection.find({}).toArray();
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.log(console.error(error));
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}