import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { PlusIcon } from "lucide-react";
import { getProducts } from "../_data-access/product/get-products";
import UpsertSaleSheetContent from "./_components/upsert-sheet-content";
import { Product } from "@prisma/client";
import { ComboboxOption } from "../_components/ui/combobox";

const SalesPage = async () => {
  const products = await getProducts();
  const productOptions: ComboboxOption[] = products.map((product: Product) => ({
    label: product.name,
    value: product.id,
  }));

  return (
    <div className="w-full space-y-8 p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-gray-500">
            Gestão de Vendas
          </span>
          <h2 className="text-xl font-semibold">Vendas</h2>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="gap-2">
              <PlusIcon size={20} />
              Nova venda
            </Button>
          </SheetTrigger>

          <UpsertSaleSheetContent
            products={products}
            productOptions={productOptions}
          />
        </Sheet>
      </div>

      {/* <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      /> */}
    </div>
  );
};

export default SalesPage;
