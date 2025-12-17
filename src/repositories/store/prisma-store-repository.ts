// Data types
import { CategoriesModel, ProductModel } from "@/model/store/store-model";
import { StoreRepository } from "./store-repository";

// Database
import {db} from "@/lib/prisma";

export class PrismaStoreRepository implements StoreRepository {
  // Return all products and order by desc
  async findAllProducts(): Promise<ProductModel[]> {
    const products = await db.product.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!products) {
      throw new Error("Product cannot be found.");
    }

    return products;
  }

  async findAllCategories(): Promise<CategoriesModel[]> {
    const categories = await db.category.findMany({
      include: {
        store: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!categories) {
      throw new Error("Product cannot be found.");
    }

    return categories;
  }
}
