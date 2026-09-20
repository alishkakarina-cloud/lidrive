import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, ChevronLeft, ChevronRight, Languages, Play, Truck, Wrench } from "lucide-react";
import ResponsiveImage from "./ResponsiveImage";
import { PHOTO, WIDTHS_HERO } from "../lib/images";
import { useUI } from "../lib/ui";

const SLIDES = [
  { photo: PHOTO.heroL9, model: "LIXIANG L9" },
  { photo: PHOTO.heroL8, model: "LIXIANG L8" },
  { photo: PHOTO.heroL7, model: "LIXIANG L7" },
];

const PERKS = [
  { icon: BadgeCheck, label: "Оригинальные аксессуары" },
  { icon: Wrench, label: "Профессиональный сервис" },
  { icon: Languages, label: "Русификация и ПО" },
  { icon: Truck, label: "Быстрая доставка по КР и СНГ" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { setVideoOpen } = useUI();

  const go = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => go(index + 1), 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index, paused, go]);

  return (
    <section
      className="relative h-[92vh] min-h-[640px] w-full overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.photo}
          className="absolute inset-0 transition-opacity duration-1000 ease-out"
          style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? "auto" : "none" }}
          aria-hidden={i !== index}
        >
          <ResponsiveImage
            id={slide.photo}
            alt={slide.model}
            widths={WIDTHS_HERO}
            sizes="100vw"
            priority={i === 0}
            className="h-full w-full object-cover object-[75%_center] lg:object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/10 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/80 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-4 pb-10 pt-28 sm:px-6 lg:px-10 lg:pb-14">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-2xl animate-fade-up">
            <h1 className="text-[8.4vw] font-extrabold leading-[0.92] tracking-tight sm:text-5xl lg:text-6xl">
              KIBER SMART AUTO
            </h1>
            <p className="mt-1 text-2xl font-semibold leading-tight text-balance sm:text-4xl lg:text-5xl">
              Больше, чем просто автомобиль.
            </p>
            <p className="mt-5 max-w-md text-sm text-fg-dim sm:text-base">
              Официальные аксессуары. Профессиональный сервис. Русификация. Всё для вашего Lixiang — в одном месте.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/catalog"
                className="group flex items-center gap-2 rounded-full bg-accent hover:bg-accent-hover px-6 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.03] active:scale-95"
              >
                Перейти в каталог
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="flex items-center gap-2 rounded-full border border-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent"
              >
                <Play size={15} className="fill-white" />
                Смотреть видео
              </button>
            </div>
          </div>

          <p className="hidden max-w-[220px] text-right text-sm italic text-fg-dim lg:block">
            «Технологии для комфортной жизни.»
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:flex sm:flex-wrap sm:items-center sm:gap-10">
            {PERKS.map((perk) => (
              <div key={perk.label} className="flex items-center gap-2.5">
                <perk.icon size={18} className="shrink-0 text-fg-dim" />
                <span className="text-xs text-fg-dim sm:text-sm">{perk.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-line pt-5">
            <span className="font-mono text-sm text-fg-dim">
              {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
            </span>
            <span className="text-sm font-semibold tracking-wide">{SLIDES[index].model}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Предыдущий слайд"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-accent text-white transition-colors hover:bg-accent"
              >
                <ChevronLeft size={17} />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Следующий слайд"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-accent text-white transition-colors hover:bg-accent"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
