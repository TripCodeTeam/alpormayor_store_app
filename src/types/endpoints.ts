import { LotionType } from "./Lotion";

export type ResponseApi = {
  success: boolean;
  data?: LotionType;
  error?: string;
};
