import { Cpu, Download, Languages, ScanSearch, ShieldCheck, Wrench } from "lucide-react";
import PageHeader from "../components/PageHeader";
import ServiceSection from "../components/ServiceSection";
import Faq from "../components/Faq";
import { BookingCta, FeatureGrid, SectionTitle, Steps, Wrap } from "../components/Blocks";

const SERVICES = [
  { icon: ScanSearch, title: "Диагностика", text: "Проверяем системы автомобиля и находим причину неисправности до того, как она станет проблемой." },
  { icon: Wrench, title: "ТО и обслуживание", text: "Регулярное техническое обслуживание Lixiang по регламенту производителя." },
  { icon: Cpu, title: "Установка аксессуаров", text: "Аккуратно установим коврики, защиту, зарядки и другие аксессуары из нашего каталога." },
  { icon: Download, title: "Обновление ПО", text: "Обновляем программное обеспечение автомобиля до актуальных версий." },
  { icon: Languages, title: "Русификация", text: "Русский язык, приложения и голосовое управление — установка за 1 день." },
  { icon: ShieldCheck, title: "Гарантия на работы", text: "Мы отвечаем за качество выполненных работ и поддерживаем вас после визита." },
];

const STEPS = [
  { title: "Запись", text: "Выберите услугу и оставьте контакты — подберём удобное время." },
  { title: "Приёмка", text: "Осматриваем автомобиль и уточняем, что нужно сделать." },
  { title: "Работы", text: "Специалисты выполняют работы, вы следите за статусом." },
  { title: "Выдача", text: "Проверяем результат вместе с вами и передаём автомобиль." },
];

const FAQ = [
  { q: "Как записаться в сервис?", a: "Нажмите «Записаться», оставьте имя и телефон — менеджер свяжется с вами и согласует время." },
  { q: "Работаете ли вы в выходные?", a: "Да, мы работаем ежедневно с 09:00 до 21:00." },
  { q: "Можно ли установить аксессуары, купленные у вас?", a: "Конечно. Установку аксессуаров из каталога KIBER SMART AUTO выполняют наши специалисты." },
  { q: "Есть ли гарантия на работы?", a: "Да, на выполненные работы предоставляется гарантия." },
];

export default function ServicePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Главная", href: "/" }, { label: "Сервис" }]}
        title="Сервисный центр"
        subtitle="Профессиональное обслуживание Lixiang: диагностика, ТО, установка аксессуаров и ПО."
      />
      <ServiceSection page />
      <Wrap>
        <SectionTitle>Наши услуги</SectionTitle>
        <FeatureGrid items={SERVICES} />
      </Wrap>
      <Wrap>
        <SectionTitle>Как проходит визит</SectionTitle>
        <Steps items={STEPS} />
      </Wrap>
      <Wrap>
        <SectionTitle>Частые вопросы</SectionTitle>
        <Faq items={FAQ} />
      </Wrap>
      <Wrap>
        <BookingCta title="Запишитесь в сервис KIBER SMART AUTO" text="Работаем ежедневно с 09:00 до 21:00. Бишкек, ул. Киевская 123 (ТЦ Asia Mall)." />
      </Wrap>
      <div className="pb-16" />
    </>
  );
}
