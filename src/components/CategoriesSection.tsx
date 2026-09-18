import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ResponsiveImage from "./ResponsiveImage";
import { WIDTHS_CARD } from "../lib/images";
import { HOME_CATEGORIES } from "../lib/products";

export default function CategoriesSection() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-20 sm:px-6 lg:px-10">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Популярные категории</h2>
        <Link
          to="/catalog"
          className="group hidden shrink-0 items-center gap-1.5 text-sm font-medium text-fg-dim hover:text-fg sm:flex"
        >
          Смотреть все
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {HOME_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={cat.id === "russification" ? "/russification" : cat.id === "service" ? "/service" : `/catalog?category=${cat.id}`}
            className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl border border-white/8"
          >
            <ResponsiveImage
              id={cat.image}
              alt={cat.name}
              widths={WIDTHS_CARD}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              aspect="3/4"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
            <div className="relative flex items-end justify-between gap-2 p-4">
              <div>
                <h3 className="text-base font-semibold sm:text-lg">{cat.name}</h3>
                <p className="mt-1 text-xs text-fg-dim">{cat.description}</p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform group-hover:scale-110">
                <ArrowUpRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <Link to="/catalog" className="mt-6 flex items-center gap-1.5 text-sm font-medium text-fg-dim hover:text-fg sm:hidden">
        Смотреть все
        <ArrowRight size={15} />
      </Link>
    </section>
  );
}
