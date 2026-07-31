type Size = {
  id: string;
  label: string;
  volume: string;
};

type ProductSizeSelectorProps = {
  sizes: Size[];
  activeSize: number;
  onChange: (index: number) => void;
};

export default function ProductSizeSelector({
  sizes,
  activeSize,
  onChange,
}: ProductSizeSelectorProps) {
  return (
    <div className="mt-6">
      <p className="mb-3 text-sm font-semibold text-gray-700">
        Pilih Ukuran
      </p>

      <div className="flex flex-wrap gap-3">
        {sizes.map((size, index) => (
          <button
            key={size.id}
            onClick={() => onChange(index)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              activeSize === index
                ? "border-pink-600 bg-pink-600 text-white shadow-lg"
                : "border-gray-200 bg-white text-gray-700 hover:border-pink-500 hover:text-pink-600"
            }`}
          >
            <div>{size.label}</div>
            <div className="text-xs opacity-80">
              {size.volume}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}