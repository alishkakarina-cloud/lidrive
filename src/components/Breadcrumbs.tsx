import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="flex flex-wrap items-center gap-1.5 text-sm text-fg-mute">
      {items.map((item, i) => (
        <Fragment key={item.label + i}>
          {i > 0 && <ChevronRight size={13} className="shrink-0" />}
          {item.href ? (
            <Link to={item.href} className="transition-colors hover:text-fg">
              {item.label}
            </Link>
          ) : (
            <span className="text-fg-dim">{item.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
