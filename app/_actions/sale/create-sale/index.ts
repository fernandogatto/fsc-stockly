"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { createSaleSchema, CreateSaleSchema } from "./schema";

export const createSale = async (data: CreateSaleSchema) => {
  createSaleSchema.parse(data);
  db.$transaction(async (transaction) => {
    const sale = await transaction.sale.create({
      data: {
        date: new Date(),
      },
    });

    for (const product of data.products) {
      const existingProduct = await db.product.findUnique({
        where: {
          id: product.id,
        },
      });

      if (!existingProduct) {
        throw new Error("Product not found");
      }

      const productIsOutOfStock = product.quantity > existingProduct.stock;

      if (productIsOutOfStock) {
        throw new Error("Product is out of stock");
      }

      await transaction.saleProduct.create({
        data: {
          saleId: sale.id,
          productId: product.id,
          quantity: product.quantity,
          unitPrice: existingProduct.price,
        },
      });

      await transaction.product.update({
        where: {
          id: product.id,
        },
        data: {
          stock: {
            decrement: product.quantity,
          },
        },
      });
    }
  });

  revalidatePath("/products");
};
