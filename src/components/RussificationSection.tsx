import { useState } from "react";
import { ArrowRight, CalendarCheck, ChevronDown, LifeBuoy, ShieldCheck } from "lucide-react";
import ResponsiveImage from "./ResponsiveImage";
import { PHOTO, WIDTHS_CARD, WIDTHS_WIDE } from "../lib/images";
import { useUI } from "../lib/ui";

const PERKS = [
  { icon: CalendarCheck, label: "Установка за 1 день" },
  { icon: ShieldCheck, label: "Сохранение гарантии" },
  { icon: LifeBuoy, label: "Поддержка после установки" },
];

const APPS = ["Яндекс Навигатор", "Яндекс Музыка", "2ГИС", "Яндекс Карты", "Кинопоиск", "Голосовой помощник"];

const DETAILS = [
  "Полный русский интерфейс мультимедиа и приборной панели",
  "Яндекс Навигатор, Яндекс Музыка, 2ГИС и другие приложения",
  "Голосовое управление на русском языке",
  "Актуальные обновления ПО без потери гарантии",
];

export default function RussificationSection() {
  const [open, setOpen] = useState(false);
  const { setBookingOpen } = useUI();

  return (
    <section id="russification" className="mx-auto max-w-[1600px] scroll-mt-20 px-4 py-10 sm:px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-3xl border border-white/8">
        <ResponsiveImage
          id={PHOTO.rearMountain}
          alt="Lixiang на фоне гор на закате"
          widths={WIDTHS_WIDE}
          sizes="(max-width: 1600px) 100vw, 1600px"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />

        <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">Русификация Lixiang</h2>
            <p className="mt-4 max-w-md text-fg-dim">
              Полная адаптация под ваш регион. Русский язык, приложения, голосовое управление и регулярные
              обновления.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="group flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-95"
              >
                Подробнее
                {open ? (
                  <ChevronDown size={16} className="rotate-180 transition-transform" />
                ) : (
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold hover:bg-white/5"
              >
                Записаться на установку
              </button>
            </div>

            {open && (
              <ul className="animate-fade-up mt-6 flex max-w-md flex-col gap-2.5">
                {DETAILS.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm text-fg-dim">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="glass relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl p-3 shadow-2xl">
            <div className="relative overflow-hidden rounded-xl">
              <ResponsiveImage
                id={PHOTO.dashboardScreen}
                alt="Экран мультимедиа Lixiang с русским интерфейсом"
                widths={WIDTHS_CARD}
                sizes="(max-width: 1024px) 90vw, 40vw"
                aspect="16/10"
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4">
                <p className="text-lg font-semibold">Добро пожаловать</p>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {APPS.map((app) => (
                    <span
                      key={app}
                      className="glass-strong flex h-14 items-center justify-center rounded-xl px-2 text-center text-[10px] font-medium leading-tight sm:h-16 sm:text-xs"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 px-6 py-6 sm:px-10 lg:px-14">
          {PERKS.map((perk) => (
            <div key={perk.label} className="flex items-center gap-2.5 text-sm text-fg-dim">
              <perk.icon size={18} />
              {perk.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
