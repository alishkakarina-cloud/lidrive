import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import ResponsiveImage from "./ResponsiveImage";
import { WIDTHS_CARD } from "../lib/images";
import { useCart, formatPrice } from "../lib/cart";
import { useUI } from "../lib/ui";
import type { Product } from "../lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const { showToast } = useUI();
  const favorite = isFavorite(product.id);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-panel transition-colors hover:border-white/20">
      <Link to={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-neutral-900">
        <ResponsiveImage
          id={product.image}
          alt={product.name}
          widths={WIDTHS_CARD}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"
          aspect="1/1"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(product.id);
          }}
          aria-pressed={favorite}
          aria-label={favorite ? "Убрать из избранного" : "В избранное"}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full glass-strong text-white transition-transform hover:scale-105"
        >
          <Heart size={16} className={favorite ? "fill-accent text-accent" : ""} />
        </button>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link to={`/product/${product.slug}`} className="text-sm font-medium leading-snug text-fg hover:text-accent">
          {product.name}
        </Link>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-base font-semibold tracking-tight">{formatPrice(product.price)}</span>
          <button
            type="button"
            onClick={() => {
              addToCart(product.id, product.colors[0]?.name ?? "Чёрный", 1);
              showToast(`«${product.name}» добавлен в корзину`);
            }}
            aria-label="В корзину"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-transform hover:scale-105 active:scale-95"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
