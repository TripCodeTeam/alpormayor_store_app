"use client";

import ListProducts from "@/components/home/ListProducts";
import SearchLotion from "@/components/home/SearchLotion";
import { useGlobalContext } from "@/context/AuthAdmin";
import { useState } from "react";

export default function Home() {
  const { user } = useGlobalContext();
  console.log(user);

  const [genre, setGenre] = useState<string | null>(null);
  const [nameLotionSearch, setNameLotionSearch] = useState<string | null>(null);

  const genreSelectToFilter = (genre: string) => setGenre(genre);
  const nameLotionToFilter = (text: string) => setNameLotionSearch(text);

  return (
    <main>
      <SearchLotion
        genreSelect={genreSelectToFilter}
        textToFilter={nameLotionToFilter}
      />

      <ListProducts genre={genre} nameToFilter={nameLotionSearch} />
    </main>
  );
}
