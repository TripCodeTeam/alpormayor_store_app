import LotionService from "@/classes/LotionService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { skip, take } = await req.json();
    const all = await LotionService.allProducts(skip, take);

    if (all) return NextResponse.json({ success: true, data: all });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
