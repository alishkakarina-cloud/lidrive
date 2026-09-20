import { useState } from "react";
import PageHeader from "../components/PageHeader";
import ReviewCard from "../components/ReviewCard";
import { SectionTitle, Wrap } from "../components/Blocks";
import { REVIEWS } from "../lib/products";
import { useUI } from "../lib/ui";
import type { Review } from "../lib/types";

const KEY = "lidrive_reviews";

function loadOwn(): Review[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export default function ReviewsPage() {
  const { showToast } = useUI();
  const [own, setOwn] = useState<Review[]>(loadOwn);
  const [name, setName] = useState("");
  const [model, setModel] = useState("Lixiang L9");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const review: Review = { id: `own-${Date.now()}`, name: name.trim(), model, rating, text: text.trim(), avatarSeed: 0, photos: [] };
    const next = [review, ...own];
    setOwn(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
    showToast("Спасибо за отзыв!");
    setName("");
    setText("");
    setRating(5);
  };

  const field = "rounded-xl border border-line bg-panel-2 px-4 py-3 text-sm outline-none focus:border-accent";

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Главная", href: "/" }, { label: "Отзывы клиентов" }]}
        title="Отзывы клиентов"
        subtitle="Что говорят владельцы Lixiang о наших аксессуарах и сервисе."
      />
      <Wrap>
        <div className="grid gap-4 md:grid-cols-2">
          {[...own, ...REVIEWS].map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </Wrap>
      <Wrap>
        <SectionTitle>Оставить отзыв</SectionTitle>
        <form onSubmit={submit} className="grid max-w-2xl gap-4 rounded-3xl border border-line bg-panel p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="r-name" className="text-xs font-medium text-fg-dim">Имя</label>
              <input id="r-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" className={field} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="r-model" className="text-xs font-medium text-fg-dim">Модель</label>
              <select id="r-model" value={model} onChange={(e) => setModel(e.target.value)} className={field}>
                {["L6", "L7", "L8", "L9", "MEGA"].map((m) => (
                  <option key={m} value={`Lixiang ${m}`}>Lixiang {m}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-fg-dim">Оценка</span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  aria-label={`Оценка ${n}`}
                  aria-pressed={rating === n}
                  className={`h-10 w-10 rounded-full border text-sm font-semibold transition-colors ${
                    n <= rating ? "border-accent bg-soft text-fg" : "border-line text-fg-dim"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="r-text" className="text-xs font-medium text-fg-dim">Отзыв</label>
            <textarea id="r-text" required rows={4} value={text} onChange={(e) => setText(e.target.value)} placeholder="Расскажите о своём опыте" className={field} />
          </div>
          <button type="submit" className="w-fit rounded-full bg-accent hover:bg-accent-hover px-7 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.03] active:scale-95">
            Опубликовать
          </button>
        </form>
      </Wrap>
      <div className="pb-16" />
    </>
  );
}
