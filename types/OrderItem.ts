import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { orderItems } from "../database/schema";

export type OrderItem = InferSelectModel<typeof orderItems>;
export type NewOrderItem = InferInsertModel<typeof orderItems>;
