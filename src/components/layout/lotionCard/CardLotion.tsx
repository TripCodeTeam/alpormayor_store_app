// components/CardLotion.tsx
import { LotionType } from "@/types/Lotion";
import React, { useState } from "react";
import CarrouselLotions from "./CarrouselLotions";
import { stringToPriceCOP } from "@/handlers/stringToCop";
import { toast } from "sonner";
import Modal from "@/components/widgets/Modal"; // Asegúrate de importar el nuevo componente Modal

import nequiLogo from "@/assets/nequi_logo.png";
import contraEntregaLogo from "@/assets/contra_entrega.png";

import { TbBrandWhatsapp } from "react-icons/tb";
import Image from "next/image";

function CardLotion({ lotionData }: { lotionData: LotionType }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    try {
      if (lotionData.stock === 0) throw new Error("Este producto esta agotado");
      setIsModalOpen(true);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

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

        <div className="flex items-center justify-between mt-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {stringToPriceCOP(lotionData.price)}
          </span>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleOpenModal}
          >
            Comprar
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        titleModal={"Cotiza tu producto"}
      >
        <div className="flex justify-start">
          <div className="flex flex-row gap-2">
            <div className="grid place-content-center">
              <TbBrandWhatsapp size={25} className="text-green-400" />
            </div>
            <h3 className="font-semibold flex-1 grid place-content-center text-gray-700 text-1xl">
              Atencion rapida y segura con nuestros asesores desde Whatsapp
            </h3>
          </div>
        </div>

        <h3 className="font-bold text-gray-600">Metodos de pago</h3>
        <div className="flex flex-row gap-2">
          <Image src={nequiLogo} alt="nequi" className="w-20 h-auto" />
          <Image src={contraEntregaLogo} alt="nequi" className="w-52 h-auto" />
        </div>

        <h3 className="font-bold text-gray-600">Detalles de tu compra</h3>
        <div>
          <h5 className="text-sm">Nombre del producto: </h5>
          <h1 className="text-xl">{lotionData.name}</h1>
        </div>
        <div>
          <h5 className="text-sm">Precio:</h5>
          <h1 className="text-xl">{stringToPriceCOP(lotionData.price)}</h1>
        </div>
      </Modal>
    </div>
  );
}

export default CardLotion;
