import { Link } from "react-router-dom";
import { InstagramIcon, TelegramIcon, YoutubeIcon } from "./SocialIcons";

const NAV = [
  { label: "Каталог", href: "/catalog" },
  { label: "Сервис", href: "/service" },
  { label: "Доставка", href: "/delivery" },
  { label: "Гарантия", href: "/warranty" },
  { label: "О нас", href: "/about" },
  { label: "Контакты", href: "/contacts" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto max-w-[1600px] px-4 py-14 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Link to="/" className="flex flex-col leading-none">
              <span className="text-xl font-extrabold tracking-tight">KIBER SMART AUTO</span>
              <span className="mt-1 text-[10px] font-semibold tracking-[0.28em] text-fg-mute">
                LIXIANG SPECIALIST
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-fg-mute">
              Официальные аксессуары, русификация и сервис для владельцев Lixiang в Кыргызстане.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
            {NAV.map((item) => (
              <Link key={item.label} to={item.href} className="text-sm text-fg-dim hover:text-fg">
                {item.label}
              </Link>
            ))}
          </nav>

          <div>
            <p className="text-sm text-fg-dim">Следите за нами:</p>
            <div className="mt-3 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg-dim transition-colors hover:border-soft hover:text-fg"
              >
                <InstagramIcon size={17} />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg-dim transition-colors hover:border-soft hover:text-fg"
              >
                <TelegramIcon size={17} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg-dim transition-colors hover:border-soft hover:text-fg"
              >
                <YoutubeIcon size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6 text-xs text-fg-mute">
          © 2025 KIBER SMART AUTO. Все права защищены. Создано с фокусом на качество.
        </div>
      </div>
    </footer>
  );
}
