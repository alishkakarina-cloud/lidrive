import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ReviewCard from "./ReviewCard";
import { REVIEWS } from "../lib/products";

export default function ReviewsSection() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Отзывы клиентов</h2>
        <Link to="/reviews" className="group flex items-center gap-1.5 text-sm font-medium text-fg-dim hover:text-fg">
          Смотреть все
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {REVIEWS.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>

      <blockquote className="mt-12 text-center text-2xl font-semibold italic tracking-tight text-fg-dim text-balance sm:text-4xl">
        «Детали создают большую картину.»
      </blockquote>
    </section>
  );
}
