import { eq } from "drizzle-orm";
import { db } from "../database/client";
import { products } from "../database/schema";
import { NewProduct, Product } from "../types/Product";

export const createProduct = async (data: NewProduct): Promise<void> => {
  console.log("📦 Recebido para inserção:", data);
  await db.insert(products).values(data);
};

export const getAllProducts = async (): Promise<Product[]> => {
  return await db.select().from(products);
};

export const deleteProduct = async (id: number) => {
  await db.delete(products).where(eq(products.id, id));
};

export const updateProduct = async (
  id: number,
  data: NewProduct
): Promise<void> => {
  await db.update(products).set(data).where(eq(products.id, id));
};

export const getProductById = async (
  id: number
): Promise<Product | undefined> => {
  const result = await db.select().from(products).where(eq(products.id, id));
  return result[0];
};
