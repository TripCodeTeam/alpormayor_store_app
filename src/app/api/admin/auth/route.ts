import AdminService from "@/classes/AdminService";
import TokenService from "@/classes/TokenService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const signin = await AdminService.signin(email, password);

    if (signin == null) throw new Error("Usuario no registrado");

    const payload = { userId: signin.id, userEmail: signin.email };
    const secret = process.env.JWT_SECRET as string;
    const token = TokenService.createToken(payload, secret);

    return NextResponse.json({ success: true, data: { ...signin, token } });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
