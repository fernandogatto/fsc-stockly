"use server";

import { db } from "@/app/_lib/prisma";
import { actionClient } from "@/app/_lib/safe-action";
import { revalidatePath } from "next/cache";
import { upsertProductSchema } from "./schema";

export const upsertProduct = actionClient
  .schema(upsertProductSchema)
  .action(async ({ parsedInput: { id, ...data } }) => {
    await db.product.upsert({
      where: { id: id ?? "" },
      update: data,
      create: data,
    });
    revalidatePath("/products");
    revalidatePath("/dashboard");
  });
