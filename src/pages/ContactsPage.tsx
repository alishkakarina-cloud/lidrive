import { useState } from "react";
import PageHeader from "../components/PageHeader";
import ContactSection from "../components/ContactSection";
import { SectionTitle, Wrap } from "../components/Blocks";
import { useUI } from "../lib/ui";

export default function ContactsPage() {
  const { showToast } = useUI();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const raw = localStorage.getItem("lidrive_messages");
      const list = raw ? JSON.parse(raw) : [];
      list.push({ name, phone, message, date: new Date().toISOString() });
      localStorage.setItem("lidrive_messages", JSON.stringify(list));
    } catch {
      /* storage unavailable */
    }
    showToast("Сообщение отправлено — мы скоро ответим");
    setName("");
    setPhone("");
    setMessage("");
  };

  const field =
    "rounded-xl border border-line bg-panel-2 px-4 py-3 text-sm outline-none focus:border-accent";

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Главная", href: "/" }, { label: "Контакты" }]}
        title="Контакты"
        subtitle="Приезжайте, звоните или пишите — поможем подобрать аксессуары и записаться в сервис."
      />
      <ContactSection page />
      <Wrap>
        <SectionTitle>Написать нам</SectionTitle>
        <form onSubmit={submit} className="grid max-w-2xl gap-4 rounded-3xl border border-line bg-panel p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="c-name" className="text-xs font-medium text-fg-dim">Имя</label>
              <input id="c-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" className={field} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="c-phone" className="text-xs font-medium text-fg-dim">Телефон</label>
              <input id="c-phone" required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+996 700 123 456" className={field} />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="c-msg" className="text-xs font-medium text-fg-dim">Сообщение</label>
            <textarea id="c-msg" required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Чем мы можем помочь?" className={field} />
          </div>
          <button type="submit" className="w-fit rounded-full bg-accent hover:bg-accent-hover px-7 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.03] active:scale-95">
            Отправить
          </button>
        </form>
      </Wrap>
      <div className="pb-16" />
    </>
  );
}
