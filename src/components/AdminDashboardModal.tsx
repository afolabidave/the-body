"use client";

import React, { useState } from "react";
import {
  Product,
  CategoryId,
  BodyZoneId,
  BundleSlot,
  CATEGORIES,
  BODY_ZONES,
} from "@/data/products";
import { OrderRecord } from "./CartAndCheckoutDrawer";
import {
  X,
  Plus,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Edit3,
  Trash2,
  Layers,
  ShoppingBag,
} from "lucide-react";

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (newProd: Product) => void;
  onUpdateStock: (productId: string, newStock: number) => void;
  onUpdatePrice: (productId: string, newPrice: number) => void;
  onDeleteProduct: (productId: string) => void;
  orders: OrderRecord[];
}

export default function AdminDashboardModal({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateStock,
  onUpdatePrice,
  onDeleteProduct,
  orders,
}: AdminDashboardModalProps) {
  const [activeSection, setActiveSection] = useState<
    "inventory" | "add" | "orders"
  >("inventory");
  const [filterCat, setFilterCat] = useState<CategoryId>("all");

  // New Product Form State
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] =
    useState<Exclude<CategoryId, "all">>("homestay");
  const [bodyZone, setBodyZone] =
    useState<Exclude<BodyZoneId, "all">>("upper-body");
  const [bundleSlot, setBundleSlot] = useState<BundleSlot>("top");
  const [price, setPrice] = useState("165");
  const [stock, setStock] = useState("25");
  const [material, setMaterial] = useState(
    "100% GOTS-Certified Organic Linen & Botanical Dye"
  );
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85"
  );
  const [createdBanner, setCreatedBanner] = useState(false);

  if (!isOpen) return null;

  const totalInventoryUnits = products.reduce((s, p) => s + p.stock, 0);
  const totalCatalogValue = products.reduce(
    (s, p) => s + p.stock * p.price,
    0
  );
  const lowStockCount = products.filter((p) => p.stock < 20).length;
  const totalOrderRevenue = orders.reduce((s, o) => s + o.total, 0);

  const visibleProducts =
    filterCat === "all"
      ? products
      : products.filter((p) => p.category === filterCat);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProduct: Product = {
      id: `tb-custom-${Date.now()}`,
      name: name.trim(),
      subtitle: subtitle.trim() || "Atelier Limited Release",
      category,
      bodyZone,
      bundleSlot,
      price: Number(price) || 140,
      rating: 5.0,
      reviewsCount: 1,
      badge: "New Atelier Drop",
      isNew: true,
      colors: [
        { name: "Terracotta Clay", hex: "#B85D3B" },
        { name: "Warm Oat", hex: "#EAE0D5" },
      ],
      sizes:
        category === "shoes"
          ? ["EU 38", "EU 39", "EU 40", "EU 41", "EU 42"]
          : category === "jewelry"
          ? ["One Size"]
          : ["XS", "S", "M", "L", "XL"],
      material,
      fitNotes: "Anatomically draped for natural movement across the body.",
      description:
        "Added directly via THE BODY Atelier Inventory Console. Crafted with sustainable botanical textiles and organic earth pigments.",
      careInstructions: ["Gentle cold wash or eco dry clean"],
      image:
        image.trim() ||
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
      secondaryImage:
        image.trim() ||
        "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=85",
      stock: Number(stock) || 20,
      sku: `TB-AT-${Math.floor(100 + Math.random() * 900)}`,
    };

    onAddProduct(newProduct);
    setName("");
    setSubtitle("");
    setCreatedBanner(true);
    setTimeout(() => {
      setCreatedBanner(false);
      setActiveSection("inventory");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#231B18]/75 backdrop-blur-sm">
      <div
        className="w-full max-w-6xl bg-[#FAF6F0] text-[#231B18] border border-[#E2D5C4] rounded-[2.25rem] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="p-6 bg-[#231B18] text-[#FAF6F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#E6B18E] font-semibold">
              THE BODY • Backstage Operations
            </span>
            <h2 className="font-editorial text-3xl font-normal">
              Atelier Admin & Inventory Control
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {[
              { id: "inventory", label: `Catalog (${products.length})` },
              { id: "add", label: "+ Launch New Piece" },
              { id: "orders", label: `Client Orders (${orders.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveSection(tab.id as "inventory" | "add" | "orders")
                }
                className={`px-4 py-2 rounded-full text-xs font-medium transition cursor-pointer ${
                  activeSection === tab.id
                    ? "bg-[#B85D3B] text-white"
                    : "bg-[#352924] text-[#D8C8B8] hover:bg-[#463630]"
                }`}
              >
                {tab.label}
              </button>
            ))}
            <button
              onClick={onClose}
              className="ml-2 w-9 h-9 rounded-full bg-[#352924] hover:bg-[#B85D3B] text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-[#F2EAE0] border-b border-[#E2D5C4]">
          <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#E2D5C4]">
            <div className="flex items-center justify-between text-xs text-[#6E5D53] mb-1">
              <span>Active SKUs Across Body</span>
              <Package className="w-4 h-4 text-[#B85D3B]" />
            </div>
            <p className="font-editorial text-3xl font-semibold text-[#231B18]">
              {products.length} Pieces
            </p>
            <p className="text-[11px] text-[#6E5D53]">
              {totalInventoryUnits} total units in vault
            </p>
          </div>

          <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#E2D5C4]">
            <div className="flex items-center justify-between text-xs text-[#6E5D53] mb-1">
              <span>Vault Retail Valuation</span>
              <TrendingUp className="w-4 h-4 text-[#5C6B57]" />
            </div>
            <p className="font-editorial text-3xl font-semibold text-[#231B18]">
              ${totalCatalogValue.toLocaleString()}
            </p>
            <p className="text-[11px] text-[#5C6B57]">
              6 Lifestyle & Body Categories
            </p>
          </div>

          <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#E2D5C4]">
            <div className="flex items-center justify-between text-xs text-[#6E5D53] mb-1">
              <span>Low-Stock Alerts (&lt;20)</span>
              <AlertTriangle className="w-4 h-4 text-[#C69249]" />
            </div>
            <p className="font-editorial text-3xl font-semibold text-[#B85D3B]">
              {lowStockCount} SKUs
            </p>
            <p className="text-[11px] text-[#6E5D53]">
              Small-batch artisan production
            </p>
          </div>

          <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#E2D5C4]">
            <div className="flex items-center justify-between text-xs text-[#6E5D53] mb-1">
              <span>Session Dispatched Orders</span>
              <ShoppingBag className="w-4 h-4 text-[#231B18]" />
            </div>
            <p className="font-editorial text-3xl font-semibold text-[#231B18]">
              ${totalOrderRevenue.toLocaleString()}
            </p>
            <p className="text-[11px] text-[#6E5D53]">
              {orders.length} orders processed
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeSection === "inventory" && (
            <div className="space-y-4">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilterCat(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition cursor-pointer shrink-0 ${
                      filterCat === cat.id
                        ? "bg-[#231B18] text-white border-[#231B18]"
                        : "bg-white text-[#6E5D53] border-[#E2D5C4] hover:border-[#B85D3B]"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Inventory Table */}
              <div className="bg-white border border-[#E2D5C4] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#F2EAE0] text-[#6E5D53] uppercase tracking-wider text-[11px] border-b border-[#E2D5C4]">
                        <th className="py-3.5 px-4">Piece</th>
                        <th className="py-3.5 px-4">Category</th>
                        <th className="py-3.5 px-4">Body Zone</th>
                        <th className="py-3.5 px-4">Price ($)</th>
                        <th className="py-3.5 px-4">Stock Level</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFE7DC]">
                      {visibleProducts.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-[#FAF6F0]/80 transition"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-11 h-14 rounded-lg object-cover shrink-0 bg-[#F2EAE0]"
                              />
                              <div>
                                <p className="font-semibold text-[#231B18] text-sm">
                                  {item.name}
                                </p>
                                <p className="text-[#6E5D53] text-[11px]">
                                  {item.sku} • {item.subtitle}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 capitalize font-medium text-[#231B18]">
                            {item.category}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2.5 py-1 rounded-full bg-[#F2EAE0] text-[#6E5D53] text-[11px] font-medium">
                              {item.bodyZone}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <input
                              type="number"
                              value={item.price}
                              onChange={(e) =>
                                onUpdatePrice(
                                  item.id,
                                  Math.max(1, Number(e.target.value))
                                )
                              }
                              className="w-20 bg-[#FAF6F0] border border-[#DFD2C0] rounded-lg px-2.5 py-1 font-semibold text-[#231B18]"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  onUpdateStock(
                                    item.id,
                                    Math.max(0, item.stock - 1)
                                  )
                                }
                                className="w-6 h-6 rounded-md bg-[#F2EAE0] hover:bg-[#E2D5C4] flex items-center justify-center font-bold cursor-pointer"
                              >
                                -
                              </button>
                              <span
                                className={`w-10 text-center font-semibold ${
                                  item.stock < 20
                                    ? "text-[#B85D3B]"
                                    : "text-[#5C6B57]"
                                }`}
                              >
                                {item.stock}
                              </span>
                              <button
                                onClick={() =>
                                  onUpdateStock(item.id, item.stock + 5)
                                }
                                className="px-2 h-6 rounded-md bg-[#F2EAE0] hover:bg-[#E2D5C4] flex items-center justify-center text-[11px] font-medium cursor-pointer"
                              >
                                +5
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => onDeleteProduct(item.id)}
                              className="p-2 rounded-lg text-[#9A897A] hover:text-[#B85D3B] hover:bg-[#F2EAE0] transition cursor-pointer"
                              title="Remove from catalog"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === "add" && (
            <form
              onSubmit={handleCreateProduct}
              className="max-w-2xl mx-auto bg-white border border-[#E2D5C4] rounded-3xl p-6 sm:p-8 space-y-5"
            >
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#B85D3B] font-semibold">
                  New Silhouette Drop
                </span>
                <h3 className="font-editorial text-2xl text-[#231B18]">
                  Add a Piece to THE BODY Archive
                </h3>
              </div>

              {createdBanner && (
                <div className="p-3.5 rounded-2xl bg-[#5C6B57]/15 text-[#5C6B57] text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Piece added to live storefront catalog!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#231B18] mb-1">
                    Piece Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sahara Raw-Silk Kimono Trench"
                    className="w-full bg-[#FAF6F0] border border-[#DFD2C0] rounded-xl px-3.5 py-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#231B18] mb-1">
                    Subtitle / Silhouette Note
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. Hand-Loomed Belted Outer Layer"
                    className="w-full bg-[#FAF6F0] border border-[#DFD2C0] rounded-xl px-3.5 py-2.5"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#231B18] mb-1">
                    Store Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(
                        e.target.value as Exclude<CategoryId, "all">
                      )
                    }
                    className="w-full bg-[#FAF6F0] border border-[#DFD2C0] rounded-xl px-3.5 py-2.5"
                  >
                    <option value="homestay">Homestay Sanctuary</option>
                    <option value="activewear">Kinetic Activewear</option>
                    <option value="streetwear">Urban Streetwear</option>
                    <option value="evening">Atelier Resort & Evening</option>
                    <option value="jewelry">Sculptural Jewelry</option>
                    <option value="shoes">Grounded Footwear</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#231B18] mb-1">
                    Anatomical Body Zone
                  </label>
                  <select
                    value={bodyZone}
                    onChange={(e) =>
                      setBodyZone(
                        e.target.value as Exclude<BodyZoneId, "all">
                      )
                    }
                    className="w-full bg-[#FAF6F0] border border-[#DFD2C0] rounded-xl px-3.5 py-2.5"
                  >
                    <option value="head-neck">Neck & Collar (Head/Neck)</option>
                    <option value="upper-body">Torso & Core (Upper Body)</option>
                    <option value="hands-wrists">Wrists & Hands</option>
                    <option value="lower-body">Legs & Stride (Lower Body)</option>
                    <option value="feet">Foundation & Sole (Feet)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#231B18] mb-1">
                    &ldquo;Dress The Body&rdquo; Builder Slot
                  </label>
                  <select
                    value={bundleSlot}
                    onChange={(e) =>
                      setBundleSlot(e.target.value as BundleSlot)
                    }
                    className="w-full bg-[#FAF6F0] border border-[#DFD2C0] rounded-xl px-3.5 py-2.5"
                  >
                    <option value="top">Upper Body / Top</option>
                    <option value="bottom">Lower Body / Bottom</option>
                    <option value="jewelry">Sculptural Jewelry</option>
                    <option value="shoes">Grounded Footwear</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-[#231B18] mb-1">
                      Price ($ USD)
                    </label>
                    <input
                      required
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-[#DFD2C0] rounded-xl px-3.5 py-2.5"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#231B18] mb-1">
                      Initial Stock
                    </label>
                    <input
                      required
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-[#DFD2C0] rounded-xl px-3.5 py-2.5"
                    />
                  </div>
                </div>
              </div>

              <div className="text-xs">
                <label className="block font-semibold text-[#231B18] mb-1">
                  Material Architecture
                </label>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full bg-[#FAF6F0] border border-[#DFD2C0] rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div className="text-xs">
                <label className="block font-semibold text-[#231B18] mb-1">
                  Editorial Image URL
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-[#FAF6F0] border border-[#DFD2C0] rounded-xl px-3.5 py-2.5"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#B85D3B] hover:bg-[#9E4C2E] text-white font-medium text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Piece to Live Storefront</span>
              </button>
            </form>
          )}

          {activeSection === "orders" && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="bg-white border border-[#E2D5C4] rounded-2xl p-8 text-center text-xs text-[#6E5D53]">
                  No orders placed yet in this session. Complete a checkout in the Wardrobe Bag to see live order telemetry here.
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white border border-[#E2D5C4] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-[#231B18]">
                            {ord.id}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#5C6B57]/15 text-[#5C6B57] text-[11px] font-semibold">
                            {ord.status}
                          </span>
                          <span className="text-xs text-[#6E5D53]">
                            • {ord.createdAt}
                          </span>
                        </div>
                        <p className="text-xs text-[#231B18] mt-1">
                          {ord.customerName} ({ord.email})
                        </p>
                        <p className="text-[11px] text-[#6E5D53]">
                          {ord.address}, {ord.city}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-[#6E5D53] block">
                          {ord.itemsCount} Pieces
                        </span>
                        <span className="font-editorial text-2xl font-semibold text-[#B85D3B]">
                          ${ord.total}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
