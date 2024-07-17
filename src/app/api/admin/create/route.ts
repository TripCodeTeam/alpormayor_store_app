import AdminService from "@/classes/AdminService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");

    const newUser = await AdminService.create(email, password);

    if (newUser) return NextResponse.json({ success: true, data: newUser });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
