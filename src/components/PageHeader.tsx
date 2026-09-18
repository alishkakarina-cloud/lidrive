import Breadcrumbs from "./Breadcrumbs";

interface PageHeaderProps {
  crumbs: { label: string; href?: string }[];
  title: string;
  subtitle?: string;
}

export default function PageHeader({ crumbs, title, subtitle }: PageHeaderProps) {
  return (
    <div className="mx-auto max-w-[1600px] px-4 pb-6 pt-10 sm:px-6 lg:px-10">
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-2xl text-fg-dim">{subtitle}</p>}
    </div>
  );
}
