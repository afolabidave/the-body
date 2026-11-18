"use client";

import React, { useState } from "react";
import {
  Product,
  CURATED_LOOK_PRESETS,
  CATEGORIES,
} from "@/data/products";
import {
  Sparkles,
  Check,
  ShoppingBag,
  Shuffle,
  Bookmark,
  ChevronRight,
  Layers,
} from "lucide-react";

interface DressTheBodyStudioProps {
  products: Product[];
  onAddBundleToCart: (items: Product[]) => void;
  onSaveLook: (lookTitle: string, items: Product[]) => void;
  onInspectProduct: (product: Product) => void;
}

export default function DressTheBodyStudio({
  products,
  onAddBundleToCart,
  onSaveLook,
  onInspectProduct,
}: DressTheBodyStudioProps) {
  const tops = products.filter((p) => p.bundleSlot === "top");
  const bottoms = products.filter((p) => p.bundleSlot === "bottom");
  const shoes = products.filter((p) => p.bundleSlot === "shoes");
  const jewelries = products.filter((p) => p.bundleSlot === "jewelry");

  const [selectedTopId, setSelectedTopId] = useState<string>(
    tops[0]?.id || "tb-home-01"
  );
  const [selectedBottomId, setSelectedBottomId] = useState<string>(
    bottoms[0]?.id || "tb-home-02"
  );
  const [selectedShoesId, setSelectedShoesId] = useState<string>(
    shoes[0]?.id || "tb-sho-01"
  );
  const [selectedJewelryId, setSelectedJewelryId] = useState<string>(
    jewelries[0]?.id || "tb-jwl-01"
  );
  const [activePresetId, setActivePresetId] = useState<string>(
    CURATED_LOOK_PRESETS[0].id
  );
  const [customLookName, setCustomLookName] = useState<string>("");
  const [justAdded, setJustAdded] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const selectedTop =
    tops.find((p) => p.id === selectedTopId) || tops[0];
  const selectedBottom =
    bottoms.find((p) => p.id === selectedBottomId) || bottoms[0];
  const selectedShoes =
    shoes.find((p) => p.id === selectedShoesId) || shoes[0];
  const selectedJewelry =
    jewelries.find((p) => p.id === selectedJewelryId) || jewelries[0];

  const currentBundle = [
    selectedTop,
    selectedBottom,
    selectedShoes,
    selectedJewelry,
  ].filter(Boolean);

  const rawTotal = currentBundle.reduce((acc, item) => acc + item.price, 0);
  const bundleDiscount = Math.round(rawTotal * 0.15);
  const finalBundlePrice = rawTotal - bundleDiscount;

  const applyPreset = (preset: (typeof CURATED_LOOK_PRESETS)[number]) => {
    setActivePresetId(preset.id);
    setSelectedTopId(preset.topId);
    setSelectedBottomId(preset.bottomId);
    setSelectedShoesId(preset.shoesId);
    setSelectedJewelryId(preset.jewelryId);
  };

  const randomizeLook = () => {
    setActivePresetId("custom");
    if (tops.length)
      setSelectedTopId(tops[Math.floor(Math.random() * tops.length)].id);
    if (bottoms.length)
      setSelectedBottomId(
        bottoms[Math.floor(Math.random() * bottoms.length)].id
      );
    if (shoes.length)
      setSelectedShoesId(shoes[Math.floor(Math.random() * shoes.length)].id);
    if (jewelries.length)
      setSelectedJewelryId(
        jewelries[Math.floor(Math.random() * jewelries.length)].id
      );
  };

  const handleAddCompleteLook = () => {
    onAddBundleToCart(currentBundle);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2400);
  };

  const handleBookmarkLook = () => {
    const presetObj = CURATED_LOOK_PRESETS.find((p) => p.id === activePresetId);
    const title =
      customLookName.trim() ||
      (presetObj ? presetObj.title : `Custom Body Look • $${finalBundlePrice}`);
    onSaveLook(title, currentBundle);
    setCustomLookName("");
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2400);
  };

  const getCategoryLabel = (catId: string) =>
    CATEGORIES.find((c) => c.id === catId)?.name || catId;

  return (
    <section
      id="dress-the-body"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="bg-[#231B18] text-[#FAF6F0] rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-2xl border border-[#3C2F2A] relative overflow-hidden">
        {/* Decorative warm terracotta glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#B85D3B]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#5C6B57]/20 blur-3xl" />

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#3B2E29]">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#352924] border border-[#4D3C35] text-xs uppercase tracking-[0.2em] text-[#E6B18E]">
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive Look Architect • 15% Full-Body Bundle Privilege</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl font-normal tracking-tight text-[#FAF6F0]">
              Dress <span className="italic text-[#E6B18E]">The Entire Body</span>
            </h2>
            <p className="text-[#C9B8A6] text-sm sm:text-base leading-relaxed">
              Mix and match across Homestay, Activewear, Streetwear, and Evening—anchored with Sculptural Jewelry and Grounded Footwear. Every 4-piece anatomical look unlocks a 15% Atelier Bundle reduction.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={randomizeLook}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#352924] hover:bg-[#463630] text-[#FAF6F0] border border-[#524039] text-xs font-medium tracking-wide transition cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5 text-[#E6B18E]" />
              <span>Curate Random Silhouette</span>
            </button>
          </div>
        </div>

        {/* Preset Look Pills */}
        <div className="py-6 flex items-center gap-3 overflow-x-auto no-scrollbar">
          <span className="text-xs uppercase tracking-widest text-[#A69382] shrink-0">
            Atelier Presets:
          </span>
          {CURATED_LOOK_PRESETS.map((preset) => {
            const active = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition shrink-0 cursor-pointer border ${
                  active
                    ? "bg-[#B85D3B] text-white border-[#B85D3B] shadow-md"
                    : "bg-[#2E2420] text-[#D8C8B8] border-[#443530] hover:border-[#B85D3B]"
                }`}
              >
                {preset.title}
              </button>
            );
          })}
        </div>

        {/* Main 4-Slot Builder + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-2">
          {/* Left 8 Columns: 4 Anatomical Slots */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                slotTitle: "01. Upper Body & Torso",
                slotSubtitle: "Robes, Tops, Hoodies & Slip Dresses",
                items: tops,
                selected: selectedTop,
                onSelect: (id: string) => {
                  setActivePresetId("custom");
                  setSelectedTopId(id);
                },
              },
              {
                slotTitle: "02. Lower Body & Stride",
                slotSubtitle: "Linen Pants, Leggings, Cargos & Skirts",
                items: bottoms,
                selected: selectedBottom,
                onSelect: (id: string) => {
                  setActivePresetId("custom");
                  setSelectedBottomId(id);
                },
              },
              {
                slotTitle: "03. Sculptural Jewelry",
                slotSubtitle: "Collar Necklaces, Cuffs, Drops & Rings",
                items: jewelries,
                selected: selectedJewelry,
                onSelect: (id: string) => {
                  setActivePresetId("custom");
                  setSelectedJewelryId(id);
                },
              },
              {
                slotTitle: "04. Grounded Footwear",
                slotSubtitle: "Anatomical Mules, Runners & Slides",
                items: shoes,
                selected: selectedShoes,
                onSelect: (id: string) => {
                  setActivePresetId("custom");
                  setSelectedShoesId(id);
                },
              },
            ].map((slot) => (
              <div
                key={slot.slotTitle}
                className="bg-[#2D231F] border border-[#44352F] rounded-3xl p-4 flex flex-col justify-between gap-4 hover:border-[#C87D55]/60 transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#E6B18E] font-semibold">
                        {slot.slotTitle}
                      </p>
                      <p className="text-[11px] text-[#A89686]">
                        {slot.slotSubtitle}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-[#FAF6F0] bg-[#3B2E29] px-3 py-1 rounded-full">
                      ${slot.selected?.price}
                    </span>
                  </div>

                  {/* Active Slot Preview Card */}
                  {slot.selected && (
                    <div className="flex gap-3.5 items-center bg-[#231B18] p-3 rounded-2xl border border-[#3B2E29]">
                      <img
                        src={slot.selected.image}
                        alt={slot.selected.name}
                        onClick={() => onInspectProduct(slot.selected)}
                        className="w-20 h-24 object-cover rounded-xl shrink-0 cursor-pointer hover:opacity-90 transition"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-md bg-[#352924] text-[#E6B18E] mb-1">
                          {getCategoryLabel(slot.selected.category)}
                        </span>
                        <h4
                          onClick={() => onInspectProduct(slot.selected)}
                          className="font-medium text-sm text-[#FAF6F0] truncate cursor-pointer hover:text-[#E6B18E]"
                        >
                          {slot.selected.name}
                        </h4>
                        <p className="text-xs text-[#A89686] truncate">
                          {slot.selected.subtitle}
                        </p>
                        <button
                          onClick={() => onInspectProduct(slot.selected)}
                          className="mt-2 inline-flex items-center gap-1 text-[11px] text-[#E6B18E] hover:underline cursor-pointer"
                        >
                          <span>Inspect material</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Selector Thumbnails */}
                <div>
                  <label className="block text-[11px] text-[#A89686] mb-2">
                    Switch piece ({slot.items.length} options):
                  </label>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {slot.items.map((item) => {
                      const isChosen = item.id === slot.selected?.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => slot.onSelect(item.id)}
                          title={`${item.name} ($${item.price})`}
                          className={`relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                            isChosen
                              ? "border-[#E6B18E] scale-105 shadow-md"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right 4 Columns: Visual Totem Stack & Bundle Checkout */}
          <div className="lg:col-span-4 bg-[#FAF6F0] text-[#231B18] rounded-3xl p-6 flex flex-col justify-between border border-[#E2D5C4]">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-[#E2D5C4] pb-4">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#B85D3B] font-semibold">
                    Complete Body Totem
                  </span>
                  <h3 className="font-editorial text-2xl font-medium text-[#231B18]">
                    4-Zone Harmony
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#B85D3B]/15 text-[#B85D3B] text-xs font-semibold">
                  Save ${bundleDiscount}
                </span>
              </div>

              {/* 4-Piece Collage Preview */}
              <div className="grid grid-cols-2 gap-2.5">
                {currentBundle.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => onInspectProduct(item)}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F2EAE0] border border-[#E2D5C4] cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#231B18]/80 via-transparent to-transparent flex flex-col justify-end p-2.5">
                      <span className="text-[10px] uppercase tracking-widest text-[#E6B18E]">
                        0{idx + 1} • {item.bundleSlot}
                      </span>
                      <p className="text-xs text-white font-medium truncate">
                        {item.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="bg-[#F2EAE0] rounded-2xl p-4 space-y-2 border border-[#E2D5C4]">
                <div className="flex justify-between text-xs text-[#6E5D53]">
                  <span>Individual Pieces Total (4 Items)</span>
                  <span className="line-through">${rawTotal}</span>
                </div>
                <div className="flex justify-between text-xs text-[#5C6B57] font-medium">
                  <span>Full-Body Ensemble Privilege (15% Off)</span>
                  <span>-${bundleDiscount}</span>
                </div>
                <div className="pt-2 border-t border-[#DFD2C0] flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-[#231B18]">
                    Atelier Bundle Price
                  </span>
                  <span className="font-editorial text-3xl font-semibold text-[#231B18]">
                    ${finalBundlePrice}
                  </span>
                </div>
              </div>

              {/* Save Look Input */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customLookName}
                    onChange={(e) => setCustomLookName(e.target.value)}
                    placeholder="Name this look (e.g. Sunday Terra Ritual)..."
                    className="flex-1 bg-white border border-[#DFD2C0] rounded-xl px-3 py-2 text-xs text-[#231B18] placeholder:text-[#9A897A] focus:outline-none focus:border-[#B85D3B]"
                  />
                  <button
                    onClick={handleBookmarkLook}
                    className="px-3.5 py-2 rounded-xl bg-[#F2EAE0] hover:bg-[#E5D9C8] text-[#231B18] border border-[#DFD2C0] text-xs font-medium inline-flex items-center gap-1.5 shrink-0 transition cursor-pointer"
                  >
                    {justSaved ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#5C6B57]" />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5 text-[#B85D3B]" />
                        <span>Save Look</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Primary CTA */}
            <button
              onClick={handleAddCompleteLook}
              className="mt-5 w-full py-4 px-6 rounded-2xl bg-[#B85D3B] hover:bg-[#9E4C2E] text-white font-medium text-sm flex items-center justify-center gap-2.5 shadow-lg transition cursor-pointer"
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>All 4 Pieces Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Complete 4-Piece Look • ${finalBundlePrice}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
