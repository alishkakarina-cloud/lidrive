import { CalendarCheck, Compass, LifeBuoy, Mic, Music2, RefreshCw, ShieldCheck, Languages } from "lucide-react";
import PageHeader from "../components/PageHeader";
import RussificationSection from "../components/RussificationSection";
import Faq from "../components/Faq";
import { BookingCta, FeatureGrid, SectionTitle, Steps, Wrap } from "../components/Blocks";

const FEATURES = [
  { icon: Languages, title: "Русский интерфейс", text: "Мультимедиа и приборная панель полностью на русском языке." },
  { icon: Compass, title: "Яндекс Навигатор и 2ГИС", text: "Навигация и карты для поездок по городу и за его пределы." },
  { icon: Music2, title: "Яндекс Музыка", text: "Любимая музыка и подкасты прямо на экране автомобиля." },
  { icon: Mic, title: "Голосовое управление", text: "Управляйте функциями автомобиля голосом на русском языке." },
  { icon: RefreshCw, title: "Обновления ПО", text: "Актуальные версии программного обеспечения без потери гарантии." },
  { icon: LifeBuoy, title: "Поддержка после установки", text: "Мы на связи, если нужна помощь с настройкой или обновлением." },
];

const STEPS = [
  { title: "Заявка", text: "Оставьте заявку или позвоните — подберём удобное время визита." },
  { title: "Проверка автомобиля", text: "Смотрим модель, версию ПО и готовим автомобиль к установке." },
  { title: "Установка за 1 день", text: "Устанавливаем русификацию и приложения, проверяем работу всех функций." },
  { title: "Передача и поддержка", text: "Показываем, как всё работает, и остаёмся на связи после установки." },
];

const FAQ = [
  { q: "Сохраняется ли гарантия на автомобиль?", a: "Да. Русификацию мы выполняем так, чтобы сохранялась гарантия — это одно из наших ключевых условий." },
  { q: "Сколько времени занимает установка?", a: "Установка занимает один день. Точное время визита согласуем при записи." },
  { q: "Для каких моделей доступна русификация?", a: "Для моделей Lixiang L6, L7, L8, L9 и MEGA. Если сомневаетесь — уточните у менеджера." },
  { q: "Что будет после установки?", a: "Мы остаёмся на связи: поможем с настройкой, ответим на вопросы и подскажем по обновлениям." },
];

export default function RussificationPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Главная", href: "/" }, { label: "Русификация" }]}
        title="Русификация Lixiang"
        subtitle="Русский язык, приложения, голосовое управление и обновления — под ваш регион."
      />
      <RussificationSection page />
      <Wrap>
        <SectionTitle>Что входит</SectionTitle>
        <FeatureGrid items={FEATURES} />
      </Wrap>
      <Wrap>
        <SectionTitle>Как проходит установка</SectionTitle>
        <Steps items={STEPS} />
      </Wrap>
      <Wrap>
        <div className="mb-6 flex items-center gap-2.5">
          <CalendarCheck size={20} className="text-fg-dim" />
          <ShieldCheck size={20} className="text-fg-dim" />
        </div>
        <SectionTitle>Частые вопросы</SectionTitle>
        <Faq items={FAQ} />
      </Wrap>
      <Wrap>
        <BookingCta
          title="Готовы русифицировать ваш Lixiang?"
          text="Оставьте заявку — менеджер свяжется с вами и согласует удобное время."
          label="Записаться на установку"
        />
      </Wrap>
      <div className="pb-16" />
    </>
  );
}
