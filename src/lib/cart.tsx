import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS } from "./products";

export interface CartLine {
  productId: string;
  color: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  favorites: string[];
}

const STORAGE_KEY = "lidrive_cart_v1";

function loadState(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lines: [], favorites: [] };
    const parsed = JSON.parse(raw);
    return { lines: parsed.lines ?? [], favorites: parsed.favorites ?? [] };
  } catch {
    return { lines: [], favorites: [] };
  }
}

interface CartContextValue {
  lines: CartLine[];
  favorites: string[];
  addToCart: (productId: string, color: string, qty?: number) => void;
  removeLine: (productId: string, color: string) => void;
  setQty: (productId: string, color: string, qty: number) => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  totalCount: number;
  totalPrice: number;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>(() => loadState());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable — cart stays session-only */
    }
  }, [state]);

  const addToCart = (productId: string, color: string, qty = 1) => {
    setState((prev) => {
      const existing = prev.lines.find((l) => l.productId === productId && l.color === color);
      if (existing) {
        return {
          ...prev,
          lines: prev.lines.map((l) =>
            l.productId === productId && l.color === color ? { ...l, qty: l.qty + qty } : l,
          ),
        };
      }
      return { ...prev, lines: [...prev.lines, { productId, color, qty }] };
    });
  };

  const removeLine = (productId: string, color: string) => {
    setState((prev) => ({
      ...prev,
      lines: prev.lines.filter((l) => !(l.productId === productId && l.color === color)),
    }));
  };

  const setQty = (productId: string, color: string, qty: number) => {
    setState((prev) => ({
      ...prev,
      lines: qty <= 0
        ? prev.lines.filter((l) => !(l.productId === productId && l.color === color))
        : prev.lines.map((l) =>
            l.productId === productId && l.color === color ? { ...l, qty } : l,
          ),
    }));
  };

  const toggleFavorite = (productId: string) => {
    setState((prev) => ({
      ...prev,
      favorites: prev.favorites.includes(productId)
        ? prev.favorites.filter((id) => id !== productId)
        : [...prev.favorites, productId],
    }));
  };

  const clear = () => setState((prev) => ({ ...prev, lines: [] }));

  const { totalCount, totalPrice } = useMemo(() => {
    let count = 0;
    let price = 0;
    for (const line of state.lines) {
      const product = PRODUCTS.find((p) => p.id === line.productId);
      if (!product) continue;
      count += line.qty;
      price += product.price * line.qty;
    }
    return { totalCount: count, totalPrice: price };
  }, [state.lines]);

  const value: CartContextValue = {
    lines: state.lines,
    favorites: state.favorites,
    addToCart,
    removeLine,
    setQty,
    toggleFavorite,
    isFavorite: (id) => state.favorites.includes(id),
    totalCount,
    totalPrice,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function formatPrice(value: number) {
  return `${value.toLocaleString("ru-RU")} сом`;
}
