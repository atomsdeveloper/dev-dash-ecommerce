"use client";

// React
import * as React from "react";

// Component
import { DataTable } from "../components/data-table";

// Components UI
import { Spinner } from "../../../components/ui/spinner";

// Data Types
import { ProductModel } from "../../../model/store/store-model";

export default function Products() {
  const [data, setData] = React.useState<ProductModel[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((products: ProductModel[]) => {
        setData(products);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="w-full h-full">
        <Spinner />
      </div>
    );
  return <DataTable data={data} />;
}
