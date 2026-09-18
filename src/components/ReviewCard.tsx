import StarRating from "./StarRating";
import ResponsiveImage from "./ResponsiveImage";
import { WIDTHS_CARD } from "../lib/images";
import type { Review } from "../lib/types";

export default function ReviewCard({ review: r }: { review: Review }) {
  return (
    <article className="rounded-2xl border border-white/8 bg-panel p-5 sm:p-6">
      <div className="flex items-center gap-3">
        {r.avatarSeed > 0 ? (
          <img
            src={`https://i.pravatar.cc/96?img=${r.avatarSeed}`}
            alt={r.name}
            width={44}
            height={44}
            loading="lazy"
            className="h-11 w-11 rounded-full bg-neutral-800 object-cover"
          />
        ) : (
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-panel-2 text-sm font-semibold">
            {r.name.slice(0, 1).toUpperCase()}
          </span>
        )}
        <div>
          <p className="text-sm font-semibold">{r.name}</p>
          <p className="text-xs text-fg-mute">{r.model}</p>
        </div>
        <div className="ml-auto">
          <StarRating rating={r.rating} />
        </div>
      </div>
      <p className="mt-4 text-sm text-fg-dim">{r.text}</p>
      {r.photos.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {r.photos.map((p) => (
            <ResponsiveImage
              key={p}
              id={p}
              alt={`Фото от клиента ${r.name}`}
              widths={WIDTHS_CARD}
              sizes="(max-width: 768px) 45vw, 20vw"
              aspect="4/3"
              className="w-full rounded-xl object-cover"
            />
          ))}
        </div>
      )}
    </article>
  );
}
