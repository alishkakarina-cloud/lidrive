import { CheckCircle2 } from "lucide-react";
import { useUI } from "../lib/ui";

export default function ToastStack() {
  const { toasts } = useUI();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="glass-strong animate-fade-up pointer-events-auto flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-fg shadow-xl"
        >
          <CheckCircle2 size={16} className="text-accent-hover" />
          {t.message}
        </div>
      ))}
    </div>
  );
}
