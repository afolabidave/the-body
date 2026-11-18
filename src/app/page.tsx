"use client";

import React, { useState, useMemo } from "react";
import {
  INITIAL_PRODUCTS,
  CATEGORIES,
  BODY_ZONES,
  Product,
  CategoryId,
  BodyZoneId,
} from "@/data/products";
import BodySilhouetteFilter from "@/components/BodySilhouetteFilter";
import DressTheBodyStudio from "@/components/DressTheBodyStudio";
import ProductQuickViewModal from "@/components/ProductQuickViewModal";
import CartAndCheckoutDrawer, {
  CartItem,
  SavedLook,
  OrderRecord,
} from "@/components/CartAndCheckoutDrawer";
import AdminDashboardModal from "@/components/AdminDashboardModal";
import {
  ShoppingBag,
  Heart,
  Search,
  Sparkles,
  SlidersHorizontal,
  ArrowUpRight,
  Star,
  Eye,
  Plus,
  Layers,
  ShieldCheck,
  Leaf,
  Compass,
  LayoutDashboard,
  Check,
  X,
} from "lucide-react";

export default function TheBodyStorefront() {
  // Storefront Catalog State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("all");
  const [selectedBodyZone, setSelectedBodyZone] = useState<BodyZoneId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "featured" | "price-asc" | "price-desc" | "rating"
  >("featured");
  const [showAnatomyMap, setShowAnatomyMap] = useState<boolean>(true);

  // Modals & Drawers
  const [inspectProduct, setInspectProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<"bag" | "saved" | "checkout">(
    "bag"
  );
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Cart, Wishlist, Saved Looks, Orders
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[0],
      quantity: 1,
      selectedSize: "M/L",
      selectedColor: "Baked Terracotta",
    },
    {
      product: INITIAL_PRODUCTS[16], // Clavicle Molten Bronze Collar
      quantity: 1,
      selectedSize: "One Size (Adjustable Open Back)",
      selectedColor: "18k Recycled Gold Vermeil",
    },
  ]);

  const [wishlistIds, setWishlistIds] = useState<string[]>([
    "tb-home-01",
    "tb-sho-01",
    "tb-jwl-01",
  ]);

  const [savedLooks, setSavedLooks] = useState<SavedLook[]>([
    {
      id: "saved-default-1",
      title: "01 / Sunday Sanctuary Ritual",
      createdAt: "Curated Preset",
      items: [
        INITIAL_PRODUCTS[0],
        INITIAL_PRODUCTS[1],
        INITIAL_PRODUCTS[22],
        INITIAL_PRODUCTS[17],
      ],
    },
  ]);

  const [orders, setOrders] = useState<OrderRecord[]>([
    {
      id: "TB-842910",
      customerName: "Amara Okafor",
      email: "amara@solstice.studio",
      address: "194 Mercer St, Apt 6A",
      city: "New York, NY 10012",
      total: 518,
      itemsCount: 4,
      createdAt: "2 hours ago",
      status: "Dispatched",
    },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Counts per body zone
  const zoneCounts = useMemo(() => {
    const counts: Record<BodyZoneId, number> = {
      all: products.length,
      "head-neck": 0,
      "upper-body": 0,
      "hands-wrists": 0,
      "lower-body": 0,
      feet: 0,
    };
    products.forEach((p) => {
      counts[p.bodyZone] = (counts[p.bodyZone] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCat =
          selectedCategory === "all" || p.category === selectedCategory;
        const matchesZone =
          selectedBodyZone === "all" || p.bodyZone === selectedBodyZone;
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q);
        return matchesCat && matchesZone && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [products, selectedCategory, selectedBodyZone, searchQuery, sortBy]);

  const activeCategoryMeta =
    CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  // Cart & Wishlist Handlers
  const handleAddToCart = (
    product: Product,
    size?: string,
    color?: string,
    isBundleItem?: boolean
  ) => {
    const chosenSize = size || product.sizes[0] || "One Size";
    const chosenColor = color || product.colors[0]?.name || "Natural";

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === chosenSize &&
          item.selectedColor === chosenColor
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
          isBundleItem: updated[existingIndex].isBundleItem || isBundleItem,
        };
        return updated;
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          isBundleItem,
        },
      ];
    });

    triggerToast(`Added "${product.name}" to your Wardrobe Bag`);
  };

  const handleAddBundleToCart = (bundleItems: Product[]) => {
    bundleItems.forEach((item) => {
      handleAddToCart(
        item,
        item.sizes[0] || "One Size",
        item.colors[0]?.name || "Natural",
        true
      );
    });
    triggerToast("Complete 4-Piece Body Look added with 15% privilege!");
    setDrawerTab("bag");
    setIsDrawerOpen(true);
  };

  const handleSaveLook = (lookTitle: string, items: Product[]) => {
    const newLook: SavedLook = {
      id: `look-${Date.now()}`,
      title: lookTitle,
      createdAt: "Just now",
      items,
    };
    setSavedLooks((prev) => [newLook, ...prev]);
    triggerToast(`Saved "${lookTitle}" to your Lookbook`);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleUpdateCartQty = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, idx) => idx !== index);
      }
      updated[index] = { ...updated[index], quantity: newQty };
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Admin Handlers
  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    triggerToast(`Published "${newProd.name}" to THE BODY catalog`);
  };

  const handleUpdateStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
    );
  };

  const handleUpdatePrice = (productId: string, newPrice: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, price: newPrice } : p))
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    triggerToast("Piece removed from active catalog");
  };

  const totalBagCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-organic-gradient text-[#231B18]">
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#231B18] text-[#FAF6F0] px-5 py-3.5 rounded-2xl shadow-2xl border border-[#44352F] flex items-center gap-3 text-xs font-medium animate-bounce">
          <div className="w-6 h-6 rounded-full bg-[#B85D3B] text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Announcement Ribbon */}
      <div className="bg-[#231B18] text-[#EFE6DA] text-[11px] sm:text-xs py-2.5 px-4 text-center tracking-wide border-b border-[#3A2E29]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-2">
          <span className="hidden md:inline text-[#C9B8A6]">
            CROWN TO SOLE ARCHITECTURE • HOMESTAY • ACTIVE • STREET • EVENING • JEWELRY • FOOTWEAR
          </span>
          <span className="font-medium text-[#E6B18E]">
            Curate any 4-Piece Full-Body Ensemble & Unlock 15% Atelier Privilege + Code{" "}
            <strong className="underline">THEBODY10</strong>
          </span>
          <button
            onClick={() => setIsAdminOpen(true)}
            className="inline-flex items-center gap-1.5 text-[#E6B18E] hover:text-white underline cursor-pointer"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Atelier Admin Console</span>
          </button>
        </div>
      </div>

      {/* Sticky Editorial Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#E5D9C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSelectedCategory("all");
                setSelectedBodyZone("all");
              }}
              className="group flex flex-col"
            >
              <span className="font-editorial text-3xl sm:text-4xl tracking-[0.18em] font-semibold text-[#231B18]">
                THE BODY
              </span>
              <span className="text-[9px] uppercase tracking-[0.32em] text-[#B85D3B] -mt-1 font-medium">
                Entire Silhouette Atelier
              </span>
            </a>

            {/* Quick Category Links on Desktop */}
            <nav className="hidden xl:flex items-center gap-1 pl-4 border-l border-[#E2D5C4]">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      document
                        .getElementById("catalog-section")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`px-3.5 py-2 rounded-full text-xs font-medium transition cursor-pointer ${
                      active
                        ? "bg-[#231B18] text-[#FAF6F0]"
                        : "text-[#5C4E46] hover:text-[#231B18] hover:bg-[#F2EAE0]"
                    }`}
                  >
                    {cat.id === "all" ? "All Archive" : cat.name.split(" ")[0]}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Controls: Search, Studio Anchor, Wishlist, Cart, Admin */}
          <div className="flex items-center gap-2.5">
            {/* Search Input */}
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 text-[#8C7A6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search linen, hoodie, mules, gold..."
                className="w-48 lg:w-64 pl-9 pr-7 py-2 rounded-full bg-[#F2EAE0] border border-[#E2D5C4] text-xs text-[#231B18] placeholder:text-[#8C7A6B] focus:outline-none focus:border-[#B85D3B] transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C7A6B] hover:text-[#231B18] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dress The Body Studio Pill */}
            <a
              href="#dress-the-body"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#B85D3B]/15 text-[#B85D3B] hover:bg-[#B85D3B] hover:text-white border border-[#B85D3B]/30 text-xs font-semibold transition"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>4-Zone Look Builder</span>
            </a>

            {/* Saved / Wishlist Button */}
            <button
              onClick={() => {
                setDrawerTab("saved");
                setIsDrawerOpen(true);
              }}
              className="relative p-2.5 rounded-full bg-[#F2EAE0] hover:bg-[#E5D9C8] text-[#231B18] border border-[#E2D5C4] transition cursor-pointer"
              title="Saved Looks & Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistIds.length + savedLooks.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#5C6B57] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistIds.length + savedLooks.length}
                </span>
              )}
            </button>

            {/* Admin Inventory Console Trigger */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-2.5 rounded-full bg-[#F2EAE0] hover:bg-[#E5D9C8] text-[#231B18] border border-[#E2D5C4] transition cursor-pointer"
              title="Atelier Inventory & Admin Dashboard"
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>

            {/* Wardrobe Bag Button */}
            <button
              onClick={() => {
                setDrawerTab("bag");
                setIsDrawerOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#231B18] hover:bg-[#B85D3B] text-[#FAF6F0] text-xs font-medium shadow-sm transition cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Wardrobe Bag</span>
              <span className="px-2 py-0.5 rounded-full bg-[#B85D3B] text-white text-[11px] font-semibold">
                {totalBagCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO EDITORIAL SECTION ================= */}
      <section className="relative overflow-hidden pt-8 pb-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left 7 Cols: Editorial Story & Category Quick Portals */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F2EAE0] border border-[#DFD1C0] text-xs text-[#B85D3B] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Holistic Wardrobe System • Crown to Sole</span>
            </div>

            <h1 className="font-editorial text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.04] tracking-tight text-[#231B18]">
              Organic Architecture for{" "}
              <span className="italic text-[#B85D3B]">The Entire Body.</span>
            </h1>

            <p className="text-[#5C4E46] text-base sm:text-lg max-w-2xl leading-relaxed">
              We dress the human form as a single living ecosystem. Transition seamlessly from{" "}
              <strong className="text-[#231B18] font-medium">
                Homestay Sanctuary
              </strong>{" "}
              knits and{" "}
              <strong className="text-[#231B18] font-medium">
                Kinetic Activewear
              </strong>{" "}
              to{" "}
              <strong className="text-[#231B18] font-medium">
                Urban Streetwear
              </strong>{" "}
              and{" "}
              <strong className="text-[#231B18] font-medium">
                Atelier Evening
              </strong>
              —completed with hand-cast{" "}
              <strong className="text-[#231B18] font-medium">
                Sculptural Jewelry
              </strong>{" "}
              and anatomical{" "}
              <strong className="text-[#231B18] font-medium">
                Grounded Footwear
              </strong>
              .
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() =>
                  document
                    .getElementById("catalog-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-7 py-4 rounded-full bg-[#231B18] hover:bg-[#B85D3B] text-[#FAF6F0] text-sm font-medium inline-flex items-center gap-2.5 shadow-lg transition cursor-pointer"
              >
                <span>Explore Full Body Archive</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href="#dress-the-body"
                className="px-7 py-4 rounded-full bg-[#F2EAE0] hover:bg-[#E5D9C8] text-[#231B18] border border-[#D8C7B4] text-sm font-medium inline-flex items-center gap-2 transition"
              >
                <Layers className="w-4 h-4 text-[#B85D3B]" />
                <span>Build 4-Piece Outfit (15% Off)</span>
              </a>
            </div>

            {/* 6-Pillar Mini Metrics */}
            <div className="pt-6 grid grid-cols-3 sm:grid-cols-6 gap-2.5 border-t border-[#E5D9C8]">
              {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    document
                      .getElementById("catalog-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-left p-2.5 rounded-2xl bg-[#F2EAE0]/70 hover:bg-[#231B18] hover:text-[#FAF6F0] border border-[#E2D5C4] transition group cursor-pointer"
                >
                  <span className="block text-[10px] uppercase tracking-widest text-[#B85D3B] group-hover:text-[#E6B18E] font-semibold">
                    {cat.countLabel}
                  </span>
                  <span className="font-medium text-xs block truncate mt-0.5">
                    {cat.name.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right 5 Cols: Layered Editorial Bento Collage */}
          <div className="lg:col-span-5 grid grid-cols-12 gap-4 items-stretch">
            {/* Tall Primary Image */}
            <div
              onClick={() => setInspectProduct(products[0])}
              className="col-span-7 relative rounded-[2.25rem] overflow-hidden aspect-[3/4] shadow-xl border border-[#E2D5C4] group cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85"
                alt="THE BODY Full Silhouette"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#231B18]/80 via-transparent to-transparent flex flex-col justify-end p-5 text-[#FAF6F0]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#E6B18E]">
                  01 • Homestay & Lounge
                </span>
                <p className="font-editorial text-2xl leading-snug">
                  Cloud-Waffle Sanctuary
                </p>
                <span className="text-xs text-[#D8C8B8] mt-1 inline-flex items-center gap-1">
                  <span>Inspect Piece</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Right Stack: Jewelry + Shoes */}
            <div className="col-span-5 flex flex-col gap-4">
              <div
                onClick={() => {
                  setSelectedCategory("jewelry");
                  document
                    .getElementById("catalog-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 relative rounded-[2rem] overflow-hidden shadow-md border border-[#E2D5C4] group cursor-pointer min-h-[170px]"
              >
                <img
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=85"
                  alt="Sculptural Jewelry"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#231B18]/80 via-transparent to-transparent flex flex-col justify-end p-4 text-[#FAF6F0]">
                  <span className="text-[10px] uppercase tracking-widest text-[#E6B18E]">
                    Neck & Wrist
                  </span>
                  <p className="font-editorial text-xl">Sculptural Jewelry</p>
                </div>
              </div>

              <div
                onClick={() => {
                  setSelectedCategory("shoes");
                  document
                    .getElementById("catalog-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 relative rounded-[2rem] overflow-hidden shadow-md border border-[#E2D5C4] group cursor-pointer min-h-[170px]"
              >
                <img
                  src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85"
                  alt="Grounded Footwear"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#231B18]/80 via-transparent to-transparent flex flex-col justify-end p-4 text-[#FAF6F0]">
                  <span className="text-[10px] uppercase tracking-widest text-[#E6B18E]">
                    Sole Foundation
                  </span>
                  <p className="font-editorial text-xl">Grounded Shoes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6-CATEGORY VISUAL SHOWCASE BENTO ================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#B85D3B] font-semibold">
              Six Pillars of The Body
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#231B18] mt-1">
              Curated Categories for Every Rhythm
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6E5D53] max-w-md">
            Select any category card below to filter the live catalog, or combine categories with our anatomical body-zone selector.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(isSelected ? "all" : cat.id);
                  document
                    .getElementById("catalog-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group relative rounded-[2rem] overflow-hidden border transition-all duration-300 cursor-pointer h-72 flex flex-col justify-end p-6 ${
                  isSelected
                    ? "border-[#B85D3B] ring-4 ring-[#B85D3B]/25 shadow-xl"
                    : "border-[#E2D5C4] shadow-sm hover:shadow-xl"
                }`}
              >
                <img
                  src={cat.heroImage}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#231B18]/90 via-[#231B18]/35 to-transparent" />

                <div className="relative z-10 space-y-1.5 text-[#FAF6F0]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.22em] px-2.5 py-1 rounded-full bg-[#FAF6F0]/15 backdrop-blur-md text-[#E6B18E] font-semibold">
                      {cat.tagline}
                    </span>
                    <span className="text-xs font-medium text-[#D8C8B8]">
                      {cat.countLabel}
                    </span>
                  </div>
                  <h3 className="font-editorial text-3xl font-normal">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#D8C8B8] line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= MAIN CATALOG & ANATOMICAL SILHOUETTE FILTER ================= */}
      <section
        id="catalog-section"
        className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8"
      >
        {/* Interactive Body Silhouette Filter Toggle & Component */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#B85D3B] font-semibold">
                Dual-Axis Wardrobe Filtering
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#231B18]">
                {activeCategoryMeta.name}
              </h2>
            </div>

            <button
              onClick={() => setShowAnatomyMap((prev) => !prev)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F2EAE0] hover:bg-[#E5D9C8] text-[#231B18] border border-[#E2D5C4] text-xs font-medium transition cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#B85D3B]" />
              <span>
                {showAnatomyMap
                  ? "Hide Interactive Body Anatomy Map"
                  : "Show Interactive Body Anatomy Map"}
              </span>
            </button>
          </div>

          {showAnatomyMap && (
            <BodySilhouetteFilter
              selectedZone={selectedBodyZone}
              onSelectZone={setSelectedBodyZone}
              zoneCounts={zoneCounts}
            />
          )}
        </div>

        {/* Category Tabs + Sort & Active Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E2D5C4]">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-full text-xs font-medium transition shrink-0 cursor-pointer border ${
                    active
                      ? "bg-[#231B18] text-[#FAF6F0] border-[#231B18] shadow-sm"
                      : "bg-[#FAF6F0] text-[#5C4E46] border-[#E2D5C4] hover:border-[#B85D3B]"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Sort & Filter Status */}
          <div className="flex flex-wrap items-center gap-3">
            {(selectedCategory !== "all" ||
              selectedBodyZone !== "all" ||
              searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedBodyZone("all");
                  setSearchQuery("");
                }}
                className="text-xs text-[#B85D3B] hover:underline font-medium cursor-pointer"
              >
                Reset filters ({filteredProducts.length} shown)
              </button>
            )}

            <div className="flex items-center gap-2 bg-[#F2EAE0] border border-[#E2D5C4] rounded-full px-3.5 py-1.5 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B85D3B]" />
              <span className="text-[#6E5D53]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as
                      | "featured"
                      | "price-asc"
                      | "price-desc"
                      | "rating"
                  )
                }
                className="bg-transparent font-medium text-[#231B18] focus:outline-none cursor-pointer"
              >
                <option value="featured">Atelier Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Client Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-[#F2EAE0] border border-[#E2D5C4] rounded-[2rem] p-12 text-center space-y-4">
            <h3 className="font-editorial text-3xl text-[#231B18]">
              No Pieces Match This Exact Combination
            </h3>
            <p className="text-sm text-[#6E5D53] max-w-md mx-auto">
              For example, Sculptural Jewelry lives on the Neck &amp; Collar or Wrists &amp; Hands zones, while Grounded Footwear anchors the Feet zone.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedBodyZone("all");
                setSearchQuery("");
              }}
              className="px-6 py-3 rounded-full bg-[#231B18] text-[#FAF6F0] text-xs font-medium hover:bg-[#B85D3B] transition cursor-pointer"
            >
              Show Entire Body Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const zoneLabel =
                BODY_ZONES.find((z) => z.id === product.bodyZone)?.label ||
                product.bodyZone;

              return (
                <div
                  key={product.id}
                  className="group bg-[#FAF6F0] border border-[#E5D9C8] hover:border-[#B85D3B] rounded-[2rem] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Product Image Box */}
                    <div className="relative aspect-[4/5] bg-[#F2EAE0] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        onClick={() => setInspectProduct(product)}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700 cursor-pointer"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5">
                        {product.badge && (
                          <span className="px-3 py-1 rounded-full bg-[#231B18]/85 backdrop-blur-md text-[#FAF6F0] text-[11px] font-medium">
                            {product.badge}
                          </span>
                        )}
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FAF6F0]/90 backdrop-blur-md text-[#6E5D53] text-[10px] font-semibold uppercase tracking-wider">
                          {zoneLabel}
                        </span>
                      </div>

                      {/* Wishlist Toggle */}
                      <button
                        onClick={() => handleToggleWishlist(product.id)}
                        className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition cursor-pointer ${
                          isWishlisted
                            ? "bg-[#B85D3B] text-white border-[#B85D3B]"
                            : "bg-[#FAF6F0]/85 text-[#231B18] border-[#E2D5C4] hover:bg-[#231B18] hover:text-white"
                        }`}
                        aria-label="Toggle wishlist"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isWishlisted ? "fill-white" : ""
                          }`}
                        />
                      </button>

                      {/* Hover Quick Actions Bar */}
                      <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-95 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 py-2.5 px-3.5 rounded-xl bg-[#231B18]/95 hover:bg-[#B85D3B] text-[#FAF6F0] text-xs font-medium flex items-center justify-center gap-1.5 shadow-lg transition cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Quick Add</span>
                        </button>
                        <button
                          onClick={() => setInspectProduct(product)}
                          className="p-2.5 rounded-xl bg-[#FAF6F0]/95 hover:bg-white text-[#231B18] border border-[#E2D5C4] shadow-lg transition cursor-pointer"
                          title="Quick View & Fit Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-[#6E5D53]">
                        <span className="uppercase tracking-widest font-semibold text-[#B85D3B]">
                          {product.category}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Star className="w-3 h-3 fill-[#C69249] text-[#C69249]" />
                          <span className="font-semibold text-[#231B18]">
                            {product.rating}
                          </span>
                          <span>({product.reviewsCount})</span>
                        </span>
                      </div>

                      <h3
                        onClick={() => setInspectProduct(product)}
                        className="font-editorial text-2xl font-medium text-[#231B18] group-hover:text-[#B85D3B] transition cursor-pointer leading-snug"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#6E5D53] line-clamp-1">
                        {product.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Swatches & Price Footer */}
                  <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-[#EFE7DC]">
                    <div className="flex items-center gap-1.5">
                      {product.colors.map((c) => (
                        <span
                          key={c.name}
                          title={c.name}
                          className="w-4 h-4 rounded-full border border-black/20 shadow-2xs"
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>

                    <div className="flex items-baseline gap-1.5">
                      {product.originalPrice && (
                        <span className="text-xs text-[#9A897A] line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                      <span className="font-editorial text-2xl font-semibold text-[#231B18]">
                        ${product.price}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ================= "DRESS THE BODY" 4-PIECE BUNDLE STUDIO ================= */}
      <DressTheBodyStudio
        products={products}
        onAddBundleToCart={handleAddBundleToCart}
        onSaveLook={handleSaveLook}
        onInspectProduct={setInspectProduct}
      />

      {/* ================= MATERIAL ETHOS & ORGANIC PILLARS ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#F2EAE0] border border-[#E2D5C4] rounded-[2.5rem] p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2.5">
            <div className="w-11 h-11 rounded-2xl bg-[#B85D3B]/15 text-[#B85D3B] flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-2xl font-medium text-[#231B18]">
              Botanical & Mineral Dyes
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4E46] leading-relaxed">
              Every terracotta, sage, oat, and espresso pigment is derived from madder root, iron oxide clay, walnut hull, and organic indigo—gentle on your skin’s microbiome.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="w-11 h-11 rounded-2xl bg-[#5C6B57]/15 text-[#5C6B57] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-2xl font-medium text-[#231B18]">
              Modular Body Harmony
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4E46] leading-relaxed">
              Our proportions are calibrated so an Activewear compression tank layers effortlessly under a Streetwear canvas chore coat or alongside Evening silk and Hand-Cast Jewelry.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="w-11 h-11 rounded-2xl bg-[#231B18]/10 text-[#231B18] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-2xl font-medium text-[#231B18]">
              Anatomical Podiatry & Metals
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4E46] leading-relaxed">
              From wide toe-box cork footbeds that align spinal posture to recycled 18k gold vermeil cast to follow the clavicle, every extremity is honored.
            </p>
          </div>
        </div>
      </section>

      {/* ================= EDITORIAL FOOTER ================= */}
      <footer className="bg-[#231B18] text-[#EFE6DA] pt-16 pb-12 px-4 sm:px-6 lg:px-8 mt-auto border-t border-[#3B2E29]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#3B2E29]">
          <div className="md:col-span-5 space-y-4">
            <span className="font-editorial text-4xl tracking-[0.2em] text-[#FAF6F0] block">
              THE BODY
            </span>
            <p className="text-xs sm:text-sm text-[#C9B8A6] max-w-sm leading-relaxed">
              Holistic lifestyle fashion house catering to the entire human silhouette. Homestay Sanctuary, Kinetic Activewear, Urban Streetwear, Atelier Evening, Sculptural Jewelry, and Grounded Footwear.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-[#E6B18E]">
              <span className="px-3 py-1 rounded-full bg-[#352924] border border-[#4D3C35]">
                GOTS Organic Certified
              </span>
              <span className="px-3 py-1 rounded-full bg-[#352924] border border-[#4D3C35]">
                Recycled 18k Vermeil
              </span>
              <span className="px-3 py-1 rounded-full bg-[#352924] border border-[#4D3C35]">
                Vibram® & Natural Cork
              </span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="uppercase tracking-[0.2em] text-[#E6B18E] font-semibold">
              Wardrobe Pillars
            </h4>
            <ul className="space-y-2 text-[#C9B8A6]">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(c.id);
                      document
                        .getElementById("catalog-section")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-white transition cursor-pointer"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="uppercase tracking-[0.2em] text-[#E6B18E] font-semibold">
              Atelier Tools & Operations
            </h4>
            <p className="text-[#C9B8A6] leading-relaxed">
              Manage live stock counts, launch new silhouettes, or inspect session orders inside the integrated Atelier Admin Console.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              <button
                onClick={() => setIsAdminOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#B85D3B] hover:bg-[#9E4C2E] text-white font-medium inline-flex items-center gap-2 transition cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Open Admin & Inventory Dashboard</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A89686] gap-4">
          <p>© {new Date().getFullYear()} THE BODY Atelier. All anatomical rights reserved.</p>
          <p>Designed with Warm &amp; Organic Lifestyle Aesthetics — Terracotta, Travertine &amp; Raw Linen.</p>
        </div>
      </footer>

      {/* ================= MODALS & SLIDE-OUT DRAWERS ================= */}
      <ProductQuickViewModal
        product={inspectProduct}
        onClose={() => setInspectProduct(null)}
        onAddToCart={(prod, size, color) =>
          handleAddToCart(prod, size, color, false)
        }
        isWishlisted={
          inspectProduct ? wishlistIds.includes(inspectProduct.id) : false
        }
        onToggleWishlist={handleToggleWishlist}
      />

      <CartAndCheckoutDrawer
        isOpen={isDrawerOpen}
        activeTab={drawerTab}
        onSetTab={setDrawerTab}
        onClose={() => setIsDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
        wishlistIds={wishlistIds}
        products={products}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={(prod, size, color) =>
          handleAddToCart(prod, size, color, false)
        }
        savedLooks={savedLooks}
        onAddBundleToCart={handleAddBundleToCart}
        onRemoveSavedLook={(id) =>
          setSavedLooks((prev) => prev.filter((l) => l.id !== id))
        }
        onCompleteOrder={(newOrd) => {
          setOrders((prev) => [newOrd, ...prev]);
          triggerToast(`Order ${newOrd.id} confirmed!`);
        }}
      />

      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateStock={handleUpdateStock}
        onUpdatePrice={handleUpdatePrice}
        onDeleteProduct={handleDeleteProduct}
        orders={orders}
      />
    </div>
  );
}
