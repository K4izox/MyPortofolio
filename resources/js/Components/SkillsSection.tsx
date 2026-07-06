import React, { useState } from "react";
import { SKILLS_INVENTORY, Skill } from "../types";
import { Code, Sparkles, Terminal, ShieldAlert, Palette, Compass, Users, Database } from "lucide-react";
import TypewriterHeading from "./TypewriterHeading";

// Map string icon names to Lucide icon components
const iconMap: Record<string, React.ComponentType<any>> = {
  Code,
  Sparkles,
  Terminal,
  ShieldAlert,
  Palette,
  Compass,
  Users,
  Database,
};

export default function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState<Skill>(SKILLS_INVENTORY[0]);

  // Rarity color labels
  const getRarityBadgeStyle = (rarity: Skill["rarity"]) => {
    switch (rarity) {
      case "Legendary":
        return "bg-purple-600 text-white border-purple-900";
      case "Epic":
        return "bg-orange-500 text-white border-orange-800";
      case "Rare":
        return "bg-blue-600 text-white border-blue-900";
      default:
        return "bg-gray-500 text-white border-gray-800";
    }
  };

  // Google color theme borders
  const getSlotBorderColor = (color: Skill["googleColor"], isSelected: boolean) => {
    if (isSelected) {
      return "border-black bg-gray-100 ring-4 ring-black scale-105";
    }
    switch (color) {
      case "blue":
        return "hover:border-[#4285F4] hover:bg-blue-50/50 border-gray-400";
      case "red":
        return "hover:border-[#EA4335] hover:bg-red-50/50 border-gray-400";
      case "yellow":
        return "hover:border-[#FBBC05] hover:bg-yellow-50/50 border-gray-400";
      case "green":
        return "hover:border-[#34A853] hover:bg-green-50/50 border-gray-400";
      default:
        return "border-gray-400";
    }
  };

  const getItemColorHex = (color: Skill["googleColor"]) => {
    switch (color) {
      case "blue": return "#4285F4";
      case "red": return "#EA4335";
      case "yellow": return "#FBBC05";
      case "green": return "#34A853";
      default: return "#000000";
    }
  };

  return (
    <section id="skills" className="py-16 pixel-grid-bg bg-white border-b-4 border-black">
      <div className="max-w-5xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-block bg-white pixel-border px-6 py-2.5 mb-3 pixel-shadow-sm">
            <TypewriterHeading 
              text="🎒 INVENTORY SKILL & ABILITY" 
              className="font-pixel text-xs sm:text-sm text-black tracking-widest justify-center" 
              speed={40} 
            />
          </div>
          <p className="text-xs font-mono text-gray-500 max-w-lg mx-auto">
            Klik item slot di inventory untuk memeriksa detail stats, tingkat kelangkaan, dan deskripsi modul skill.
          </p>
        </div>

        {/* Inventory Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3x3 Minecraft Style Inventory Slots */}
          <div className="md:col-span-7 bg-gray-200 pixel-border p-6 pixel-shadow">
            {/* Inventory Title Header */}
            <div className="flex items-center justify-between border-b-4 border-black pb-3 mb-6">
              <span className="font-pixel text-[10px] text-gray-700">REZA'S EXP BACKPACK</span>
              <span className="font-mono text-xs font-bold bg-white px-2 py-0.5 border-2 border-black">
                SLOTS: {SKILLS_INVENTORY.length}/12
              </span>
            </div>

            {/* Grid of Slots */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {SKILLS_INVENTORY.map((skill, index) => {
                const IconComponent = iconMap[skill.icon] || Code;
                const isSelected = selectedSkill.name === skill.name;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedSkill(skill)}
                    className={`aspect-square bg-gray-100 border-4 border-dashed flex flex-col items-center justify-center p-2 cursor-pointer transition-all ${getSlotBorderColor(
                      skill.googleColor,
                      isSelected
                    )}`}
                  >
                    {/* Item Rarity Dot */}
                    <span
                      className="w-2.5 h-2.5 border border-black absolute top-1.5 right-1.5"
                      style={{
                        backgroundColor: getItemColorHex(skill.googleColor),
                      }}
                    ></span>

                    {/* Icon */}
                    <div
                      className={`p-2 border-2 border-transparent transition-transform duration-200 ${
                        isSelected ? "scale-110" : "group-hover:scale-105"
                      }`}
                      style={{ color: getItemColorHex(skill.googleColor) }}
                    >
                      <IconComponent size={24} className="stroke-[2.5]" />
                    </div>

                    {/* Compact Item Name */}
                    <span className="text-[7px] sm:text-[8px] font-pixel text-center text-gray-700 tracking-tighter mt-1 truncate w-full px-0.5">
                      {skill.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}

              {/* Placeholder Empty Slots to complete 3x4 inventory grid */}
              {Array.from({ length: 12 - SKILLS_INVENTORY.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="aspect-square bg-gray-100 border-4 border-dashed border-gray-300 opacity-40 flex items-center justify-center"
                >
                  <span className="text-[10px] font-pixel text-gray-400 select-none">?</span>
                </div>
              ))}
            </div>

            {/* Backpack Footer info */}
            <div className="mt-6 pt-3 border-t-2 border-gray-400 flex flex-wrap justify-between items-center text-[8px] font-pixel text-gray-600 gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-purple-600 inline-block border border-black"></span> Legendary
                <span className="w-2.5 h-2.5 bg-orange-500 inline-block border border-black"></span> Epic
                <span className="w-2.5 h-2.5 bg-blue-600 inline-block border border-black"></span> Rare
              </div>
              <span>LEVEL: 99</span>
            </div>
          </div>

          {/* Right Column: Game Style Item Info Panel */}
          <div className="md:col-span-5 bg-white pixel-border p-6 pixel-shadow-red relative">
            {/* Top Pixel Corners Decorative */}
            <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-black"></div>
            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-black"></div>
            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-black"></div>
            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-black"></div>

            <div className="text-center border-b-4 border-black pb-4 mb-4">
              <h3 className="font-pixel text-[11px] text-black tracking-wider mb-2">
                STATS & ITEM INFO
              </h3>
              <div className="inline-block px-3 py-1 text-[8px] font-pixel border-2 border-black bg-black text-white">
                EQUIPPED
              </div>
            </div>

            {/* Selected Skill Graphic */}
            <div className="flex flex-col items-center mb-4">
              <div
                className="w-16 h-16 bg-gray-50 pixel-border flex items-center justify-center mb-3 animate-coin"
                style={{ borderColor: getItemColorHex(selectedSkill.googleColor) }}
              >
                {React.createElement(iconMap[selectedSkill.icon] || Code, {
                  size: 32,
                  style: { color: getItemColorHex(selectedSkill.googleColor) },
                  className: "stroke-[2.5]",
                })}
              </div>

              <h4 className="font-pixel text-[10px] text-gray-900 text-center uppercase tracking-wider mb-1.5">
                {selectedSkill.name}
              </h4>

              <div
                className={`px-2.5 py-0.5 text-[8px] font-pixel pixel-border-sm uppercase ${getRarityBadgeStyle(
                  selectedSkill.rarity
                )}`}
              >
                {selectedSkill.rarity}
              </div>
            </div>

            {/* Stats Breakdown Grid */}
            <div className="space-y-2 font-mono text-[11px] bg-gray-50 border-2 border-black p-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">TYPE:</span>
                <span className="text-gray-900 font-bold uppercase">{selectedSkill.icon}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">POWER LVL:</span>
                <span className="text-[#34A853] font-bold">
                  {selectedSkill.rarity === "Legendary"
                    ? "★★★★★ 99"
                    : selectedSkill.rarity === "Epic"
                    ? "★★★★☆ 85"
                    : "★★★☆☆ 72"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">CRIT CHANCE:</span>
                <span className="text-[#EA4335] font-bold">
                  {selectedSkill.rarity === "Legendary" ? "92%" : "64%"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">COOLDOWN:</span>
                <span className="text-gray-900">0.0s</span>
              </div>
            </div>

            {/* Item description */}
            <div className="border-t-2 border-gray-300 pt-3">
              <span className="font-pixel text-[8px] text-gray-500 block mb-1">EFFECTS & MODIFIERS:</span>
              <p className="text-xs text-gray-700 leading-relaxed font-sans font-medium">
                {selectedSkill.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
