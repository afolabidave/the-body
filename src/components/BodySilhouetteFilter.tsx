"use client";

import React from "react";
import { BodyZoneId, BODY_ZONES } from "@/data/products";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface BodySilhouetteFilterProps {
  selectedZone: BodyZoneId;
  onSelectZone: (zone: BodyZoneId) => void;
  zoneCounts: Record<BodyZoneId, number>;
}

export default function BodySilhouetteFilter({
  selectedZone,
  onSelectZone,
  zoneCounts,
}: BodySilhouetteFilterProps) {
  const activeMeta =
    BODY_ZONES.find((z) => z.id === selectedZone) || BODY_ZONES[0];

  return (
    <div className="bg-[#F2EAE0] border border-[#E2D5C4] rounded-[2rem] p-6 md:p-8 shadow-sm">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Left: Interactive Anatomical Silhouette Card */}
        <div className="relative w-full max-w-[300px] aspect-[3/4] bg-[#FAF6F0] rounded-[1.75rem] border border-[#E2D5C4] p-4 flex flex-col items-center justify-between overflow-hidden shadow-inner">
          <div className="w-full flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#6E5D53] font-medium z-10">
            <span>Anatomical Map</span>
            <span className="text-[#B85D3B] font-semibold">Crown → Sole</span>
          </div>

          {/* Minimalist Organic Human Figure SVG */}
          <svg
            viewBox="0 0 200 340"
            className="w-48 h-72 my-auto select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Subtle Aura Circles */}
            <circle
              cx="100"
              cy="170"
              r="85"
              stroke="#E5D9C8"
              strokeDasharray="3 3"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="10"
              x2="100"
              y2="330"
              stroke="#E5D9C8"
              strokeWidth="1"
            />

            {/* Head & Neck Zone */}
            <g
              onClick={() =>
                onSelectZone(
                  selectedZone === "head-neck" ? "all" : "head-neck"
                )
              }
              className="cursor-pointer transition-all duration-300 group"
            >
              <circle
                cx="100"
                cy="38"
                r="17"
                fill={
                  selectedZone === "head-neck" || selectedZone === "all"
                    ? "#B85D3B"
                    : "#DFD1C0"
                }
                fillOpacity={
                  selectedZone === "head-neck"
                    ? "0.9"
                    : selectedZone === "all"
                    ? "0.3"
                    : "0.5"
                }
                stroke="#B85D3B"
                strokeWidth={selectedZone === "head-neck" ? "2.5" : "1.2"}
              />
              {/* Neck & Clavicle */}
              <path
                d="M92 56 L108 56 L114 70 L86 70 Z"
                fill={
                  selectedZone === "head-neck" || selectedZone === "all"
                    ? "#B85D3B"
                    : "#DFD1C0"
                }
                fillOpacity={
                  selectedZone === "head-neck"
                    ? "0.9"
                    : selectedZone === "all"
                    ? "0.35"
                    : "0.5"
                }
                stroke="#B85D3B"
                strokeWidth="1.2"
              />
            </g>

            {/* Upper Body / Torso Zone */}
            <g
              onClick={() =>
                onSelectZone(
                  selectedZone === "upper-body" ? "all" : "upper-body"
                )
              }
              className="cursor-pointer transition-all duration-300"
            >
              <path
                d="M66 74 C66 71 82 68 100 68 C118 68 134 71 134 74 L142 135 L127 137 L122 95 L118 156 L82 156 L78 95 L73 137 L58 135 Z"
                fill={
                  selectedZone === "upper-body" || selectedZone === "all"
                    ? "#B85D3B"
                    : "#DFD1C0"
                }
                fillOpacity={
                  selectedZone === "upper-body"
                    ? "0.88"
                    : selectedZone === "all"
                    ? "0.35"
                    : "0.5"
                }
                stroke="#B85D3B"
                strokeWidth={selectedZone === "upper-body" ? "2.5" : "1.2"}
                strokeLinejoin="round"
              />
            </g>

            {/* Hands & Wrists Zone (Left & Right) */}
            <g
              onClick={() =>
                onSelectZone(
                  selectedZone === "hands-wrists" ? "all" : "hands-wrists"
                )
              }
              className="cursor-pointer transition-all duration-300"
            >
              {/* Left Wrist/Hand */}
              <rect
                x="53"
                y="138"
                width="16"
                height="26"
                rx="7"
                transform="rotate(8 53 138)"
                fill={
                  selectedZone === "hands-wrists" || selectedZone === "all"
                    ? "#C69249"
                    : "#DFD1C0"
                }
                fillOpacity={
                  selectedZone === "hands-wrists"
                    ? "0.95"
                    : selectedZone === "all"
                    ? "0.45"
                    : "0.5"
                }
                stroke="#9E5A3C"
                strokeWidth={selectedZone === "hands-wrists" ? "2.5" : "1.2"}
              />
              {/* Right Wrist/Hand */}
              <rect
                x="131"
                y="139"
                width="16"
                height="26"
                rx="7"
                transform="rotate(-8 131 139)"
                fill={
                  selectedZone === "hands-wrists" || selectedZone === "all"
                    ? "#C69249"
                    : "#DFD1C0"
                }
                fillOpacity={
                  selectedZone === "hands-wrists"
                    ? "0.95"
                    : selectedZone === "all"
                    ? "0.45"
                    : "0.5"
                }
                stroke="#9E5A3C"
                strokeWidth={selectedZone === "hands-wrists" ? "2.5" : "1.2"}
              />
            </g>

            {/* Lower Body / Legs Zone */}
            <g
              onClick={() =>
                onSelectZone(
                  selectedZone === "lower-body" ? "all" : "lower-body"
                )
              }
              className="cursor-pointer transition-all duration-300"
            >
              <path
                d="M81 160 L119 160 L126 278 L105 278 L100 198 L95 278 L74 278 Z"
                fill={
                  selectedZone === "lower-body" || selectedZone === "all"
                    ? "#5C6B57"
                    : "#DFD1C0"
                }
                fillOpacity={
                  selectedZone === "lower-body"
                    ? "0.88"
                    : selectedZone === "all"
                    ? "0.35"
                    : "0.5"
                }
                stroke="#5C6B57"
                strokeWidth={selectedZone === "lower-body" ? "2.5" : "1.2"}
                strokeLinejoin="round"
              />
            </g>

            {/* Feet / Footwear Zone */}
            <g
              onClick={() =>
                onSelectZone(selectedZone === "feet" ? "all" : "feet")
              }
              className="cursor-pointer transition-all duration-300"
            >
              <path
                d="M72 283 L95 283 L96 308 C96 312 68 314 66 308 Z"
                fill={
                  selectedZone === "feet" || selectedZone === "all"
                    ? "#6E473B"
                    : "#DFD1C0"
                }
                fillOpacity={
                  selectedZone === "feet"
                    ? "0.92"
                    : selectedZone === "all"
                    ? "0.45"
                    : "0.5"
                }
                stroke="#6E473B"
                strokeWidth={selectedZone === "feet" ? "2.5" : "1.2"}
              />
              <path
                d="M105 283 L128 283 L134 308 C132 314 104 312 104 308 Z"
                fill={
                  selectedZone === "feet" || selectedZone === "all"
                    ? "#6E473B"
                    : "#DFD1C0"
                }
                fillOpacity={
                  selectedZone === "feet"
                    ? "0.92"
                    : selectedZone === "all"
                    ? "0.45"
                    : "0.5"
                }
                stroke="#6E473B"
                strokeWidth={selectedZone === "feet" ? "2.5" : "1.2"}
              />
            </g>
          </svg>

          <div className="w-full text-center text-xs text-[#6E5D53] bg-[#F2EAE0]/80 py-1.5 px-3 rounded-full border border-[#E2D5C4]">
            Tap any body zone to isolate pieces
          </div>
        </div>

        {/* Right: Zone Buttons & Description */}
        <div className="flex-1 space-y-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#E2D5C4] text-xs font-medium text-[#B85D3B]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Shop By Body Anatomy</span>
            </div>
            <h3 className="font-editorial text-3xl md:text-4xl text-[#231B18] font-medium">
              Every Inch Considered —{" "}
              <span className="italic text-[#B85D3B]">
                {activeMeta.label}
              </span>
            </h3>
            <p className="text-[#6E5D53] text-sm md:text-base max-w-2xl leading-relaxed">
              {activeMeta.description}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {BODY_ZONES.map((zone) => {
              const isSelected = selectedZone === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => onSelectZone(zone.id)}
                  className={`text-left p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#231B18] text-[#FAF6F0] border-[#231B18] shadow-md"
                      : "bg-[#FAF6F0] text-[#231B18] border-[#E2D5C4] hover:border-[#B85D3B]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <span
                      className={`text-[11px] uppercase tracking-wider font-semibold ${
                        isSelected ? "text-[#C87D55]" : "text-[#6E5D53]"
                      }`}
                    >
                      {zone.anatomicalPart.split(" ")[0]}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        isSelected
                          ? "bg-[#B85D3B] text-white"
                          : "bg-[#F2EAE0] text-[#6E5D53]"
                      }`}
                    >
                      {zoneCounts[zone.id] ?? 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{zone.label}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-[#C87D55] shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
