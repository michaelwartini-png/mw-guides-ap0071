import type { ProductDefinition } from "@/components/admin/products/productTypes";

export const PRODUCT_REGISTRY: ProductDefinition[] = [
  {
    id: "erlebnisprofil",
    label: "Erlebnisprofil",
    icon: "📋",
    availability: "available",
  },
  {
    id: "ride-guide",
    label: "Ride Guide",
    icon: "🎧",
    availability: "roadmap",
    roadmapNote: "AP-0021",
  },
  {
    id: "kostenloser-guide",
    label: "Kostenloser Guide",
    icon: "📖",
    availability: "roadmap",
    roadmapNote: "AP-0022",
  },
  {
    id: "premium-guide",
    label: "Premium Guide",
    icon: "⭐",
    availability: "roadmap",
    roadmapNote: "AP-0023",
  },
  {
    id: "explore-trip",
    label: "Explore Trip",
    icon: "🗺",
    availability: "roadmap",
    roadmapNote: "AP-0024",
  },
  {
    id: "social-media",
    label: "Social Media",
    icon: "📱",
    availability: "roadmap",
    roadmapNote: "AP-0025",
  },
];

export function getProductDefinition(id: string): ProductDefinition | undefined {
  return PRODUCT_REGISTRY.find((entry) => entry.id === id);
}
