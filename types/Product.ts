import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { products } from "../database/schema";

export type Product = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;
