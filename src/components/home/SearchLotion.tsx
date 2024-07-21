import React, { useEffect } from "react";

interface propsSearch {
  textToFilter: (text: string) => void;
  genreSelect: (genre: string) => void;
}

function SearchLotion({ textToFilter, genreSelect }: propsSearch) {
  useEffect(() => genreSelect("all"), []);
  return (
    <main className="flex flex-row gap-5 max-w ml-5 mr-5 mt-6">
      <div className="flex flex-col">
        <h3>Genero</h3>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => genreSelect(e.target.value)}
        >
          <option selected={true} value="all">
            Todos
          </option>
          <option value="mix" selected={false}>
            Mix
          </option>
          <option selected={false} value="men">
            Masculino
          </option>
          <option selected={false} value="girl">
            Femenino
          </option>
        </select>
      </div>

      <div className="flex flex-col flex-1">
        <h3>Busca por el nombre</h3>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
          onChange={(e) => textToFilter(e.target.value)}
        />
      </div>
    </main>
  );
}

export default SearchLotion;
