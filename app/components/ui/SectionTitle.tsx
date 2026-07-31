type SectionTitleProps = {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
};

export default function SectionTitle({
  badge,
  title,
  highlight,
  description,
}: SectionTitleProps) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">

      {badge && (
        <span className="inline-flex rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600">
          {badge}
        </span>
      )}

      <h2 className="mt-6 text-4xl font-extrabold text-gray-900 lg:text-5xl">
        {title}{" "}
        {highlight && (
          <span className="text-pink-600">
            {highlight}
          </span>
        )}
      </h2>

      {description && (
        <p className="mt-5 text-lg leading-8 text-gray-600">
          {description}
        </p>
      )}

    </div>
  );
}