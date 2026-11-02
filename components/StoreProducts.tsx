"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { productCategories, type Product, type ProductCategory } from "@/lib/content";
import { Icon } from "./Icon";
import { ProductCard } from "./ProductCard";
import { ProductTile } from "./ProductTile";

type Category = "All" | ProductCategory;
type Sort = "featured" | "price-asc" | "price-desc" | "name";
type View = "grid" | "list";

const VIEW_KEY = "felix-store-view";

const sortOptions: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name" },
];

/** "$149" → 149. Products without a price sort after the rest. */
const priceOf = (product: Product) => (product.price ? Number(product.price.replace(/[^0-9.]/g, "")) : Number.MAX_SAFE_INTEGER);

/**
 * Sort dropdown. A native <select> can't be styled when open (Windows draws its option highlight in system blue),
 * so this is a select-only combobox: arrow keys move, Enter/Space choose, Escape or a click outside closes.
 */
function SortMenu({ value, onChange }: { value: Sort; onChange: (value: Sort) => void }) {
  const [open, setOpen] = useState(false);
  const selectedIndex = sortOptions.findIndex((option) => option.value === value);
  const [active, setActive] = useState(selectedIndex);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function openMenu() {
    setActive(selectedIndex);
    setOpen(true);
  }

  function choose(index: number) {
    onChange(sortOptions[index].value);
    setOpen(false);
    button.current?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const last = sortOptions.length - 1;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        openMenu();
      }
      return;
    }
    if (event.key === "Escape") setOpen(false);
    else if (event.key === "Tab") setOpen(false);
    else if (event.key === "ArrowDown") setActive((index) => Math.min(index + 1, last));
    else if (event.key === "ArrowUp") setActive((index) => Math.max(index - 1, 0));
    else if (event.key === "Home") setActive(0);
    else if (event.key === "End") setActive(last);
    else if (event.key === "Enter" || event.key === " ") choose(active);
    else return;
    if (event.key !== "Tab") event.preventDefault();
  }

  return (
    <div className="sort-menu" ref={root}>
      <button
        ref={button}
        type="button"
        role="combobox"
        className="sort-button"
        aria-label={`Sort products: ${sortOptions[selectedIndex].label}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="sort-options"
        aria-activedescendant={open ? `sort-${sortOptions[active].value}` : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
      >
        {sortOptions[selectedIndex].label}
        <Icon name="chevron-down" size={16} />
      </button>
      {open && (
        <ul className="sort-options" id="sort-options" role="listbox" aria-label="Sort products">
          {sortOptions.map((option, index) => (
            <li
              key={option.value}
              id={`sort-${option.value}`}
              role="option"
              aria-selected={option.value === value}
              className={index === active ? "is-active" : undefined}
              onPointerEnter={() => setActive(index)}
              onClick={() => choose(index)}
            >
              {option.label}
              {option.value === value && <Icon name="check" size={16} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function StoreProducts({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<Category>("All");
  // Only offer categories that have products, in the order set in lib/content.ts
  const categories: Category[] = ["All", ...productCategories.filter((name) => products.some((p) => p.category === name))];
  const [sort, setSort] = useState<Sort>("featured");
  const [view, setView] = useState<View>("grid");

  useEffect(() => {
    try {
      if (localStorage.getItem(VIEW_KEY) === "list") setView("list");
    } catch {}
  }, []);

  function changeView(next: View) {
    setView(next);
    try {
      localStorage.setItem(VIEW_KEY, next);
    } catch {}
  }

  const shown = products
    .filter((product) => category === "All" || product.category === category)
    .sort((a, b) => {
      if (sort === "price-asc") return priceOf(a) - priceOf(b);
      if (sort === "price-desc") return (b.price ? priceOf(b) : -1) - (a.price ? priceOf(a) : -1);
      if (sort === "name") return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <>
      <div className="store-toolbar">
        <div className="segmented" role="group" aria-label="Category">
          {categories.map((name) => (
            <button key={name} type="button" aria-pressed={category === name} onClick={() => setCategory(name)}>
              {name}
            </button>
          ))}
        </div>

        <div className="store-toolbar-end">
          <SortMenu value={sort} onChange={setSort} />

          <div className="segmented segmented--icons" role="group" aria-label="Layout">
            <button type="button" aria-pressed={view === "grid"} onClick={() => changeView("grid")}>
              <Icon name="grid" size={16} />
              <span className="sr-only">Grid view</span>
            </button>
            <button type="button" aria-pressed={view === "list"} onClick={() => changeView("list")}>
              <Icon name="list" size={16} />
              <span className="sr-only">List view</span>
            </button>
          </div>
        </div>
      </div>

      {shown.length > 0 ? (
        view === "grid" ? (
          <div className="tile-grid" aria-live="polite">
            {shown.map((product) => (
              <ProductTile product={product} key={product.title} />
            ))}
          </div>
        ) : (
          <div className="product-grid is-list" aria-live="polite">
            {shown.map((product) => (
              <ProductCard product={product} key={product.title} />
            ))}
          </div>
        )
      ) : (
        <p className="store-empty" aria-live="polite">
          Nothing in this category yet. Sign up below to hear when something new is added.
        </p>
      )}
    </>
  );
}
