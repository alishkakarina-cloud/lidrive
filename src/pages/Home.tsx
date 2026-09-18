import Hero from "../components/Hero";
import CategoriesSection from "../components/CategoriesSection";
import RussificationSection from "../components/RussificationSection";
import ServiceSection from "../components/ServiceSection";
import LifestyleSection from "../components/LifestyleSection";
import AboutSection from "../components/AboutSection";
import ReviewsSection from "../components/ReviewsSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
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
