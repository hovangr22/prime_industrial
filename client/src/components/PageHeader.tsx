export function PageHeader({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy">
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70" />
        </div>
      )}
      <div className="container relative py-16 lg:py-20">
        <div className="h-1 w-14 rounded-full bg-orange-brand" />
        <h1 className="mt-5 font-display text-4xl font-bold uppercase tracking-wide text-white lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 lg:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
