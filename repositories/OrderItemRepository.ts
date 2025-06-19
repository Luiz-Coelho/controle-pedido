import { eq } from "drizzle-orm";
import { db } from "../database/client";
import { orderItems } from "../database/schema";
import { NewOrderItem, OrderItem } from "../types/OrderItem";
import { touchOrderUpdatedAt } from "./OrderRepository";
import { Transaction } from "../types/Transaction";

export const createOrderItem = async (data: NewOrderItem): Promise<void> => {
  await db.transaction(async (tx) => {
    await createOrderItemAtomic(data, tx);
  });
};

export const createOrderItemAtomic = async (
  data: NewOrderItem,
  tx: Transaction
): Promise<void> => {
  await tx.insert(orderItems).values(data);
  await touchOrderUpdatedAt(data.orderId, tx);
};

export const getOrderItemsByOrderId = async (
  orderId: number
): Promise<OrderItem[]> => {
  return await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, orderId));
};

export const getOrderItemById = async (
  id: number
): Promise<OrderItem | undefined> => {
  const result = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.id, id));
  return result[0];
};

export const updateOrderItem = async (
  id: number,
  data: NewOrderItem
): Promise<void> => {
  await db.transaction(async (tx) => {
    await tx.update(orderItems).set(data).where(eq(orderItems.id, id));
    await touchOrderUpdatedAt(data.orderId, tx);
  });
};

export const deleteOrderItem = async (
  id: number,
  orderId: number
): Promise<void> => {
  await db.transaction(async (tx) => {
    await tx.delete(orderItems).where(eq(orderItems.id, id));
    await touchOrderUpdatedAt(orderId, tx);
  });
};

export const deleteOrderItemsByOrderId = async (
  orderId: number,
  tx: Transaction
): Promise<void> => {
  await tx.delete(orderItems).where(eq(orderItems.orderId, orderId));
  await touchOrderUpdatedAt(orderId, tx);
};
