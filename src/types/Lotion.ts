export type LotionType = {
  id: string;
  name: string;
  images: string[];
  price: string;
  genre: string;
  brand: string;
  stock: number;
  chords: string[];
  isDiscount: boolean;
  discountPrice: string;
  discountStart: Date;
  discountEnd: Date;
  created_at: Date;
};
