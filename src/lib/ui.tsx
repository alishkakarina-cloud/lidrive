import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

interface Toast {
  id: number;
  message: string;
}

interface UIContextValue {
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  videoOpen: boolean;
  setVideoOpen: (v: boolean) => void;
  bookingOpen: boolean;
  setBookingOpen: (v: boolean) => void;
  toasts: Toast[];
  showToast: (message: string) => void;
}

const UIContext = createContext<UIContextValue | null>(null);

let toastId = 0;

export function UIProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  return (
    <UIContext.Provider
      value={{
        cartOpen,
        setCartOpen,
        searchOpen,
        setSearchOpen,
        videoOpen,
        setVideoOpen,
        bookingOpen,
        setBookingOpen,
        toasts,
        showToast,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
