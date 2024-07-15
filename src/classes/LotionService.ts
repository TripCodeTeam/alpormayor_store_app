import { prisma } from "@/prisma/db";
import { LotionType } from "@/types/Lotion";
import { Lotion } from "@prisma/client";

class LotionService {
  /** method to create a lotion */
  static addLotion(data: LotionType): Promise<Lotion> {
    return prisma.lotion.create({ data });
  }

  /** Method to remove a lotion */
  static removeLotion(id: string): Promise<Lotion> {
    return prisma.lotion.delete({ where: { id } });
  }

  /** Method to update a lotion  */
  static updateLotion({
    id,
    data,
  }: {
    id: string;
    data: Partial<LotionType>;
  }): Promise<Lotion> {
    return prisma.lotion.update({
      where: { id },
      data,
    });
  }
}

export default LotionService;
