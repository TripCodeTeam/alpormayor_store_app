import { LotionType } from "@/types/Lotion";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CardLotion from "../layout/lotionCard/CardLotion";
import InfiniteScroll from "react-infinite-scroller";

interface ListProductsProps {
  genre: string | null;
  nameToFilter: string | null;
}

function ListProducts({ genre, nameToFilter }: ListProductsProps) {
  const [products, setProducts] = useState<LotionType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<LotionType[] | null>(
    null
  );
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async (skip: number, take: number) => {
    const response = await axios.post("/api/store/lotions/all", { skip, take });
    const data: LotionType[] = response.data.data;
    return data;
  };

  const loadMoreProducts = async (page: number) => {
    const newProducts = await fetchProducts(page * 5, 5);
    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    if (newProducts.length < 5) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (products) {
      let filtered = products;

      console.log("Genre:", genre);
      console.log("Products:", products);

      if (genre && genre !== "all") {
        filtered = filtered.filter((product) => product.genre === genre);
      }

      if (nameToFilter && nameToFilter.length > 5) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(nameToFilter.toLowerCase())
        );
      }

      setFilteredProducts(filtered);
    }
  }, [genre, nameToFilter, products]);

  useEffect(() => {
    const resetAndLoadProducts = async () => {
      setPage(0);
      setProducts([]);
      setHasMore(true);
      const initialProducts = await fetchProducts(0, 20);
      setProducts(initialProducts);
    };

    resetAndLoadProducts();
  }, [genre, nameToFilter]);

  return (
    <div className="container mx-auto p-4">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMoreProducts}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            Loading...
          </div>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts?.map((product) => (
            <div key={product.id} className="flex">
              <CardLotion lotionData={product} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default ListProducts;
