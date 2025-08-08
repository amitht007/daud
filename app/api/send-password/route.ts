import { dbOperations } from "../../../lib/db";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from 'next/server';

function generateUserId() {
  return 'u' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  // Check in emails table
  const found = dbOperations.getEmailById.get(email);
  if (!found) {
    return NextResponse.json({ error: "Illegal access" }, { status: 403 });
  }

  // Generate a random password
  const rawPassword = Math.random().toString(36).slice(-8);
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  // Store in users table
  const existingUser = dbOperations.getUserByEmail.get(email);
  if (existingUser) {
    dbOperations.updateUserPassword.run(hashedPassword, existingUser.id);
  } else {
    const userId = generateUserId();
    dbOperations.createUser.run(userId, email, hashedPassword, 'user');
  }

  // Send password via email
  const transporter = nodemailer.createTransport({
    host: "localhost", // or use Mailtrap for testing
    port: 1025,
    secure: false,
    tls: { rejectUnauthorized: false },
  });

  await transporter.sendMail({
    from: '"NoReply" <noreply@yourapp.com>',
    to: email,
    subject: "Your Login Password",
    text: `Your login password is: ${rawPassword}`,
  });

  return NextResponse.json({ success: true });
}
