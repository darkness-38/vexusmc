"use client";

import { Button } from "@/components/ui/Button";

const categories = [
  { key: "all", label: "Tümü" },
  { key: "rank", label: "👑 Ranklar" },
  { key: "item", label: "⚔️ Eşyalar" },
  { key: "boost", label: "⚡ Boostlar" },
];

export function ProductFilter({
  category,
  onCategory,
}: {
  category: string;
  onCategory: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((item) => (
        <Button
          key={item.key}
          variant={category === item.key ? "primary" : "secondary"}
          onClick={() => onCategory(item.key)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
}

