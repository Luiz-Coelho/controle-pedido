import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "./schema";

const dbConnection = SQLite.openDatabaseSync("controle_pedidos.db", {
  enableChangeListener: true,
});

export const db = drizzle(dbConnection, { schema });
