import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart, formatPrice } from "../lib/cart";
import { useUI } from "../lib/ui";
import { PRODUCTS } from "../lib/products";
import ResponsiveImage from "./ResponsiveImage";
import { WIDTHS_CARD } from "../lib/images";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, showToast } = useUI();
  const { lines, setQty, removeLine, totalPrice, clear } = useCart();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cartOpen, setCartOpen]);

  if (!cartOpen) return null;

  const items = lines
    .map((line) => ({ line, product: PRODUCTS.find((p) => p.id === line.productId) }))
    .filter((x): x is { line: typeof lines[number]; product: NonNullable<typeof x.product> } => !!x.product);

  return (
    <div className="fixed inset-0 z-[90] flex justify-end">
      <button
        aria-label="Закрыть корзину"
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        onClick={() => setCartOpen(false)}
      />
      <div className="animate-fade-up relative flex h-full w-full max-w-md flex-col border-l border-line bg-ink">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="text-lg font-semibold">Корзина</h2>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            aria-label="Закрыть"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-elevated"
          >
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag size={32} className="text-fg-mute" />
            <p className="text-fg-dim">Корзина пуста</p>
            <Link
              to="/catalog"
              onClick={() => setCartOpen(false)}
              className="mt-2 rounded-full bg-accent hover:bg-accent-hover px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-105"
            >
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="flex flex-col gap-4">
                {items.map(({ line, product }) => (
                  <li key={`${line.productId}-${line.color}`} className="flex gap-3">
                    <Link
                      to={`/product/${product.slug}`}
                      onClick={() => setCartOpen(false)}
                      className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-panel"
                    >
                      <ResponsiveImage
                        id={product.image}
                        alt={product.name}
                        widths={WIDTHS_CARD}
                        sizes="80px"
                        aspect="1/1"
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${product.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="text-sm font-medium leading-snug hover:text-tint"
                        >
                          {product.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeLine(line.productId, line.color)}
                          aria-label="Удалить"
                          className="shrink-0 text-fg-mute hover:text-fg"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <span className="mt-0.5 text-xs text-fg-mute">Цвет: {line.color}</span>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-line px-1">
                          <button
                            type="button"
                            onClick={() => setQty(line.productId, line.color, line.qty - 1)}
                            aria-label="Уменьшить количество"
                            className="flex h-7 w-7 items-center justify-center text-fg-dim hover:text-fg"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-4 text-center text-sm">{line.qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(line.productId, line.color, line.qty + 1)}
                            aria-label="Увеличить количество"
                            className="flex h-7 w-7 items-center justify-center text-fg-dim hover:text-fg"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <span className="text-sm font-semibold">{formatPrice(product.price * line.qty)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-line px-6 py-5">
              <div className="mb-4 flex items-center justify-between text-base">
                <span className="text-fg-dim">Итого</span>
                <span className="text-xl font-bold">{formatPrice(totalPrice)}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  showToast("Заявка на заказ отправлена менеджеру KIBER SMART AUTO");
                  clear();
                  setCartOpen(false);
                }}
                className="w-full rounded-full bg-accent hover:bg-accent-hover py-3.5 text-sm font-semibold text-white transition hover:scale-[1.02] active:scale-[0.98]"
              >
                Оформить заказ
              </button>
              <p className="mt-3 text-center text-xs text-fg-mute">
                Онлайн-оплата пока недоступна — менеджер свяжется с вами для подтверждения и доставки.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
