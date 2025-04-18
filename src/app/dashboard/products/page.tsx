"use client";

import DataTable from "@/components/custom/DataTable/DataTable";
import ContentContainer from "@/components/general/ContentContainer";
import { useProductStore } from "@/store/productStore";
import CreateProductDialog from "@/components/dashboard/Products/CreateProductDialog";
import { productColumns } from "@/components/dashboard/Products/ProductTableColumns";

export default function DashboardProductss() {
  const { products } = useProductStore();

  return (
    <ContentContainer>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2">
        <p>Produtos</p>
        <CreateProductDialog />
      </div>

      <DataTable
        columns={productColumns}
        data={products}
        noResultMsg="Nenhum produto encontrado"
      />
    </ContentContainer>
  );
}
