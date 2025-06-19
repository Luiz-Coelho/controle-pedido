import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { orders } from "../database/schema";

export type Order = InferSelectModel<typeof orders>;
export type NewOrder = InferInsertModel<typeof orders>;

export type OrderWithTotals = Order & {
  totalItems: number;
  totalPrice: number;
};
