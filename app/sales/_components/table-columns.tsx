"use client";

import { SaleDto } from "@/app/_data-access/sale/get-sales";
import { formatCurrency } from "@/app/_utils/currency";
import { ColumnDef } from "@tanstack/react-table";
import SaleTableDropdownMenu from "./table-dropdown-menu";

export const saleTableColumns: ColumnDef<SaleDto>[] = [
  {
    accessorKey: "productNames",
    header: "Produto",
  },
  {
    accessorKey: "totalProducts",
    header: "Quantidade de produtos",
  },
  {
    accessorKey: "totalAmount",
    header: "Valor total",
    cell: (row) => {
      const sale = row.row.original;
      const totalAmount = sale.totalAmount;

      return formatCurrency(totalAmount);
    },
  },
  {
    header: "Data",
    cell: (row) => {
      const sale = row.row.original;

      return new Date(sale.date).toLocaleDateString("pt-BR");
    },
  },
  {
    header: "Ações",
    cell: (row) => {
      const sale = row.row.original;

      return <SaleTableDropdownMenu sale={sale} />;
    },
  },
];
