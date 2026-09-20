import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Car, ChevronDown, Search } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductCard from "../components/ProductCard";
import { CATALOG_CATEGORIES, MODELS, PRODUCTS } from "../lib/products";
import { useUI } from "../lib/ui";

type Sort = "popular" | "price-asc" | "price-desc" | "rating";

const SORT_LABELS: Record<Sort, string> = {
  popular: "Популярное",
  "price-asc": "Сначала дешевле",
  "price-desc": "Сначала дороже",
  rating: "По рейтингу",
};

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? "all";
  const model = params.get("model") ?? "L9";
  const query = params.get("q") ?? "";
  const [sort, setSort] = useState<Sort>("popular");
  const [sortOpen, setSortOpen] = useState(false);
  const { setBookingOpen } = useUI();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value === null || value === "") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      if (category !== "all" && p.categoryId !== category) return false;
      if (model !== "all" && !p.models.includes(model)) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
    const sorted = [...list];
    if (sort === "popular") sorted.sort((a, b) => b.popularity - a.popularity);
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [category, model, query, sort]);

  const isServiceCategory = category === "service" || category === "russification";

  return (
    <div className="mx-auto max-w-[1600px] px-4 pb-24 pt-10 sm:px-6 lg:px-10">
      <Breadcrumbs items={[{ label: "Каталог", href: "/catalog" }, { label: "Каталог" }]} />
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Каталог</h1>
      <p className="mt-2 text-fg-dim">Выберите модель Lixiang и найдите подходящие аксессуары</p>

      <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {["all", ...MODELS].map((m) => {
          const active = model === m;
          return (
            <button
              key={m}
              type="button"
              onClick={() => update("model", m)}
              aria-pressed={active}
              className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-sm font-medium transition-colors ${
                active ? "border-tint bg-elevated text-fg" : "border-line text-fg-dim hover:border-accent"
              }`}
            >
              <Car size={26} strokeWidth={1.3} />
              {m === "all" ? "Все" : m}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="min-w-0">
          <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
            {CATALOG_CATEGORIES.map((c) => {
              const active = category === c.id;
              return (
                <li key={c.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => update("category", c.id === "all" ? null : c.id)}
                    aria-pressed={active}
                    className={`flex w-full items-center justify-between gap-3 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm transition-colors ${
                      active ? "bg-accent hover:bg-accent-hover text-white font-semibold" : "text-fg-dim hover:bg-elevated hover:text-fg"
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className={active ? "text-white/70" : "text-fg-mute"}>({c.count})</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="min-w-0">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative">
              <button
                type="button"
                onClick={() => setSortOpen((v) => !v)}
                aria-expanded={sortOpen}
                className="flex items-center gap-2 text-sm text-fg-dim hover:text-fg"
              >
                Сортировать: <span className="font-medium text-fg">{SORT_LABELS[sort]}</span>
                <ChevronDown size={15} />
              </button>
              {sortOpen && (
                <>
                  <button
                    aria-label="Закрыть"
                    className="fixed inset-0 z-30 cursor-default"
                    onClick={() => setSortOpen(false)}
                  />
                  <ul className="glass-strong absolute left-0 z-40 mt-2 w-52 overflow-hidden rounded-xl border border-line py-1 shadow-2xl">
                    {(Object.keys(SORT_LABELS) as Sort[]).map((s) => (
                      <li key={s}>
                        <button
                          type="button"
                          onClick={() => {
                            setSort(s);
                            setSortOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-elevated ${
                            sort === s ? "text-tint" : "text-fg-dim"
                          }`}
                        >
                          {SORT_LABELS[s]}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <label className="relative block sm:w-72">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-mute" />
              <input
                value={query}
                onChange={(e) => update("q", e.target.value)}
                placeholder="Поиск товаров…"
                className="w-full rounded-xl border border-line bg-panel py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-fg-mute focus:border-accent-hover"
              />
            </label>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-panel px-6 py-16 text-center">
              <p className="text-lg font-semibold">
                {isServiceCategory ? "Это услуга, а не товар" : "Ничего не найдено"}
              </p>
              <p className="max-w-sm text-sm text-fg-dim">
                {isServiceCategory
                  ? "Запишитесь в сервисный центр — подберём удобное время и всё сделаем под ключ."
                  : "Попробуйте изменить фильтры или поисковый запрос."}
              </p>
              {isServiceCategory ? (
                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="mt-2 rounded-full bg-accent hover:bg-accent-hover px-6 py-3 text-sm font-semibold text-white"
                >
                  Записаться
                </button>
              ) : (
                <Link
                  to="/catalog"
                  className="mt-2 rounded-full bg-accent hover:bg-accent-hover px-6 py-3 text-sm font-semibold text-white"
                  onClick={() => setSort("popular")}
                >
                  Сбросить фильтры
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
