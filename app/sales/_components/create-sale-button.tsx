"use client";

import { Button } from "@/app/_components/ui/button";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { Product } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import UpsertSaleSheetContent from "./upsert-sheet-content";
import { useState } from "react";

interface CreateSaleButtonProps {
  products: Product[];
  productOptions: ComboboxOption[];
}

const CreateSaleButton = ({
  products,
  productOptions,
}: CreateSaleButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2">
          <PlusIcon size={20} />
          Nova venda
        </Button>
      </SheetTrigger>

      <UpsertSaleSheetContent
        products={products}
        productOptions={productOptions}
        onSubmitSuccess={() => setSheetIsOpen(false)}
      />
    </Sheet>
  );
};

export default CreateSaleButton;
