import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import CategoriesSection from "../components/CategoriesSection";
import RussificationSection from "../components/RussificationSection";
import ServiceSection from "../components/ServiceSection";
import LifestyleSection from "../components/LifestyleSection";
import AboutSection from "../components/AboutSection";
import ReviewsSection from "../components/ReviewsSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    const t = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <>
      <Hero />
      <CategoriesSection />
      <RussificationSection />
      <ServiceSection />
      <LifestyleSection />
      <AboutSection />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}
