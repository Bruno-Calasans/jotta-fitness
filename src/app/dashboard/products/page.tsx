"use client";

import DataTable from "@/components/custom/data-table/DataTable";
import ContentContainer from "@/components/custom/others/ContentContainer";
import { useProductStore } from "@/store/productStore";
import CreateProductDialog from "@/components/dashboard/products/CreateProductDialog";
import { productColumns } from "@/components/dashboard/products/ProductTableColumns";

export default function DashboardProductss() {
  const { loading, products } = useProductStore();

  return (
    <ContentContainer>
      <div className="flex justify-between text-4xl border-b-2 border-b-orange-500 py-2">
        <p>Produtos</p>
        <CreateProductDialog />
      </div>

      <DataTable
        loading={loading}
        loadingMsg="Carregando produtos"
        columns={productColumns}
        data={products}
        noResultMsg="Nenhum produto encontrado"
      />
    </ContentContainer>
  );
}
