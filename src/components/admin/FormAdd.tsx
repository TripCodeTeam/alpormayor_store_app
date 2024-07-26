"use client";

import React, { useState } from "react";
import styles from "./formAdd.module.css";
import { TbPlus, TbX } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { LotionType } from "@/types/Lotion";
import axios from "axios";

import CurrencyInput from "react-currency-input-field";

interface chord {
  id: string;
  text: string;
}

function AddLotionForm() {
  const [onlyChords, setOnlyChords] = useState<chord[]>([]);
  const [chordText, setChordText] = useState<string | null>(null);
  const [imageProduct, setImageProduct] = useState<string | null>(null);

  const [reqCreate, setReqCreate] = useState<LotionType | null>(null);

  const handleAddChord = () => {
    try {
      if (chordText == null || chordText?.length == 0)
        throw new Error("Introduce un acorde");
      const newChord: chord = { id: uuidv4(), text: chordText as string };
      setOnlyChords((prevChords) => [...prevChords, newChord]);
      setReqCreate((prevReqs) => ({
        ...(prevReqs as LotionType),
        chords: [...onlyChords, newChord].map((chord) => chord.text),
      }));
      setChordText("");
    } catch (error) {
      if (error instanceof Error) {
        toast.warning(error.message);
      }
    }
  };

  const handleDeleteChord = (idChord: string) => {
    setOnlyChords((prevChords) => {
      const updatedChords = prevChords.filter((chord) => chord.id !== idChord);
      setReqCreate((prevReqs) => ({
        ...(prevReqs as LotionType),
        chords: updatedChords.map((chord) => chord.text),
      }));
      return updatedChords;
    });
  };

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = async () => {
            const base64String = reader.result as string;
            console.log(base64String);
            setImageProduct(base64String);

            if (!reqCreate?.name)
              throw new Error("Ingresa el nombre del producto primero");

            const response = await axios
              .post("/api/store/lotions/image", {
                image: base64String,
                nameLotion: reqCreate.name,
              })
              .catch((error) => console.log(error));

            console.log(response);

            if (response?.data.success) {
              const image = response.data.data;

              setReqCreate((prevReqs) => ({
                ...(prevReqs as LotionType),
                images: [...(prevReqs?.images || []), image],
              }));

              setImageProduct(image);
            }
          };

          reader.readAsDataURL(file);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleStock = (cantity: string) => {
    setReqCreate((prevReq) => ({
      ...(prevReq as LotionType),
      stock: Number(cantity),
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: keyof LotionType
  ) => {
    e.preventDefault();
    const { value } = e.target;

    setReqCreate((prevFormData) => ({
      ...(prevFormData as LotionType),
      [key]: value,
    }));
  };

  const handleAddProduct = async () => {
    try {
      if (!reqCreate?.name) throw new Error("Dale un nombre al producto");
      if (!reqCreate?.price) throw new Error("Dale un precio al producto");
      if (!reqCreate?.genre) throw new Error("Dale un genero al producto");
      if (!reqCreate?.brand) throw new Error("Digita la marca del producto");

      const newProduct = await axios.post("/api/store/lotions/add", {
        data: reqCreate as LotionType,
      });

      console.log(newProduct);

      if (newProduct.data.success) {
        toast.success("Producto agregado");
        const data = newProduct.data.data;
        console.log(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  console.log(reqCreate);

  return (
    <div className="w-11/12 ml-5">
      <h3 className="text-3xl font-bold dark:text-white mb-6 mt-6">
        Agregar nuevo producto
      </h3>

      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nombre del producto
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John"
          name="name"
          value={reqCreate?.name || ""}
          onChange={(e) => handleInputChange(e, "name")}
          required
        />
      </div>

      <div className="flex items-center justify-center w-full mt-6">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleAddImage}
          />
        </label>
      </div>

      <div className="mt-6">
        {reqCreate?.images?.map((image, index) => (
          <img src={image} alt="image" key={index} className="w-72 h-auto" />
        ))}
      </div>

      <div className="mb-6 mt-6">
        <label
          htmlFor="price"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Precio del producto
        </label>
        <CurrencyInput
          type="text"
          id="price"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="200.000"
          defaultValue={0}
          decimalsLimit={2}
          value={reqCreate?.price || ""}
          onValueChange={(value, name, values) => {
            setReqCreate((prevReqs) => ({
              ...(prevReqs as LotionType),
              price: String(value),
            }));
          }}
          required
        />
      </div>

      <div className="mb-6 mt-6">
        <label
          htmlFor="stock"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Stock inicial
        </label>
        <input
          type="number"
          id="stock"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John"
          value={reqCreate?.stock || ""}
          onChange={(e) => handleStock(e.target.value)}
          required
        />
      </div>

      <form className="max-w mx-auto">
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Genero del producto
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={reqCreate?.genre || ""}
          onChange={(e) => handleInputChange(e, "genre")}
        >
          <option value="">Elige una opcion</option>
          <option value="men">Hombre</option>
          <option value="girl">Mujer</option>
          <option value="mix">Mixto</option>
        </select>
      </form>

      <div className="mb-6 mt-6">
        <label
          htmlFor="brand"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Marca
        </label>
        <input
          type="text"
          id="brand"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John"
          value={reqCreate?.brand || ""}
          onChange={(e) => handleInputChange(e, "brand")}
          required
        />
      </div>

      <label
        htmlFor="chords"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Acordes principales
      </label>

      <div className="flex flex-row gap-5">
        <input
          type="text"
          id="chords"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 fle"
          placeholder="John"
          onChange={(e) => setChordText(e.target.value as string)}
          required
          value={chordText as string | ""}
        />
        <div
          className="grid place-content-center hover:bg-gray-200 p-2 rounded-md cursor-pointer"
          onClick={handleAddChord}
        >
          <TbPlus size={20} />
        </div>
      </div>

      <div className="mb-3">
        {onlyChords.map((chord) => (
          <div
            key={chord.id}
            className="flex flex-row p-2 bg-gray-300 mt-2 rounded-md justify-between"
          >
            <h4 className="flex-1 grid place-content-center">{chord.text}</h4>
            <div
              className="grid place-content-center bg-gray-500 hover:bg-gray-600 p-2 rounded-md cursor-pointer"
              onClick={() => handleDeleteChord(chord.id)}
            >
              <TbX size={20} className="text-gray-50" />
            </div>
          </div>
        ))}
      </div>

      <div
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-6"
        onClick={handleAddProduct}
      >
        Crear
      </div>
    </div>
  );
}

export default AddLotionForm;
