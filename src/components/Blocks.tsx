import type { ComponentType } from "react";
import { ArrowRight } from "lucide-react";
import { useUI } from "../lib/ui";

export function SectionTitle({ children }: { children: string }) {
  return <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">{children}</h2>;
}

export function Wrap({ children }: { children: React.ReactNode }) {
  return <section className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-10">{children}</section>;
}

interface FeatureItem {
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  text: string;
}

export function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f) => (
        <div key={f.title} className="rounded-2xl border border-white/8 bg-panel p-6 transition-colors hover:border-white/20">
          <f.icon size={24} strokeWidth={1.5} />
          <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
          <p className="mt-2 text-sm text-fg-dim">{f.text}</p>
        </div>
      ))}
    </div>
  );
}

export function Steps({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s, i) => (
        <li key={s.title} className="rounded-2xl border border-white/8 bg-panel p-6">
          <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 text-base font-semibold">{s.title}</h3>
          <p className="mt-2 text-sm text-fg-dim">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function BookingCta({ title, text, label = "Записаться" }: { title: string; text: string; label?: string }) {
  const { setBookingOpen } = useUI();
  return (
    <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/8 bg-panel p-8 sm:flex-row sm:items-center sm:p-12">
      <div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-xl text-fg-dim">{text}</p>
      </div>
      <button
        type="button"
        onClick={() => setBookingOpen(true)}
        className="group flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-95"
      >
        {label}
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
