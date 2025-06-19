import { db } from "../database/client";

export type Transaction = Parameters<typeof db.transaction>[0] extends (
  tx: infer T
) => any
  ? T
  : never;
