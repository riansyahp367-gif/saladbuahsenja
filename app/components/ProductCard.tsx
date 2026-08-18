"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Gift, Package, Sparkles, Clock3 } from "lucide-react";

import ProductSizeSelector from "./product/ProductSizeSelector";
import WhatsAppButton from "./product/WhatsAppButton";

type Size = {
  id: string;
  label: string;
  volume: string;
  price: number;
  points: number;
  package: string;
  image: string;
};

type Product = {
  id: string;
  name: string;
  badge: string;
  rating: number;
  description: string;
  sizes: Size[];
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const [activeSize, setActiveSize] = useState(0);

  const selected = product.sizes[activeSize];

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <div className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

     {/* Image */}
<div className="relative h-[340px] overflow-hidden bg-gradient-to-b from-pink-50 via-white to-pink-100">

  <Image
    src={selected.image}
    alt={product.name}
    fill
    className="object-cover transition-all duration-700 hover:scale-110"
  />

  {/* Badge */}
  <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 shadow-xl backdrop-blur-md">
    <p className="text-sm font-bold text-pink-600">
      {product.badge}
    </p>
  </div>

  {/* Best Seller */}
  <div className="absolute right-5 top-5 rounded-full bg-pink-600 px-4 py-2 text-xs font-bold text-white shadow-lg">
    BEST SELLER
  </div>

</div>
      {/* Content */}
      <div className="p-6">

        {/* Rating */}
        <div className="mb-3 flex items-center gap-1">
          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="font-semibold">
            {product.rating}
          </span>

          <span className="text-sm text-gray-500">
            /5
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mt-3 text-gray-600 leading-relaxed">
          {product.description}
        </p>

        {/* Size Selector */}
        <ProductSizeSelector
          sizes={product.sizes}
          activeSize={activeSize}
          onChange={setActiveSize}
        />

        {/* Package */}
        <div className="mt-6 flex items-center justify-between rounded-2xl bg-pink-50 p-4">

          <div className="flex items-center gap-3">

            <Package
              size={22}
              className="text-pink-600"
            />

            <div>
              <p className="text-xs text-gray-500">
                Kemasan
              </p>

              <p className="font-semibold">
                {selected.package}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <Gift
              size={22}
              className="text-pink-600"
            />

            <div>
              <p className="text-xs text-gray-500">
                Reward
              </p>

              <p className="font-semibold">
                +{selected.points} Point
              </p>
            </div>

          </div>

        </div>

       {/* Price */}
<div className="mt-6 rounded-3xl bg-gradient-to-r from-pink-500 via-pink-600 to-pink-500 p-5 text-white shadow-xl">

  <p className="text-sm font-medium text-pink-100">
    Mulai dari
  </p>

  <h4 className="mt-2 text-4xl font-black tracking-tight">
    {formatPrice(selected.price)}
  </h4>

</div>

       {/* WhatsApp */}
<div className="mt-8 space-y-3">

  <div className="flex items-center justify-center gap-2 rounded-2xl bg-green-50 py-3 text-sm font-semibold text-green-700">

    <Clock3 size={18} />

    <span>Dibuat Fresh Setiap Hari</span>

  </div>

  <WhatsAppButton
    productName={product.name}
    size={`${selected.label} (${selected.volume})`}
  />

</div>

</div>

</div>
  );
}