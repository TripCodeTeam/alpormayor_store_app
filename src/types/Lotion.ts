export type LotionType = {
  id: string;
  name: string;
  images: string[];
  price: string;
  genre: GenreLotion;
  brand: string;
  stock: number;
  chords: string[];
  isDiscount: boolean;
  discountPrice: string;
  discountStart: Date;
  discountEnd: Date;
  created_at: Date;
};

export type GenreLotion = "men" | "girl" | "mix" | "all"
