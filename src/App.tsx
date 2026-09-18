import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import RussificationPage from "./pages/RussificationPage";
import ServicePage from "./pages/ServicePage";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import ReviewsPage from "./pages/ReviewsPage";
import AccessoriesPage from "./pages/AccessoriesPage";
import { DeliveryPage, WarrantyPage } from "./pages/InfoPages";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function Inner({ children }: { children: React.ReactNode }) {
  return <div className="pt-[72px]">{children}</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <UIProvider>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <div className="fixed inset-x-0 top-0 z-50">
              <Header />
            </div>
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Inner><Catalog /></Inner>} />
                <Route path="/product/:slug" element={<Inner><Product /></Inner>} />
                <Route path="/accessories" element={<Inner><AccessoriesPage /></Inner>} />
                <Route path="/russification" element={<Inner><RussificationPage /></Inner>} />
                <Route path="/service" element={<Inner><ServicePage /></Inner>} />
                <Route path="/about" element={<Inner><AboutPage /></Inner>} />
                <Route path="/contacts" element={<Inner><ContactsPage /></Inner>} />
                <Route path="/reviews" element={<Inner><ReviewsPage /></Inner>} />
                <Route path="/delivery" element={<Inner><DeliveryPage /></Inner>} />
                <Route path="/warranty" element={<Inner><WarrantyPage /></Inner>} />
                <Route path="*" element={<Inner><NotFound /></Inner>} />
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
