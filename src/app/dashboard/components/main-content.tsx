"use client";

import { ChartAreaInteractive } from "./chart-area-interactive";
import { DataTable } from "./data-table";
import { SectionCards } from "./section-cards";

// Context
import { usePage } from "../context/page-context";

// Datas
import data from "../Template/data.json";

// Pages
import Products from "../pages/products";

export function MainContent() {
  const { activePage } = usePage();

  const pageComponents: Record<string, React.ReactNode> = {
    dashboard: (
      <>
        <SectionCards />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>
        <DataTable data={data} />
      </>
    ),
    products: (
      <div className="px-4">
        <Products />
      </div>
    ),
  };

  return <>{pageComponents[activePage]}</>;
}
