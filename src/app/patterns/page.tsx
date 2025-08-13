"use client";

import { useState } from "react";
import { patterns } from "../../data/patterns";
import PatternCard from "../../components/ui/pattern-card";

export default function PatternHubPage() {
  const [expandedPattern, setExpandedPattern] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Dynamically calculate category counts from patterns array
  const categories = [
    { id: "all", name: "All Patterns", count: patterns.length },
    ...Array.from(
      new Set(patterns.flatMap((pattern) => pattern.tags.map((tag) => tag.toLowerCase())))
    ).map((cat) => ({
      id: cat,
      name: cat.charAt(0).toUpperCase() + cat.slice(1),
      count: patterns.filter((p) =>
        p.tags.some((tag) => tag.toLowerCase() === cat)
      ).length,
    })),
  ];

  const filteredPatterns = patterns.filter((pattern) => {
    const matchesSearch =
      pattern.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      pattern.tags.some((tag) =>
        tag.toLowerCase().includes(selectedCategory)
      );
    return matchesSearch && matchesCategory;
  });

  const handlePatternToggle = (index) => {
    if (expandedPattern === index) {
      setExpandedPattern(null);
      document.body.style.overflow = "auto";
    } else {
      setExpandedPattern(index);
      document.body.style.overflow = "hidden";
    }
  };

  const handlePatternClose = () => {
    setExpandedPattern(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="p-6">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search patterns..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full rounded border px-3 py-2"
      />

      {/* Category Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`rounded px-4 py-2 text-sm ${
              selectedCategory === cat.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      {/* Pattern Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPatterns.map((pattern, index) => (
          <PatternCard
            key={pattern.id}
            icon={pattern.icon}
            title={pattern.title}
            description={pattern.description}
            tags={pattern.tags}
            thumbnailText={pattern.thumbnailText}
            isExpanded={expandedPattern === index}
            onToggle={() => handlePatternToggle(index)}
            onClose={handlePatternClose}
          />
        ))}
      </div>
    </div>
  );
}
