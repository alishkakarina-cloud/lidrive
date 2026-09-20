import { Link } from "react-router-dom";
import { BadgeCheck, Headset, Languages, Wrench } from "lucide-react";
import PageHeader from "../components/PageHeader";
import AboutSection from "../components/AboutSection";
import LifestyleSection from "../components/LifestyleSection";
import { BookingCta, FeatureGrid, SectionTitle, Wrap } from "../components/Blocks";

const VALUES = [
  { icon: BadgeCheck, title: "Оригинальные аксессуары", text: "Только качественные аксессуары, подобранные под конкретные модели Lixiang." },
  { icon: Wrench, title: "Профессиональная установка", text: "Устанавливаем аккуратно и в срок — с гарантией на работы." },
  { icon: Languages, title: "Русификация и ПО", text: "Русский язык, приложения и обновления без потери гарантии." },
  { icon: Headset, title: "Техническая поддержка", text: "Остаёмся на связи после покупки и установки." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Главная", href: "/" }, { label: "О нас" }]}
        title="О бренде KIBER SMART AUTO"
        subtitle="Специализированный магазин и сервис для автомобилей Lixiang."
      />
      <AboutSection page />
      <Wrap>
        <SectionTitle>Наши принципы</SectionTitle>
        <FeatureGrid items={VALUES} />
      </Wrap>
      <LifestyleSection page />
      <Wrap>
        <div className="mb-6 flex flex-wrap gap-3">
          <Link to="/catalog" className="rounded-full bg-accent hover:bg-accent-hover px-6 py-3 text-sm font-semibold text-white hover:scale-[1.03] transition">
            Перейти в каталог
          </Link>
          <Link to="/reviews" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold hover:bg-white/5">
            Отзывы клиентов
          </Link>
        </div>
        <BookingCta title="Есть вопросы о Lixiang?" text="Запишитесь на консультацию — расскажем об аксессуарах, русификации и сервисе." />
      </Wrap>
      <div className="pb-16" />
    </>
  );
}
