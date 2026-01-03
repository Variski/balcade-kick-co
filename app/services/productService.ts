import { api } from "./api";

// GET semua produk
export const getProducts = async () => {
  return api("/products/index.php");
};

// TAMBAH produk
export const addProduct = async (data: {
  name: string;
  brand: string;
  price: number;
  image: string;
}) => {
  return api("/products/create.php", "POST", data);
};

// UPDATE produk
export const updateProduct = async (data: {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
}) => {
  return api("/products/update.php", "PUT", data);
};

// DELETE produk
export const deleteProduct = async (id: number) => {
  return api("/products/delete.php", "DELETE", { id });
};
  