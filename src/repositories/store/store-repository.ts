import { ProductModel, CategoriesModel } from "@/model/store/store-model";

export interface StoreRepository {
  findAllProducts(): Promise<ProductModel[]>;
  findAllCategories(): Promise<CategoriesModel[]>;
}
