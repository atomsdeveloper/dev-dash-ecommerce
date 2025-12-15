export type ProductModel = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  ingredients: string[];
  storeId: string;
  categoryId: string;
  createdAt: Date;
  updateAt: Date;

  category: {
    name: string;
  };
};

export type CategoriesModel = {
  id: string;
  name: string;
  storeId: string;
  createdAt: Date;
  updateAt: Date;
};
