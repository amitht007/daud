import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email } = await req.json();

  // Check in emails table
  const found = await prisma.email.findUnique({ where: { email } });
  if (!found) {
    return new Response(JSON.stringify({ error: "Illegal access" }), { status: 403 });
  }

  // Generate a random password
  const rawPassword = Math.random().toString(36).slice(-8);
  const hashed = await bcrypt.hash(rawPassword, 10);

  // Store in users table
  await prisma.user.upsert({
    where: { email },
    update: { password: hashed },
    create: { email, password: hashed },
  });

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

  return new Response(JSON.stringify({ success: true }));
}
