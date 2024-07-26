"use client";

import { useGlobalContext } from "@/context/AuthAdmin";
import { LotionType } from "@/types/Lotion";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CardLotion from "../layout/lotionCard/CardLotion";

function ListProducts() {
  const { user } = useGlobalContext();
  const [allProducts, setAllProducts] = useState<LotionType[] | null>(null);

  useEffect(() => {
    const getAllProducts = async () => {
      const all = await axios.post(
        "/api/store/lotions/all",
        {},
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );

      console.log(all.data);

      if (all.data.success) {
        const data: LotionType[] = all.data.data;
        setAllProducts(data);
      }
    };

    getAllProducts();
  }, [user?.token]);

  return (
    <>
      <div className="w-11/12 ml-5 flex flex-wrap grow gap-6 mt-14">
        {allProducts?.map((product, index) => (
          <CardLotion key={index} lotionData={product} />
        ))}
      </div>
    </>
  );
}

export default ListProducts;
