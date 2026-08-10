import { Accessibility, Calendar, Clock, Euro, MapPin, Route } from "lucide-react";

export function PracticalIcon({ label }: { label: string }) {
  const normalized = label.toLowerCase();
  const className = "shrink-0 text-accent";
  const size = 20;
  const stroke = 1.5;

  if (normalized.includes("fahrplan") || normalized.includes("öffnung") || normalized.includes("betrieb")) {
    return <Clock size={size} className={className} strokeWidth={stroke} />;
  }
  if (normalized.includes("preis")) {
    return <Euro size={size} className={className} strokeWidth={stroke} />;
  }
  if (normalized.includes("barrierefrei")) {
    return <Accessibility size={size} className={className} strokeWidth={stroke} />;
  }
  if (normalized.includes("anreise") || normalized.includes("standort")) {
    return <MapPin size={size} className={className} strokeWidth={stroke} />;
  }
  if (normalized.includes("dauer")) {
    return <Calendar size={size} className={className} strokeWidth={stroke} />;
  }
  return <Route size={size} className={className} strokeWidth={stroke} />;
}
