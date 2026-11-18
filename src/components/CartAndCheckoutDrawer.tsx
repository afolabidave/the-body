"use client";

import React, { useState } from "react";
import { Product } from "@/data/products";
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Heart,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  Lock,
  Truck,
  Sparkles,
} from "lucide-react";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  isBundleItem?: boolean;
}

export interface SavedLook {
  id: string;
  title: string;
  createdAt: string;
  items: Product[];
}

export interface OrderRecord {
  id: string;
  customerName: string;
  email: string;
  address: string;
  city: string;
  total: number;
  itemsCount: number;
  createdAt: string;
  status: "Confirmed" | "Preparing in Atelier" | "Dispatched";
}

interface CartAndCheckoutDrawerProps {
  isOpen: boolean;
  activeTab: "bag" | "saved" | "checkout";
  onSetTab: (tab: "bag" | "saved" | "checkout") => void;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  wishlistIds: string[];
  products: Product[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  savedLooks: SavedLook[];
  onAddBundleToCart: (items: Product[]) => void;
  onRemoveSavedLook: (id: string) => void;
  onCompleteOrder: (order: OrderRecord) => void;
}

export default function CartAndCheckoutDrawer({
  isOpen,
  activeTab,
  onSetTab,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  wishlistIds,
  products,
  onToggleWishlist,
  onAddToCart,
  savedLooks,
  onAddBundleToCart,
  onRemoveSavedLook,
  onCompleteOrder,
}: CartAndCheckoutDrawerProps) {
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("Elena Vance");
  const [email, setEmail] = useState("elena.vance@atelierbody.com");
  const [address, setAddress] = useState("428 Terrazzo Way, Suite 4B");
  const [city, setCity] = useState("Los Angeles, CA 90026");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple" | "klarna">("card");
  const [completedOrder, setCompletedOrder] = useState<OrderRecord | null>(null);

  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) =>
    wishlistIds.includes(p.id)
  );

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Automatic 15% discount if cart has bundle items or 4+ distinct body zones
  const distinctSlots = new Set(cart.map((c) => c.product.bundleSlot)).size;
  const hasFullBodyDiscount =
    distinctSlots >= 4 || cart.some((c) => c.isBundleItem);

  const bundleSavings = hasFullBodyDiscount ? Math.round(subtotal * 0.15) : 0;
  const promoSavings =
    appliedPromo === "THEBODY10" ? Math.round((subtotal - bundleSavings) * 0.1) : 0;
  const shipping = subtotal - bundleSavings > 200 || subtotal === 0 ? 0 : 18;
  const finalTotal = Math.max(0, subtotal - bundleSavings - promoSavings + shipping);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "THEBODY10") {
      setAppliedPromo("THEBODY10");
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder: OrderRecord = {
      id: `TB-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName,
      email,
      address,
      city,
      total: finalTotal,
      itemsCount: cart.reduce((s, i) => s + i.quantity, 0),
      createdAt: "Just now",
      status: "Confirmed",
    };

    onCompleteOrder(newOrder);
    setCompletedOrder(newOrder);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#231B18]/65 backdrop-blur-sm">
      <div
        className="w-full max-w-lg bg-[#FAF6F0] text-[#231B18] h-full flex flex-col justify-between shadow-2xl border-l border-[#E2D5C4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Drawer Header & Tabs */}
        <div className="p-6 border-b border-[#E2D5C4] bg-[#F2EAE0]/70">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#B85D3B] font-semibold">
                THE BODY Personal Atelier
              </span>
              <h3 className="font-editorial text-2xl font-medium">
                {activeTab === "bag" && "Your Wardrobe Bag"}
                {activeTab === "saved" && "Saved Looks & Wishlist"}
                {activeTab === "checkout" && "Atelier Express Checkout"}
              </h3>
            </div>
            <button
              onClick={() => {
                setCompletedOrder(null);
                onClose();
              }}
              className="w-9 h-9 rounded-full bg-[#FAF6F0] border border-[#E2D5C4] flex items-center justify-center hover:bg-[#231B18] hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Segmented Navigation */}
          <div className="grid grid-cols-3 gap-2 bg-[#E5D9C8]/70 p-1 rounded-2xl text-xs font-medium">
            <button
              onClick={() => {
                setCompletedOrder(null);
                onSetTab("bag");
              }}
              className={`py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "bag"
                  ? "bg-[#231B18] text-[#FAF6F0] shadow"
                  : "text-[#6E5D53] hover:text-[#231B18]"
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Bag ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
            </button>
            <button
              onClick={() => {
                setCompletedOrder(null);
                onSetTab("saved");
              }}
              className={`py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "saved"
                  ? "bg-[#231B18] text-[#FAF6F0] shadow"
                  : "text-[#6E5D53] hover:text-[#231B18]"
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Saved ({wishlistedProducts.length + savedLooks.length})</span>
            </button>
            <button
              onClick={() => {
                setCompletedOrder(null);
                onSetTab("checkout");
              }}
              className={`py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "checkout"
                  ? "bg-[#B85D3B] text-white shadow"
                  : "text-[#6E5D53] hover:text-[#231B18]"
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Checkout</span>
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* ================= TAB 1: WARDROBE BAG ================= */}
          {activeTab === "bag" && (
            <>
              {/* Free Shipping / Full Body Privilege Banner */}
              <div className="bg-[#F2EAE0] border border-[#E2D5C4] rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#B85D3B]/15 text-[#B85D3B] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  {hasFullBodyDiscount ? (
                    <p className="text-[#231B18] font-medium">
                      <span className="text-[#5C6B57] font-semibold">
                        15% Full-Body Harmony Privilege Unlocked!
                      </span>{" "}
                      You are saving ${bundleSavings} on this complete ensemble.
                    </p>
                  ) : (
                    <p className="text-[#6E5D53]">
                      Combine all 4 body zones (Top, Bottom, Shoes & Jewelry) to unlock{" "}
                      <span className="font-semibold text-[#231B18]">
                        15% off your entire look
                      </span>
                      .
                    </p>
                  )}
                </div>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#F2EAE0] mx-auto flex items-center justify-center text-[#B85D3B]">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h4 className="font-editorial text-2xl text-[#231B18]">
                    Your Wardrobe Bag is Empty
                  </h4>
                  <p className="text-xs text-[#6E5D53] max-w-xs mx-auto leading-relaxed">
                    Explore Homestay Sanctuary, Kinetic Activewear, Urban Streetwear, Sculptural Jewelry, or Grounded Footwear to begin dressing the body.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                      className="flex gap-4 bg-white border border-[#E5D9C8] rounded-2xl p-3.5 shadow-xs"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-24 rounded-xl object-cover shrink-0 bg-[#F2EAE0]"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-medium text-sm text-[#231B18] truncate">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(idx)}
                              className="text-[#9A897A] hover:text-[#B85D3B] transition cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-[#6E5D53] mt-0.5">
                            {item.selectedColor} • Size {item.selectedSize}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="inline-flex items-center gap-2 bg-[#F2EAE0] rounded-xl px-2.5 py-1 border border-[#E2D5C4]">
                            <button
                              onClick={() => onUpdateQuantity(idx, -1)}
                              className="text-[#231B18] hover:text-[#B85D3B] cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-semibold w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(idx, 1)}
                              className="text-[#231B18] hover:text-[#B85D3B] cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="font-editorial text-xl font-semibold text-[#231B18]">
                            ${item.product.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Promo Code Input */}
                  <form onSubmit={handleApplyPromo} className="pt-2 flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code (Try THEBODY10)"
                      className="flex-1 bg-white border border-[#E2D5C4] rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#B85D3B]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#231B18] text-[#FAF6F0] text-xs font-medium hover:bg-[#3A2D28] transition cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                </div>
              )}
            </>
          )}

          {/* ================= TAB 2: SAVED LOOKS & WISHLIST ================= */}
          {activeTab === "saved" && (
            <div className="space-y-8">
              {/* Saved Complete Body Looks */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase tracking-[0.18em] text-[#B85D3B] font-semibold flex items-center gap-1.5">
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Saved 4-Piece Body Looks ({savedLooks.length})</span>
                  </h4>
                </div>
                {savedLooks.length === 0 ? (
                  <p className="text-xs text-[#6E5D53] bg-[#F2EAE0] p-4 rounded-2xl border border-[#E2D5C4]">
                    No saved 4-piece outfits yet. Use the &ldquo;Dress The Entire Body&rdquo; studio on the storefront to curate and bookmark ensembles.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {savedLooks.map((look) => {
                      const total = look.items.reduce((s, i) => s + i.price, 0);
                      const discounted = total - Math.round(total * 0.15);
                      return (
                        <div
                          key={look.id}
                          className="bg-white border border-[#E2D5C4] rounded-2xl p-4 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-sm text-[#231B18]">
                                {look.title}
                              </h5>
                              <p className="text-[11px] text-[#6E5D53]">
                                4 Anatomical Zones • Bundle Price ${discounted}
                              </p>
                            </div>
                            <button
                              onClick={() => onRemoveSavedLook(look.id)}
                              className="text-xs text-[#9A897A] hover:text-[#B85D3B] cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {look.items.map((item) => (
                              <img
                                key={item.id}
                                src={item.image}
                                alt={item.name}
                                title={item.name}
                                className="w-full h-16 object-cover rounded-xl bg-[#F2EAE0]"
                              />
                            ))}
                          </div>
                          <button
                            onClick={() => {
                              onAddBundleToCart(look.items);
                              onSetTab("bag");
                            }}
                            className="w-full py-2.5 rounded-xl bg-[#231B18] text-[#FAF6F0] text-xs font-medium hover:bg-[#B85D3B] transition cursor-pointer"
                          >
                            Move Entire 4-Piece Look to Bag • ${discounted}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Individual Wishlisted Pieces */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-[0.18em] text-[#6E5D53] font-semibold flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#B85D3B]" />
                  <span>Wishlisted Pieces ({wishlistedProducts.length})</span>
                </h4>
                {wishlistedProducts.length === 0 ? (
                  <p className="text-xs text-[#6E5D53] bg-[#F2EAE0] p-4 rounded-2xl border border-[#E2D5C4]">
                    Tap the heart icon on any garment, shoe, or jewelry piece to save it here.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {wishlistedProducts.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3.5 bg-white border border-[#E2D5C4] rounded-2xl p-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-20 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-medium text-[#231B18] truncate">
                            {item.name}
                          </h5>
                          <p className="text-xs text-[#6E5D53]">${item.price}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              onClick={() => {
                                onAddToCart(
                                  item,
                                  item.sizes[0] || "M",
                                  item.colors[0]?.name || "Natural"
                                );
                                onSetTab("bag");
                              }}
                              className="text-xs px-3 py-1 rounded-lg bg-[#B85D3B] text-white font-medium cursor-pointer"
                            >
                              Add to Bag
                            </button>
                            <button
                              onClick={() => onToggleWishlist(item.id)}
                              className="text-xs text-[#6E5D53] hover:text-[#231B18] cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= TAB 3: CHECKOUT SIMULATION ================= */}
          {activeTab === "checkout" && (
            <>
              {completedOrder ? (
                <div className="bg-white border border-[#E2D5C4] rounded-3xl p-6 text-center space-y-5 my-4">
                  <div className="w-14 h-14 rounded-full bg-[#5C6B57]/15 text-[#5C6B57] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#B85D3B] font-semibold">
                      Atelier Order Confirmed
                    </span>
                    <h4 className="font-editorial text-3xl text-[#231B18]">
                      Thank You, {completedOrder.customerName}
                    </h4>
                    <p className="text-xs text-[#6E5D53]">
                      Order Reference:{" "}
                      <span className="font-semibold text-[#231B18]">
                        {completedOrder.id}
                      </span>
                    </p>
                  </div>
                  <div className="bg-[#F2EAE0] rounded-2xl p-4 text-left text-xs space-y-1.5 border border-[#E2D5C4]">
                    <div className="flex justify-between">
                      <span className="text-[#6E5D53]">Destination:</span>
                      <span className="font-medium text-[#231B18]">
                        {completedOrder.address}, {completedOrder.city}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6E5D53]">Pieces Dispatched:</span>
                      <span className="font-medium text-[#231B18]">
                        {completedOrder.itemsCount} Garments / Accessories
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6E5D53]">Total Charged:</span>
                      <span className="font-semibold text-[#B85D3B]">
                        ${completedOrder.total}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#6E5D53] leading-relaxed">
                    Your order has also been logged in the live{" "}
                    <span className="font-semibold text-[#231B18]">
                      Atelier Admin & Inventory Dashboard
                    </span>
                    .
                  </p>
                  <button
                    onClick={() => {
                      setCompletedOrder(null);
                      onClose();
                    }}
                    className="w-full py-3.5 rounded-2xl bg-[#231B18] text-[#FAF6F0] text-xs font-medium hover:bg-[#B85D3B] transition cursor-pointer"
                  >
                    Continue Exploring THE BODY
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <p className="text-sm text-[#6E5D53]">
                    Add pieces to your bag before proceeding to checkout.
                  </p>
                  <button
                    onClick={() => onSetTab("bag")}
                    className="px-4 py-2 rounded-xl bg-[#231B18] text-white text-xs cursor-pointer"
                  >
                    Return to Bag
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div className="bg-[#F2EAE0] border border-[#E2D5C4] rounded-2xl p-4 space-y-3">
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#231B18] flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#B85D3B]" />
                      <span>1. Sanctuary Delivery Details</span>
                    </h4>
                    <div className="space-y-2.5">
                      <div>
                        <label className="block text-[11px] text-[#6E5D53] mb-1">
                          Full Name
                        </label>
                        <input
                          required
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-white border border-[#DFD2C0] rounded-xl px-3 py-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#6E5D53] mb-1">
                          Email for Atelier Tracking
                        </label>
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white border border-[#DFD2C0] rounded-xl px-3 py-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#6E5D53] mb-1">
                          Street Address
                        </label>
                        <input
                          required
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full bg-white border border-[#DFD2C0] rounded-xl px-3 py-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#6E5D53] mb-1">
                          City, State & Postal Code
                        </label>
                        <input
                          required
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full bg-white border border-[#DFD2C0] rounded-xl px-3 py-2 text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F2EAE0] border border-[#E2D5C4] rounded-2xl p-4 space-y-3">
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#231B18] flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#B85D3B]" />
                      <span>2. Payment Instrument</span>
                    </h4>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {[
                        { id: "card", label: "Atelier Card" },
                        { id: "apple", label: "Apple Pay" },
                        { id: "klarna", label: "4x Interest-Free" },
                      ].map((pm) => (
                        <button
                          type="button"
                          key={pm.id}
                          onClick={() =>
                            setPaymentMethod(pm.id as "card" | "apple" | "klarna")
                          }
                          className={`py-2 px-2.5 rounded-xl border text-center font-medium transition cursor-pointer ${
                            paymentMethod === pm.id
                              ? "bg-[#231B18] text-white border-[#231B18]"
                              : "bg-white text-[#231B18] border-[#DFD2C0]"
                          }`}
                        >
                          {pm.label}
                        </button>
                      ))}
                    </div>
                    <div className="bg-white border border-[#DFD2C0] rounded-xl p-3 text-xs text-[#6E5D53] flex items-center justify-between">
                      <span>•••• •••• •••• 4819 (Encrypted Sandbox)</span>
                      <span className="text-[#5C6B57] font-semibold">Ready</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-[#B85D3B] hover:bg-[#9E4C2E] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                  >
                    <span>Complete Atelier Order • ${finalTotal}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </>
          )}
        </div>

        {/* Bottom Summary Footer */}
        {cart.length > 0 && !completedOrder && (
          <div className="p-6 border-t border-[#E2D5C4] bg-[#F2EAE0] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#6E5D53]">
                <span>Wardrobe Subtotal</span>
                <span>${subtotal}</span>
              </div>
              {bundleSavings > 0 && (
                <div className="flex justify-between text-[#5C6B57] font-medium">
                  <span>Full-Body 4-Zone Bundle Privilege (15%)</span>
                  <span>-${bundleSavings}</span>
                </div>
              )}
              {promoSavings > 0 && (
                <div className="flex justify-between text-[#B85D3B] font-medium">
                  <span>Promo Code (THEBODY10)</span>
                  <span>-${promoSavings}</span>
                </div>
              )}
              <div className="flex justify-between text-[#6E5D53]">
                <span>Carbon-Neutral Courier</span>
                <span>{shipping === 0 ? "Complimentary" : `$${shipping}`}</span>
              </div>
              <div className="pt-2 border-t border-[#DFD2C0] flex justify-between items-baseline">
                <span className="text-sm font-semibold text-[#231B18]">
                  Total
                </span>
                <span className="font-editorial text-2xl font-semibold text-[#231B18]">
                  ${finalTotal}
                </span>
              </div>
            </div>

            {activeTab !== "checkout" && (
              <button
                onClick={() => onSetTab("checkout")}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#231B18] hover:bg-[#B85D3B] text-[#FAF6F0] text-sm font-medium flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Proceed to Atelier Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
