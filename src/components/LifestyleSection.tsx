import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ResponsiveImage from "./ResponsiveImage";
import { PHOTO, WIDTHS_WIDE } from "../lib/images";

export default function LifestyleSection({ page = false }: { page?: boolean }) {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-3xl border border-line">
        <ResponsiveImage
          id={PHOTO.familyHome}
          alt="Lixiang L9 на городской улице"
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
          {!page && (
            <Link
              to="/about"
              className="group mt-6 flex w-fit items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold hover:bg-white/5"
            >
              Узнать больше
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
