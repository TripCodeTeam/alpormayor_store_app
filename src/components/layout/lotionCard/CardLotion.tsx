import { LotionType } from "@/types/Lotion";
import React from "react";
import CarrouselLotions from "./CarrouselLotions";
import { stringToPriceCOP } from "@/handlers/stringToCop";

function CardLotion({ lotionData }: { lotionData: LotionType }) {
  console.log(lotionData);

  return (
    <div className="w-full bg-white border border-gray-100 hover:border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

      <div className="p-3">
        <div className="flex flex-row gap-2">
          <p className="pt-0.5 pb-0.5 pl-5 pr-5 grid place-content-center text-sm bg-gray-200 rounded-md">
            {lotionData.genre}
          </p>
          <p className="pt-0.5 pb-0.5 pl-5 pr-5 grid place-content-center text-sm bg-gray-200 rounded-md">
            {lotionData.brand}
          </p>
          {lotionData.isDiscount && (
            <p className="pt-0.5 pb-0.5 pl-5 pr-5 grid place-content-center text-sm bg-gray-200 rounded-md">
              En Promocion
            </p>
          )}
        </div>
      </div>

      <CarrouselLotions images={lotionData.images} />

      <div className="px-5 pb-5">
        <div>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {lotionData.name}
          </h5>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {stringToPriceCOP(lotionData.price)}
          </span>
          <a
            href="#"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Comprar
          </a>
        </div>
      </div>
    </div>
  );
}

export default CardLotion;
