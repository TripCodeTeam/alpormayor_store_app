// import TokenService from "@/classes/TokenService";
import cloudinary from "@/lib/cloudinary-conf";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // // Verificar la autenticación JWT
    // const authorizationHeader = req.headers.get("Authorization");

    // if (!authorizationHeader) {
    //   throw new Error("Token de autorización no proporcionado");
    // }

    // const token = authorizationHeader.split(" ")[1];

    // const decodedToken = TokenService.verifyToken(
    //   token,
    //   process.env.JWT_SECRET as string
    // );

    // if (!decodedToken) {
    //   throw new Error("Token no válido");
    // }

    const { image, nameLotion } = await req.json();

    const process_name = nameLotion.replace(/\s+/g, "_");

    const upImage = await cloudinary.v2.uploader.upload(image, {
      folder: "images_lotions",
      public_id: process_name,
    });

    console.log(upImage)

    return NextResponse.json({
      success: true,
      data: upImage.secure_url,
    });
  } catch (error) {
    if (error instanceof Error) {
    }
  }
}
