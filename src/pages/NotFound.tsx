import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-6 py-32 text-center">
      <p className="font-mono text-sm text-fg-dim">404</p>
      <h1 className="text-3xl font-bold">Страница не найдена</h1>
      <p className="text-fg-dim">Возможно, ссылка устарела. Вернитесь на главную или откройте каталог.</p>
      <div className="mt-2 flex gap-3">
        <Link to="/" className="rounded-full bg-accent hover:bg-accent-hover px-6 py-3 text-sm font-semibold text-white">
          На главную
        </Link>
        <Link to="/catalog" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold">
          В каталог
        </Link>
      </div>
    </div>
  );
}
