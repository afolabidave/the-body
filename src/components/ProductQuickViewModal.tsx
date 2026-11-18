"use client";

import React, { useState } from "react";
import { Product, CATEGORIES, BODY_ZONES } from "@/data/products";
import {
  X,
  Star,
  Heart,
  ShoppingBag,
  Sparkles,
  Check,
  ShieldCheck,
  Leaf,
  RefreshCw,
} from "lucide-react";

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, colorName: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export default function ProductQuickViewModal({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}: ProductQuickViewModalProps) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[0] || "One Size"
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || "Natural"
  );
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const categoryMeta = CATEGORIES.find((c) => c.id === product.category);
  const zoneMeta = BODY_ZONES.find((z) => z.id === product.bodyZone);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#231B18]/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-[#FAF6F0] border border-[#E2D5C4] rounded-[2.25rem] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#FAF6F0]/90 hover:bg-[#231B18] text-[#231B18] hover:text-[#FAF6F0] border border-[#E2D5C4] flex items-center justify-center transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Visual Gallery */}
        <div className="md:w-1/2 bg-[#F2EAE0] relative flex flex-col justify-between p-5">
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#E5D9C8]">
            <img
              src={activeImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#231B18]/85 text-[#FAF6F0] text-xs font-medium tracking-wide">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnail Switcher */}
          <div className="flex items-center gap-3 mt-4">
            {[product.image, product.secondaryImage].map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(imgUrl)}
                className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                  activeImage === imgUrl
                    ? "border-[#B85D3B] scale-105"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`${product.name} view ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
            <div className="ml-auto text-right">
              <span className="block text-[11px] uppercase tracking-widest text-[#6E5D53]">
                Anatomical Zone
              </span>
              <span className="text-xs font-semibold text-[#B85D3B]">
                {zoneMeta?.label}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Product Specifications */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#B85D3B] font-semibold mb-1">
              <span>{categoryMeta?.name}</span>
              <span>•</span>
              <span>SKU: {product.sku}</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#231B18] font-medium leading-tight">
              {product.name}
            </h2>
            <p className="text-sm text-[#6E5D53] mt-1">{product.subtitle}</p>

            {/* Price & Rating */}
            <div className="mt-4 flex items-center justify-between border-y border-[#E5D9C8] py-3">
              <div className="flex items-baseline gap-2.5">
                <span className="font-editorial text-3xl font-semibold text-[#231B18]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#9A897A] line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#6E5D53]">
                <Star className="w-4 h-4 fill-[#C69249] text-[#C69249]" />
                <span className="font-semibold text-[#231B18]">
                  {product.rating}
                </span>
                <span>({product.reviewsCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[#493D36] leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="uppercase tracking-wider text-[#6E5D53] font-semibold">
                Organic Shade
              </span>
              <span className="font-medium text-[#231B18]">{selectedColor}</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((color) => {
                const active = selectedColor === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border transition cursor-pointer ${
                      active
                        ? "border-[#231B18] bg-[#F2EAE0] font-semibold text-[#231B18]"
                        : "border-[#E2D5C4] bg-white text-[#6E5D53] hover:border-[#B85D3B]"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/15"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="uppercase tracking-wider text-[#6E5D53] font-semibold">
                Anatomical Size
              </span>
              <span className="text-[#B85D3B] font-medium">
                {product.stock} pieces in atelier vault
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => {
                const active = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition cursor-pointer ${
                      active
                        ? "bg-[#231B18] text-[#FAF6F0] border-[#231B18]"
                        : "bg-white text-[#231B18] border-[#E2D5C4] hover:border-[#B85D3B]"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Material & Fit Note Box */}
          <div className="bg-[#F2EAE0] rounded-2xl p-4 space-y-2 border border-[#E2D5C4] text-xs">
            <div>
              <span className="font-semibold text-[#231B18]">
                Material Architecture:{" "}
              </span>
              <span className="text-[#5C4E46]">{product.material}</span>
            </div>
            <div>
              <span className="font-semibold text-[#231B18]">
                Silhouette & Fit:{" "}
              </span>
              <span className="text-[#5C4E46]">{product.fitNotes}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleAdd}
              className="flex-1 py-4 px-6 rounded-2xl bg-[#B85D3B] hover:bg-[#9E4C2E] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
            >
              {addedFeedback ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Your Wardrobe Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • ${product.price}</span>
                </>
              )}
            </button>
            <button
              onClick={() => onToggleWishlist(product.id)}
              className={`p-4 rounded-2xl border transition cursor-pointer ${
                isWishlisted
                  ? "bg-[#B85D3B]/15 border-[#B85D3B] text-[#B85D3B]"
                  : "bg-white border-[#E2D5C4] text-[#231B18] hover:border-[#B85D3B]"
              }`}
              aria-label="Save to wishlist"
            >
              <Heart
                className={`w-5 h-5 ${isWishlisted ? "fill-[#B85D3B]" : ""}`}
              />
            </button>
          </div>

          {/* Trust Micro-bar */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E5D9C8] text-[11px] text-[#6E5D53]">
            <div className="flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-[#5C6B57] shrink-0" />
              <span>Botanical Dye Certified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-[#B85D3B] shrink-0" />
              <span>30-Day Fit Exchange</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#231B18] shrink-0" />
              <span>Lifetime Seam Care</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
