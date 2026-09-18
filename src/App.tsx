import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./lib/cart";
import { UIProvider } from "./lib/ui";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import SearchOverlay from "./components/SearchOverlay";
import VideoModal from "./components/VideoModal";
import BookingModal from "./components/BookingModal";
import ToastStack from "./components/ToastStack";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";

export default function App() {
  return (
    <BrowserRouter>
      <UIProvider>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <div className="fixed inset-x-0 top-0 z-50">
              <Header />
            </div>
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<CatalogWithOffset />} />
                <Route path="/product/:slug" element={<ProductWithOffset />} />
                <Route path="*" element={<CatalogWithOffset />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <CartDrawer />
          <SearchOverlay />
          <VideoModal />
          <BookingModal />
          <ToastStack />
        </CartProvider>
      </UIProvider>
    </BrowserRouter>
  );
}

function CatalogWithOffset() {
  return (
    <div className="pt-[72px]">
      <Catalog />
    </div>
  );
}

function ProductWithOffset() {
  return (
    <div className="pt-[72px]">
      <Product />
    </div>
  );
}
