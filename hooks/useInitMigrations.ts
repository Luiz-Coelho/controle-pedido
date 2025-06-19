import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { db } from "../database/client";
import migrations from "../drizzle/migrations";
import { showError } from "../utils/showToast";

export function useInitMigrations() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    console.log("❌ Erro ao aplicar migrações:", error.message);
    showError("Erro ao aplicar migrações");
  }

  if (!success) {
    console.log("⏳ Aplicando migrações...");
  }

  if (success) {
    console.log("✅ Migrações aplicadas com sucesso!!");
  }

  return { ready: success, error };
}
