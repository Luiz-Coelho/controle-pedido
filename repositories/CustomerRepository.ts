import { eq } from "drizzle-orm";
import { db } from "../database/client";
import { customers } from "../database/schema";
import { Customer, NewCustomer } from "../types/Customer";

export const createCustomer = async (data: NewCustomer) => {
  await db.insert(customers).values(data);
};

export const getAllCustomers = async (): Promise<Customer[]> => {
  return await db.select().from(customers);
};

export const deleteCustomer = async (id: number) => {
  await db.delete(customers).where(eq(customers.id, id));
};

export const updateCustomer = async (
  id: number,
  data: NewCustomer
): Promise<void> => {
  await db.update(customers).set(data).where(eq(customers.id, id));
};

export const getCustomerById = async (
  id: number
): Promise<Customer | undefined> => {
  const result = await db.select().from(customers).where(eq(customers.id, id));
  return result[0];
};
