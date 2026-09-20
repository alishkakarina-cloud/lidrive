import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useUI } from "../lib/ui";

const SERVICES = [
  "Диагностика",
  "ТО и обслуживание",
  "Установка аксессуаров",
  "Обновление ПО",
  "Русификация",
  "Другое",
];

export default function BookingModal() {
  const { bookingOpen, setBookingOpen, showToast } = useUI();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!bookingOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setBookingOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [bookingOpen, setBookingOpen]);

  useEffect(() => {
    if (bookingOpen) setSubmitted(false);
  }, [bookingOpen]);

  if (!bookingOpen) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 6) return;
    try {
      const raw = localStorage.getItem("lidrive_bookings");
      const list = raw ? JSON.parse(raw) : [];
      list.push({ name, phone, service, date: new Date().toISOString() });
      localStorage.setItem("lidrive_bookings", JSON.stringify(list));
    } catch {
      /* ignore storage errors */
    }
    setSubmitted(true);
    showToast("Заявка на сервис принята — мы скоро свяжемся с вами");
    setName("");
    setPhone("");
  };

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      <button
        aria-label="Закрыть форму"
        className="absolute inset-0 bg-ink/80 backdrop-blur-md"
        onClick={() => setBookingOpen(false)}
      />
      <div className="animate-fade-up relative w-full max-w-md rounded-2xl border border-line bg-panel p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={() => setBookingOpen(false)}
          aria-label="Закрыть"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full hover:bg-elevated"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-soft text-fg">
              ✓
            </div>
            <h3 className="text-xl font-semibold">Заявка отправлена</h3>
            <p className="text-fg-dim">Наш менеджер свяжется с вами в ближайшее рабочее время для подтверждения записи.</p>
            <button
              type="button"
              onClick={() => setBookingOpen(false)}
              className="mt-2 rounded-full bg-accent hover:bg-accent-hover px-6 py-2.5 text-sm font-semibold text-white"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold">Записаться в сервис</h3>
            <p className="mt-1 text-sm text-fg-dim">Оставьте контакты — подберём удобное время визита.</p>
            <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="booking-name" className="text-xs font-medium text-fg-dim">Имя</label>
                <input
                  id="booking-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  className="rounded-xl border border-line bg-panel-2 px-4 py-3 text-sm outline-none focus:border-accent"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="booking-phone" className="text-xs font-medium text-fg-dim">Телефон</label>
                <input
                  id="booking-phone"
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+996 700 123 456"
                  className="rounded-xl border border-line bg-panel-2 px-4 py-3 text-sm outline-none focus:border-accent"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="booking-service" className="text-xs font-medium text-fg-dim">Услуга</label>
                <select
                  id="booking-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="rounded-xl border border-line bg-panel-2 px-4 py-3 text-sm outline-none focus:border-accent"
                >
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="mt-2 rounded-full bg-accent hover:bg-accent-hover py-3.5 text-sm font-semibold text-white transition hover:scale-[1.02] active:scale-[0.98]"
              >
                Отправить заявку
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
