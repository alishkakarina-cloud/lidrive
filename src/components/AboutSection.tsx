import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ResponsiveImage from "./ResponsiveImage";
import { PHOTO, WIDTHS_WIDE } from "../lib/images";

const STATS = [
  { value: "1000+", label: "довольных клиентов" },
  { value: "3 года", label: "на рынке" },
  { value: "98%", label: "положительных отзывов" },
];

export default function AboutSection({ page = false }: { page?: boolean }) {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10">
      <div className="grid overflow-hidden rounded-3xl border border-white/8 bg-panel lg:grid-cols-[1.2fr_1fr]">
        <div className="p-6 sm:p-10 lg:p-14">
          {page ? null : <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">О бренде</h2>}
          <p className={`max-w-xl text-fg-dim ${page ? "" : "mt-5"}`}>
            LI DRIVE — специализированный магазин и сервис для автомобилей Lixiang. Мы помогаем владельцам получить
            максимум от своего автомобиля: качественные аксессуары, профессиональную установку, русификацию и полную
            техническую поддержку.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold tracking-tight sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-xs text-fg-mute">{s.label}</div>
              </div>
            ))}
          </div>

          {page ? (
            <p className="mt-8 max-w-xl text-sm text-fg-dim">
              Мы начинали как небольшая мастерская для владельцев первых Lixiang в Бишкеке. Сегодня LI DRIVE — это
              магазин аксессуаров, сервисный центр и команда, которая знает эти автомобили до последнего винтика.
            </p>
          ) : (
            <Link
              to="/about"
              className="group mt-8 flex w-fit items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold hover:bg-white/8"
            >
              Наша история
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>

        <div className="relative min-h-[300px]">
          <ResponsiveImage
            id={PHOTO.interiorDetail}
            alt="Деталь интерьера Lixiang"
            widths={WIDTHS_WIDE}
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-panel via-panel/30 to-transparent" />
          <p className="absolute bottom-6 left-6 right-6 text-sm italic text-fg-dim">«Детали создают большую картину.»</p>
        </div>
      </div>
    </section>
  );
}
