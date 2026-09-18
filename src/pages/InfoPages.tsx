import { CalendarClock, MapPinned, PackageCheck, ShieldCheck, Truck, Wrench, FileCheck2, LifeBuoy } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Faq from "../components/Faq";
import { BookingCta, FeatureGrid, SectionTitle, Wrap } from "../components/Blocks";

export function DeliveryPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Главная", href: "/" }, { label: "Доставка" }]}
        title="Доставка"
        subtitle="Быстрая доставка по Кыргызстану и СНГ."
      />
      <Wrap>
        <FeatureGrid
          items={[
            { icon: Truck, title: "От 1 до 3 дней", text: "Большинство товаров из каталога доставляем в течение 1–3 дней." },
            { icon: MapPinned, title: "По КР и СНГ", text: "Отправляем заказы по Кыргызстану и в страны СНГ." },
            { icon: PackageCheck, title: "Аккуратная упаковка", text: "Аксессуары приходят в надёжной упаковке и готовы к установке." },
          ]}
        />
      </Wrap>
      <Wrap>
        <SectionTitle>Частые вопросы</SectionTitle>
        <Faq
          items={[
            { q: "Как оформить заказ?", a: "Добавьте товары в корзину и нажмите «Оформить заказ» — менеджер свяжется с вами для подтверждения и доставки." },
            { q: "Можно ли забрать заказ самостоятельно?", a: "Да, вы можете забрать заказ в нашем магазине: Бишкек, ул. Киевская 123 (ТЦ Asia Mall), ежедневно с 09:00 до 21:00." },
            { q: "Установите ли вы аксессуары после доставки?", a: "Да, мы можем установить купленные аксессуары в нашем сервисном центре." },
          ]}
        />
      </Wrap>
      <Wrap>
        <BookingCta title="Нужна установка после покупки?" text="Запишитесь в сервис — наши специалисты установят аксессуары." />
      </Wrap>
      <div className="pb-16" />
    </>
  );
}

export function WarrantyPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Главная", href: "/" }, { label: "Гарантия" }]}
        title="Гарантия"
        subtitle="Мы отвечаем за качество товаров и выполненных работ."
      />
      <Wrap>
        <FeatureGrid
          items={[
            { icon: ShieldCheck, title: "12 месяцев на товары", text: "На аксессуары из каталога действует гарантия 12 месяцев." },
            { icon: Wrench, title: "Гарантия на работы", text: "Мы гарантируем качество установки и сервисных работ." },
            { icon: FileCheck2, title: "Сохранение гарантии авто", text: "Русификацию и установку выполняем так, чтобы гарантия автомобиля сохранялась." },
            { icon: LifeBuoy, title: "Поддержка", text: "Если что-то пошло не так — свяжитесь с нами, и мы поможем." },
            { icon: CalendarClock, title: "Быстрое решение", text: "Рассматриваем обращения в кратчайшие сроки." },
          ]}
        />
      </Wrap>
      <Wrap>
        <SectionTitle>Частые вопросы</SectionTitle>
        <Faq
          items={[
            { q: "Что делать, если товар оказался с дефектом?", a: "Свяжитесь с нами по телефону или напишите на info@lidrive.kg — мы поможем решить вопрос в рамках гарантии." },
            { q: "Распространяется ли гарантия на установку?", a: "Да, на работы, выполненные в нашем сервисе, предоставляется гарантия." },
          ]}
        />
      </Wrap>
      <Wrap>
        <BookingCta title="Остались вопросы по гарантии?" text="Запишитесь на консультацию — всё объясним." label="Задать вопрос" />
      </Wrap>
      <div className="pb-16" />
    </>
  );
}
