import { cn } from "@/exxonim/utils/cn";
import { SmartLink } from "@/exxonim/components/primitives/SmartLink";
import type { MenuColumn } from "./types";

interface MenuColumnsProps {
  columns: MenuColumn[];
  onNavigate: () => void;
}

export function MenuColumns({ columns, onNavigate }: MenuColumnsProps) {
  return (
    <>
      {columns.map((column, index) => (
        <div
          key={`${column.title}-${index}`}
          className={cn(
            "flex-1 min-w-[140px]",
            column.borderLeft && index > 0 && "pl-6 border-l border-border-soft"
          )}
        >
          <h3 className="text-xs font-extrabold tracking-[0.14em] uppercase text-accent mb-4">
            {column.title}
          </h3>
          <ul className="grid gap-2.5">
            {column.items.map((item, itemIndex) => (
              <li key={`${column.title}-${item.href}-${itemIndex}`}>
                <SmartLink
                  className="text-sm text-text-muted hover:text-accent transition-colors"
                  href={item.href}
                  onClick={onNavigate}
                >
                  {item.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
