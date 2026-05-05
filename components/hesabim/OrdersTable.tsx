"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";

interface RowData {
  id: string;
  name: string;
  createdAt: string;
  amount: number;
  status: string;
}

const columns: ColumnDef<RowData>[] = [
  {
    header: "Sipariş No",
    accessorKey: "id",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-[var(--text-secondary)]">
        {row.original.id.slice(0, 8)}
      </span>
    ),
  },
  { header: "Ürün", accessorKey: "name" },
  { header: "Tarih", accessorKey: "createdAt" },
  {
    header: "Tutar",
    accessorKey: "amount",
    cell: ({ row }) => `${row.original.amount.toLocaleString("tr-TR")} ₺`,
  },
  {
    header: "Durum",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status.toLowerCase();
      const statusClass =
        status === "tamamlandi"
          ? "bg-[var(--success)]/15 text-[var(--success)]"
          : status === "beklemede"
            ? "bg-[var(--warning)]/15 text-[var(--warning)]"
            : "bg-[var(--danger)]/15 text-[var(--danger)]";
      return (
        <span className={cn("rounded-full px-2 py-1 text-xs", statusClass)}>
          {row.original.status}
        </span>
      );
    },
  },
];

export function OrdersTable({ data }: { data: RowData[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (data.length === 0) {
    return (
      <div className="card-base p-6 text-center">
        <p className="mb-3">Henüz sipariş yok</p>
      </div>
    );
  }

  return (
    <div className="card-base overflow-x-auto p-4">
      <table className="w-full min-w-[680px] text-sm">
        <thead>
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => (
                <th key={header.id} className="px-3 py-2 text-left text-[var(--text-secondary)]">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t border-[var(--border)] transition-all duration-300 hover:bg-[var(--bg-tertiary)]">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-3 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

