import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle2, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
import ResponsiveImage from "../components/ResponsiveImage";
import StarRating from "../components/StarRating";
import { WIDTHS_CARD, WIDTHS_WIDE } from "../lib/images";
import { categoryLabel, findProduct } from "../lib/products";
import { formatPrice, useCart } from "../lib/cart";
import { useUI } from "../lib/ui";

export default function Product() {
  const { slug = "" } = useParams();
  const product = findProduct(slug);
  const [active, setActive] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { showToast, setCartOpen } = useUI();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setActive(0);
    setColorIdx(0);
    setQty(1);
  }, [slug]);

  if (!product) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-6 py-32 text-center">
        <h1 className="text-3xl font-bold">Товар не найден</h1>
        <p className="text-fg-dim">Возможно, ссылка устарела. Вернитесь в каталог и выберите другой товар.</p>
        <Link to="/catalog" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink">
          В каталог
        </Link>
      </div>
    );
  }

  const color = product.colors[colorIdx];

  const add = () => {
    addToCart(product.id, color.name, qty);
    showToast(`«${product.name}» добавлен в корзину`);
  };

  return (
    <div className="mx-auto max-w-[1600px] px-4 pb-24 pt-10 sm:px-6 lg:px-10">
      <Breadcrumbs
        items={[
          { label: "Каталог", href: "/catalog" },
          { label: categoryLabel(product.categoryId), href: `/catalog?category=${product.categoryId}` },
          { label: product.name },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        <div>
          <div className="overflow-hidden rounded-2xl border border-white/8 bg-panel">
            <ResponsiveImage
              id={product.gallery[active]}
              alt={product.name}
              widths={WIDTHS_WIDE}
              sizes="(max-width: 1024px) 100vw, 55vw"
              aspect="1/1"
              priority
              className="w-full object-cover"
            />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
            {product.gallery.map((g, i) => (
              <button
                key={g + i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Фото ${i + 1}`}
                aria-pressed={i === active}
                className={`overflow-hidden rounded-xl border-2 transition-colors ${
                  i === active ? "border-white" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <ResponsiveImage
                  id={g}
                  alt=""
                  widths={WIDTHS_CARD}
                  sizes="120px"
                  aspect="1/1"
                  className="w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <StarRating rating={product.rating} />
            <span className="text-fg-dim">
              {product.rating} ({product.reviewsCount} отзыва)
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-3xl font-bold tracking-tight">{formatPrice(product.price)}</span>
            {product.inStock && (
              <span className="flex items-center gap-1.5 rounded-full bg-accent-dim px-3 py-1 text-xs font-semibold text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />В наличии
              </span>
            )}
          </div>

          <p className="mt-4 text-sm text-fg-dim">
            Совместимость: <span className="text-fg">{product.compatibility}</span>
          </p>

          <ul className="mt-6 flex flex-col gap-2.5">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm">
                <CheckCircle2 size={17} className="shrink-0 fill-white text-ink" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <p className="text-sm text-fg-dim">
              Цвет: <span className="text-fg">{color.name}</span>
            </p>
            <div className="mt-2.5 flex items-center gap-3">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColorIdx(i)}
                  aria-label={c.name}
                  aria-pressed={i === colorIdx}
                  className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                    i === colorIdx ? "border-white ring-2 ring-white/30" : "border-white/20"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-white/15">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Уменьшить количество"
                className="flex h-11 w-11 items-center justify-center text-fg-dim hover:text-fg"
              >
                <Minus size={15} />
              </button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                aria-label="Увеличить количество"
                className="flex h-11 w-11 items-center justify-center text-fg-dim hover:text-fg"
              >
                <Plus size={15} />
              </button>
            </div>
            <button
              type="button"
              onClick={add}
              className="flex-1 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-white/8 sm:flex-none"
            >
              В корзину
            </button>
            <button
              type="button"
              onClick={() => {
                addToCart(product.id, color.name, qty);
                setCartOpen(true);
              }}
              className="flex-1 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-95 sm:flex-none"
            >
              Купить в 1 клик
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/8 pt-6 text-sm text-fg-dim">
            <div className="flex items-center gap-3">
              <Truck size={18} />
              {product.delivery}
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} />
              {product.warranty}
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-fg-dim">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
