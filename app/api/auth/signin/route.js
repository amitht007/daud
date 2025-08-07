import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import dbConnect from "../../../../lib/mongoose";
import Admin from "../../../../models/Admin";



export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }
    // Db Connect 
    await dbConnect();
    
    // Check the User
     const AdminUser=await Admin.findOne({username})

     if (!AdminUser){
        return NextResponse.json({
            error:"Username doesnt exist"},
            {
                status: 404
            }
        );      
     }

    // Validate password
    const isValid = AdminUser.password === password;

    // If password is invalid, return error
    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Set cookie if credentials are valid

    if (isValid) {
      const cookieStore = cookies()
      cookieStore.set("admin-auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 1, // 1 days
      })

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    console.log("Error in admin signin:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
