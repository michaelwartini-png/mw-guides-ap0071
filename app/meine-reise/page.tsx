import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";
import { MeineReiseDashboard } from "@/components/meine-reise/MeineReiseDashboard";
import { meineReiseDashboard } from "@/content/meineReise";

export const metadata: Metadata = {
  title: "Meine Reise",
  description: "Dein persönlicher Reiseassistent für Vorbereitung und Durchführung.",
};

/** AP-MR001 — Meine Reise V1. Premium trip dashboard, no login or checkout. */
export default function MeineReisePage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[var(--mwg-paper)]">
        <MeineReiseDashboard dashboard={meineReiseDashboard} />
      </main>
      <Footer />
    </>
  );
}
