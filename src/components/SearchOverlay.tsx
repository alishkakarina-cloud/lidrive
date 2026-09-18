import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { PRODUCTS } from "../lib/products";
import { useUI } from "../lib/ui";
import { formatPrice } from "../lib/cart";
import ResponsiveImage from "./ResponsiveImage";
import { WIDTHS_CARD } from "../lib/images";

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUI();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchOpen) {
      setQuery("");
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [searchOpen, setSearchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  if (!searchOpen) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    navigate(`/catalog?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="fixed inset-0 z-[95] flex flex-col">
      <button
        aria-label="Закрыть поиск"
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={() => setSearchOpen(false)}
      />
      <div className="relative mx-auto w-full max-w-2xl px-4 pt-24 sm:pt-32">
        <form onSubmit={submit} className="glass-strong flex items-center gap-3 rounded-2xl border border-white/12 px-5 py-4">
          <Search size={20} className="text-fg-mute" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск товаров и услуг…"
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-fg-mute"
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            aria-label="Закрыть"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/8"
          >
            <X size={18} />
          </button>
        </form>

        {results.length > 0 && (
          <div className="glass-strong mt-3 overflow-hidden rounded-2xl border border-white/10">
            {results.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.slug}`}
                onClick={() => setSearchOpen(false)}
                className="flex items-center gap-3 border-b border-white/6 px-4 py-3 last:border-none hover:bg-white/5"
              >
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-neutral-900">
                  <ResponsiveImage
                    id={p.image}
                    alt={p.name}
                    widths={WIDTHS_CARD}
                    sizes="48px"
                    aspect="1/1"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="flex-1 text-sm">{p.name}</span>
                <span className="text-sm font-semibold text-fg-dim">{formatPrice(p.price)}</span>
              </Link>
            ))}
          </div>
        )}
        {query && results.length === 0 && (
          <p className="mt-4 text-center text-sm text-fg-mute">Ничего не найдено по запросу «{query}»</p>
        )}
      </div>
    </div>
  );
}
