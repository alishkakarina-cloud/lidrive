import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useCart } from "../lib/cart";
import { useUI } from "../lib/ui";

const NAV_LINKS = [
  { label: "Каталог", href: "/catalog" },
  { label: "Аксессуары", href: "/accessories" },
  { label: "Русификация", href: "/russification" },
  { label: "Сервис", href: "/service" },
  { label: "О нас", href: "/about" },
  { label: "Контакты", href: "/contacts" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { totalCount } = useCart();
  const { setCartOpen, setSearchOpen } = useUI();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onResize = () => window.innerWidth >= 1024 && setMobileOpen(false);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen]);

  const mobileMenu = (
    <div className="mobile-menu" data-open={mobileOpen} aria-hidden={!mobileOpen}>
      <div className="mx-auto flex h-18 max-w-[1600px] items-center justify-between px-4 sm:px-6">
        <span className="whitespace-nowrap text-lg font-extrabold tracking-tight">KIBER SMART AUTO</span>
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          aria-label="Закрыть меню"
          className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-elevated"
        >
          <X size={22} />
        </button>
      </div>
      <nav className="px-4 sm:px-6">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            onClick={() => setMobileOpen(false)}
            className="block border-b border-line py-4 text-xl font-medium"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <>
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-panel/95 backdrop-blur-xl" : "border-b border-line/60 bg-panel/70 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-[1600px] items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-10">
        <Link to="/" className="flex flex-col leading-none">
          <span className="whitespace-nowrap text-[15px] font-extrabold tracking-tight sm:text-lg">KIBER SMART AUTO</span>
          <span className="whitespace-nowrap text-[8px] font-semibold tracking-[0.24em] text-fg-mute sm:text-[9px] sm:tracking-[0.28em]">LIXIANG SPECIALIST</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-fg ${isActive ? "text-fg" : "text-fg-dim"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Поиск"
            className="flex h-10 w-10 items-center justify-center rounded-full text-fg-dim transition-colors hover:bg-elevated hover:text-fg"
          >
            <Search size={18} />
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((v) => !v)}
              aria-label="Профиль"
              aria-expanded={profileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full text-fg-dim transition-colors hover:bg-elevated hover:text-fg"
            >
              <User size={18} />
            </button>
            {profileOpen && (
              <>
                <button
                  aria-label="Закрыть"
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setProfileOpen(false)}
                />
                <div className="glass-strong absolute right-0 z-50 mt-2 w-64 rounded-2xl border border-line p-4 text-sm shadow-2xl">
                  <p className="font-semibold">Личный кабинет</p>
                  <p className="mt-1 text-fg-dim">
                    Вход и история заказов появятся здесь в ближайшее время. Пока свяжитесь с нами напрямую.
                  </p>
                  <Link
                    to="/contacts"
                    onClick={() => setProfileOpen(false)}
                    className="mt-3 inline-block text-tint hover:underline"
                  >
                    Написать нам →
                  </Link>
                </div>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label="Корзина"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-fg-dim transition-colors hover:bg-elevated hover:text-fg"
          >
            <ShoppingCart size={18} />
            {totalCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                {totalCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Меню"
            className="flex h-10 w-10 items-center justify-center rounded-full text-fg-dim hover:bg-elevated hover:text-fg lg:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

    </header>
    {createPortal(mobileMenu, document.body)}
    </>
  );
}
