import { ArrowRight, Cpu, Download, Languages, ScanSearch, ShieldCheck, Wrench } from "lucide-react";
import ResponsiveImage from "./ResponsiveImage";
import { PHOTO, WIDTHS_WIDE } from "../lib/images";
import { useUI } from "../lib/ui";

const SERVICES = [
  { icon: ScanSearch, label: "Диагностика" },
  { icon: Wrench, label: "ТО и обслуживание" },
  { icon: Cpu, label: "Установка аксессуаров" },
  { icon: Download, label: "Обновление ПО" },
  { icon: Languages, label: "Русификация" },
  { icon: ShieldCheck, label: "Гарантия на работы" },
];

export default function ServiceSection() {
  const { setBookingOpen } = useUI();

  return (
    <section id="service" className="mx-auto max-w-[1600px] scroll-mt-20 px-4 py-10 sm:px-6 lg:px-10">
      <div className="grid overflow-hidden rounded-3xl border border-white/8 bg-panel lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">Сервисный центр</h2>
          <p className="mt-3 text-fg-dim">Профессиональное обслуживание Lixiang</p>

          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="group mt-6 flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-95"
          >
            Записаться
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {SERVICES.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setBookingOpen(true)}
                className="flex flex-col items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-3 py-5 text-center text-xs text-fg-dim transition-colors hover:border-white/25 hover:text-fg sm:text-sm"
              >
                <s.icon size={22} strokeWidth={1.5} />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[340px]">
          <ResponsiveImage
            id={PHOTO.mechanicWide}
            alt="Механик LI DRIVE обслуживает Lixiang"
            widths={WIDTHS_WIDE}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-panel via-transparent to-transparent lg:from-panel/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-6 right-6 text-right leading-none">
            <span className="block text-xl font-extrabold tracking-tight">LI DRIVE</span>
            <span className="mt-1 block text-[10px] font-semibold tracking-[0.35em] text-fg-dim">SERVICE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
