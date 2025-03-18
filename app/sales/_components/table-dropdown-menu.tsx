"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { SaleDto } from "@/app/_data-access/sale/get-sales";
import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import AlertDeleteSaleDialogContent from "./delete-dialog-content";
import UpsertSaleSheetContent from "./upsert-sheet-content";

interface SaleTableDropdownMenuProps {
  sale: Pick<SaleDto, "id" | "saleProducts">;
  products: ProductDto[];
  productOptions: ComboboxOption[];
}

const SaleTableDropdownMenu = ({
  sale,
  products,
  productOptions,
}: SaleTableDropdownMenuProps) => {
  const [upsertSheetIsOpen, setUpsertSheetIsOpen] = useState(false);

  const handleCopyToClipboardClick = () => {
    navigator.clipboard.writeText(sale.id);
    toast.success("ID copiado para a área de transferência");
  };

  const defaultSelectedProducts = sale.saleProducts.map((saleProduct) => ({
    id: saleProduct.productId,
    name: saleProduct.productName,
    price: saleProduct.unitPrice,
    quantity: saleProduct.quantity,
  }));

  return (
    <Sheet open={upsertSheetIsOpen} onOpenChange={setUpsertSheetIsOpen}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="gap-2"
              onClick={handleCopyToClipboardClick}
            >
              <ClipboardCopyIcon size={16} />
              Copiar ID
            </DropdownMenuItem>
            <SheetTrigger asChild>
              <DropdownMenuItem className="gap-2">
                <EditIcon size={16} />
                Editar
              </DropdownMenuItem>
            </SheetTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="gap-2">
                <TrashIcon size={16} />
                Excluir
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDeleteSaleDialogContent saleId={sale.id} />
      </AlertDialog>

      <UpsertSaleSheetContent
        saleId={sale.id}
        isOpen={upsertSheetIsOpen}
        products={products}
        productOptions={productOptions}
        setSheetIsOpen={setUpsertSheetIsOpen}
        defaultSelectedProducts={defaultSelectedProducts}
      />
    </Sheet>
  );
};

export default SaleTableDropdownMenu;
