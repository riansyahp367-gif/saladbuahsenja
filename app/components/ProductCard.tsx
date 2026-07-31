"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Gift, Package } from "lucide-react";

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
      <div className="relative h-72 bg-pink-50">
        <Image
          src={selected.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
          {product.badge}
        </span>
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
        <div className="mt-6">

          <p className="text-sm text-gray-500">
            Harga
          </p>

          <h4 className="text-3xl font-extrabold text-pink-600">
            {formatPrice(selected.price)}
          </h4>

        </div>

        {/* WhatsApp */}
        <div className="mt-6">
          <WhatsAppButton
            productName={product.name}
            size={`${selected.label} (${selected.volume})`}
          />
        </div>

      </div>

    </div>
  );
}