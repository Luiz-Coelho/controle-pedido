import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { customers } from "../database/schema";

export type Customer = InferSelectModel<typeof customers>;
export type NewCustomer = InferInsertModel<typeof customers>;
