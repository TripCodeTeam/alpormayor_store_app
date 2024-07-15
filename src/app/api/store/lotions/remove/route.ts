import LotionService from "@/classes/LotionService";
import TokenService from "@/classes/TokenService";
import { LotionType } from "@/types/Lotion";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    // Verificar la autenticación JWT
    const authorizationHeader = req.headers.get("Authorization");

    if (!authorizationHeader) {
      throw new Error("Token de autorización no proporcionado");
    }

    const token = authorizationHeader.split(" ")[1];

    const decodedToken = TokenService.verifyToken(
      token,
      process.env.JWT_SECRET as string
    );

    if (!decodedToken) {
      throw new Error("Token no válido");
    }

    const lotionId: string = await req.json();

    const deleteLotion = await LotionService.removeLotion(lotionId);

    if (deleteLotion) {
      return NextResponse.json({ success: true, data: deleteLotion });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
