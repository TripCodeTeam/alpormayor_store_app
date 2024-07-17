import { prisma } from "@/prisma/db";
import { GenreLotion, LotionType } from "@/types/Lotion";
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

  static allProducts(): Promise<Lotion[]> {
    return prisma.lotion.findMany()
  }

  /** Method to filter lotions by chords */
  static productsByChords(chords: string[]): Promise<Lotion[]> {
    return prisma.lotion.findMany({
      where: {
        chords: {
          hasSome: chords,
        },
      },
    });
  }

  /** Method to filter lotion by genre */
  static async productsByGenre(genre: GenreLotion): Promise<Lotion[]> {
    return prisma.lotion.findMany({ where: { genre } });
  }

  /** Method to filter lotions by price using a budget */
  static filterByBudget(budget: number): Promise<Lotion[]> {
    const priceRange = 0.2 * budget; // Define a 20% range around the budget
    const minPrice = budget - priceRange;
    const maxPrice = budget + priceRange;

    return prisma.lotion.findMany({
      where: {
        price: {
          gte: minPrice.toString(),
          lte: maxPrice.toString(),
        },
      },
    });
  }
}

export default LotionService;
