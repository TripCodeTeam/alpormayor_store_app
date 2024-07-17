"use client";

import React, { useEffect, useState } from "react";
import AddLotionForm from "@/components/admin/FormAdd";
import { TbBox, TbMinus, TbPlus } from "react-icons/tb";
import { useGlobalContext } from "@/context/AuthAdmin";
import { useRouter } from "next/navigation";
import ListProducts from "@/components/admin/listProducts";

function PanelAdmin() {
  const { user, loading, startLoading, stopLoading } = useGlobalContext();
  const router = useRouter();

  const [openAddProduct, setOpenAddProduct] = useState<boolean>(false);

  // useEffect(() => {
  //   startLoading();
  //   if (!user) {
  //     router.push("/");
  //   } else {
  //     stopLoading();
  //   }
  // }, [user, router, startLoading, stopLoading]);

  if (loading) {
    return <p>Loading...</p>; // Puedes personalizar este cargador según tus necesidades
  }

  return (
    <>
      <div className="w-11/12 ml-5 mt-5">
        <h2 className="text-4xl font-extrabold dark:text-white">
          Administra Contenido de venta
        </h2>
        {/* <p className="my-4 text-lg text-gray-500">
          Start developing with an open-source library of over 450+ UI
          components, sections, and pages built with the utility classNamees
          from Tailwind CSS and designed in Figma.
        </p> */}

        <button
          onClick={() => setOpenAddProduct(!openAddProduct)}
          type="button"
          className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2 gap-2 mt-3"
        >
          {openAddProduct && <TbMinus size={20} />}
          {!openAddProduct && <TbPlus size={20} />}

          {openAddProduct && "Cancelar agregacion"}
          {!openAddProduct && "Agregar nuevo produto"}
        </button>

      </div>

      {openAddProduct && <AddLotionForm />}

      <ListProducts  />
    </>
  );
}

export default PanelAdmin;
