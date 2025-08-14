import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const db = await connectDB();
  const found = await db.collection("emails").findOne({ email_id: email });
  return NextResponse.json({ allowed: !!found });
}
