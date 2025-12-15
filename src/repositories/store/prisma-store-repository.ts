// Data types
import { CategoriesModel, ProductModel } from "@/model/store/store-model";
import { StoreRepository } from "./store-repository";

// Database
import store_database from "@/lib/store-db";

export class PrismaStoreRepository implements StoreRepository {
  // Return all products and order by desc
  async findAllProducts(): Promise<ProductModel[]> {
    const products = await store_database.products.findMany({
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
    const categories = await store_database.category.findMany({
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
