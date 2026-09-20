import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import ResponsiveImage from "../components/ResponsiveImage";
import { Wrap } from "../components/Blocks";
import { WIDTHS_CARD } from "../lib/images";
import { CATALOG_CATEGORIES, PRODUCTS } from "../lib/products";

const IDS = ["salon", "exterior", "electronics", "comfort", "protection"];

export default function AccessoriesPage() {
  const cats = CATALOG_CATEGORIES.filter((c) => IDS.includes(c.id));
  const popular = [...PRODUCTS].sort((a, b) => b.popularity - a.popularity).slice(0, 4);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Главная", href: "/" }, { label: "Аксессуары" }]}
        title="Аксессуары для Lixiang"
        subtitle="Выберите категорию — мы подобрали аксессуары под каждую модель."
      />
      <Wrap>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {cats.map((cat) => (
            <Link
              key={cat.id}
              to={`/catalog?category=${cat.id}`}
              className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl border border-line"
            >
              <ResponsiveImage
                id={cat.image}
                alt={cat.name}
                widths={WIDTHS_CARD}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                aspect="3/4"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
              <div className="relative flex items-end justify-between gap-2 p-4">
                <div>
                  <h3 className="text-base font-semibold sm:text-lg">{cat.name}</h3>
                  <p className="mt-1 text-xs text-fg-dim">{cat.description}</p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent hover:bg-accent-hover text-white transition group-hover:scale-110">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Wrap>
      <Wrap>
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Популярное</h2>
          <Link to="/catalog" className="group flex items-center gap-1.5 text-sm font-medium text-fg-dim hover:text-fg">
            Весь каталог
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {popular.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Wrap>
      <div className="pb-16" />
    </>
  );
}
