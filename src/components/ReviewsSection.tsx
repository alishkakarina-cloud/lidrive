import { useState } from "react";
import { ArrowRight } from "lucide-react";
import StarRating from "./StarRating";
import ResponsiveImage from "./ResponsiveImage";
import { WIDTHS_CARD } from "../lib/images";
import { REVIEWS } from "../lib/products";

export default function ReviewsSection() {
  const [showAll, setShowAll] = useState(false);
  const list = showAll ? [...REVIEWS, ...REVIEWS.map((r) => ({ ...r, id: r.id + "-b" }))] : REVIEWS;

  return (
    <section className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Отзывы клиентов</h2>
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="group flex items-center gap-1.5 text-sm font-medium text-fg-dim hover:text-fg"
        >
          {showAll ? "Свернуть" : "Смотреть все"}
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((r) => (
          <article key={r.id} className="rounded-2xl border border-white/8 bg-panel p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <img
                src={`https://i.pravatar.cc/96?img=${r.avatarSeed}`}
                alt={r.name}
                width={44}
                height={44}
                loading="lazy"
                className="h-11 w-11 rounded-full bg-neutral-800 object-cover"
              />
              <div>
                <p className="text-sm font-semibold">{r.name}</p>
                <p className="text-xs text-fg-mute">{r.model}</p>
              </div>
              <div className="ml-auto">
                <StarRating rating={r.rating} />
              </div>
            </div>
            <p className="mt-4 text-sm text-fg-dim">{r.text}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {r.photos.map((p) => (
                <ResponsiveImage
                  key={p}
                  id={p}
                  alt={`Фото от клиента ${r.name}`}
                  widths={WIDTHS_CARD}
                  sizes="(max-width: 768px) 45vw, 20vw"
                  aspect="4/3"
                  className="w-full rounded-xl object-cover"
                />
              ))}
            </div>
          </article>
        ))}
      </div>

      <blockquote className="mt-12 text-center text-2xl font-semibold italic tracking-tight text-fg-dim text-balance sm:text-4xl">
        «Детали создают большую картину.»
      </blockquote>
    </section>
  );
}
