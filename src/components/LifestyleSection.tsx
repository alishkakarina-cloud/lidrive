import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ResponsiveImage from "./ResponsiveImage";
import { PHOTO, WIDTHS_WIDE } from "../lib/images";

export default function LifestyleSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-3xl border border-white/8">
        <ResponsiveImage
          id={PHOTO.familyHome}
          alt="Семья рядом с Lixiang у дома"
          widths={WIDTHS_WIDE}
          sizes="(max-width: 1600px) 100vw, 1600px"
          aspect="21/9"
          className="min-h-[460px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-10 lg:p-14">
          <h2 className="text-4xl font-extrabold leading-none tracking-tight sm:text-6xl">LIXIANG</h2>
          <p className="mt-1 text-xl font-semibold uppercase sm:text-3xl">Создан для жизни</p>
          <p className="mt-4 max-w-xs text-sm text-fg-dim sm:text-base">
            Простор. Технологии. Комфорт. Всё, что действительно важно.
          </p>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="group mt-6 flex w-fit items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold hover:bg-white/8"
          >
            Узнать больше
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>
          {open && (
            <p className="animate-fade-up mt-4 max-w-sm text-sm text-fg-dim">
              Просторный семейный салон, запас хода для дальних поездок и умные технологии — Lixiang
              подстраивается под ваш ритм жизни. Мы подберём аксессуары и сервис так, чтобы каждая поездка была комфортной.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
