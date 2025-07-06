import { eq, sql } from "drizzle-orm";
import { db } from "../database/client";
import { orderItems, orders } from "../database/schema";
import { NewOrder, Order, OrderWithTotals } from "../types/Order";
import {
  createOrderItemAtomic,
  deleteOrderItemsByOrderId,
} from "./OrderItemRepository";
import { Transaction } from "../types/Transaction";
import { NewOrderItem } from "../types/OrderItem";

export const createOrder = async (
  data: NewOrder,
  items: Omit<NewOrderItem, "id" | "orderId">[]
): Promise<number> => {
  if (items.length === 0) {
    throw new Error("Um pedido precisa ter ao menos um item.");
  }

  return await db.transaction(async (tx) => {
    const now = Date.now();

    const result = await tx
      .insert(orders)
      .values({ ...data, createdAt: now, updatedAt: now })
      .returning({ id: orders.id });

    const orderId = result[0].id;

    for (const item of items) {
      await createOrderItemAtomic({ ...item, orderId }, tx);
    }

    return orderId;
  });
};

export const getAllOrders = async (): Promise<Order[]> => {
  return await db.select().from(orders);
};

export const getAllOrdersWithTotals = async (): Promise<OrderWithTotals[]> => {
  return await db
    .select({
      id: orders.id,
      customerId: orders.customerId,
      createdAt: orders.createdAt,
      updatedAt: orders.updatedAt,
      totalItems: sql<number>`COUNT(${orderItems.id})`,
      totalPrice: sql<number>`SUM(${orderItems.quantity} * ${orderItems.price})`,
    })
    .from(orders)
    .leftJoin(orderItems, eq(orderItems.orderId, orders.id))
    .groupBy(orders.id);
};

export const getOrderById = async (id: number): Promise<Order | undefined> => {
  const result = await db.select().from(orders).where(eq(orders.id, id));
  return result[0];
};

export const updateOrder = async (
  id: number,
  data: NewOrder
): Promise<void> => {
  await db
    .update(orders)
    .set({ ...data, updatedAt: Date.now() })
    .where(eq(orders.id, id));
};

export const deleteOrder = async (id: number) => {
  await db.transaction(async (tx) => {
    await deleteOrderItemsByOrderId(id, tx);
    await tx.delete(orders).where(eq(orders.id, id));
  });
};

export const touchOrderUpdatedAt = async (
  orderId: number,
  tx: Transaction
): Promise<void> => {
  await tx
    .update(orders)
    .set({ updatedAt: Date.now() })
    .where(eq(orders.id, orderId));
};
