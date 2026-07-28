type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="mb-12 text-center">
      {subtitle && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-pink-500">
          {subtitle}
        </p>
      )}

      <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
        {title}
      </h2>
    </div>
  );
}