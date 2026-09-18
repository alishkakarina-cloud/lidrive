import { Link } from "react-router-dom";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon, TelegramIcon, YoutubeIcon } from "./SocialIcons";

export default function ContactSection({ page = false }: { page?: boolean }) {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10">
      <div className="grid overflow-hidden rounded-3xl border border-white/8 bg-panel lg:grid-cols-2">
        <div className="p-6 sm:p-10 lg:p-14">
          {page ? null : <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Контакты</h2>}

          <ul className={`flex flex-col gap-5 text-sm ${page ? "" : "mt-8"}`}>
            <li className="flex items-start gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-fg-dim" />
              <div>
                <a href="tel:+996700123456" className="font-medium hover:text-accent">
                  +996 700 123 456
                </a>
                <p className="text-xs text-fg-mute">(WhatsApp, Telegram)</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-fg-dim" />
              <a href="mailto:info@lidrive.kg" className="font-medium hover:text-accent">
                info@lidrive.kg
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-fg-dim" />
              <div>
                <p className="font-medium">Бишкек, ул. Киевская 123</p>
                <p className="text-xs text-fg-mute">(ТЦ Asia Mall)</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-fg-dim" />
              <p className="font-medium">Пн–Вс: 09:00–21:00</p>
            </li>
          </ul>

          <div className="mt-8 flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-fg-dim transition-colors hover:border-accent hover:text-accent"
            >
              <InstagramIcon size={17} />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-fg-dim transition-colors hover:border-accent hover:text-accent"
            >
              <TelegramIcon size={17} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-fg-dim transition-colors hover:border-accent hover:text-accent"
            >
              <YoutubeIcon size={18} />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-6 pt-0 sm:p-10 sm:pt-0 lg:p-14 lg:pl-0">
          <div className="relative min-h-[280px] flex-1 overflow-hidden rounded-2xl border border-white/8">
            <iframe
              title="Карта LI DRIVE — Бишкек, ул. Киевская 123"
              src="https://www.openstreetmap.org/export/embed.html?bbox=74.5850%2C42.8680%2C74.6150%2C42.8850&layer=mapnik&marker=42.8765%2C74.6000"
              loading="lazy"
              className="absolute inset-0 h-full w-full border-0 grayscale invert-[.92] contrast-[.9]"
            />
            <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-ink shadow-lg">
              LI DRIVE
            </div>
          </div>
          {!page && (
            <Link
              to="/contacts"
              className="group flex items-center justify-center gap-2 rounded-full border border-white/25 py-3.5 text-sm font-semibold hover:bg-white/8"
            >
              Написать нам
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
