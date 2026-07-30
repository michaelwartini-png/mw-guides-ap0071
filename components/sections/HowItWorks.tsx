import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import viewPhoto from "@/public/images/sections/how-it-works-view.jpg";

/**
 * "Move like a local" — flowing editorial prose instead of icon-circle
 * steps, per the brief's request to avoid "enge Kartenlayouts" and
 * functional-feeling UI chrome.
 *
 * AP-002.1: added the real "Blick aus der Schwebebahn" photo as a modest
 * supporting image (this source photo is comparatively low-resolution, so
 * it's kept at editorial "field note" size rather than blown up full-bleed).
 *
 * AP-008.1: heading changed from "Reisen wie ein Einheimischer." — that
 * exact phrase is also pillar 03 in WhyMWGuides further up the page, so a
 * visitor scrolling past both saw the identical sentence twice as a
 * headline. This section keeps its body copy and photo unchanged; only
 * the heading now names what's actually different about it — the felt
 * experience of a ride in progress, not the differentiator itself.
 */
export function HowItWorks() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-28 lg:px-10 lg:py-40">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-7">
          <span className="mwg-eyebrow text-[var(--mwg-accent)]">Unterwegs</span>
          <h2 className="mwg-display-xl mt-5 max-w-[16ch]">
            So fühlt sich eine Fahrt an.
          </h2>
        </Reveal>
        <Reveal delayMs={120} className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <div className="relative aspect-[4/3] w-full max-w-[320px] overflow-hidden rounded-sm">
            <Image
              src={viewPhoto}
              alt=""
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
          <p className="mt-6 text-[17px] leading-[1.7] text-[var(--mwg-ink-70)]">
            Öffentlicher Nahverkehr statt Touristenbus. Schwebebahn.
            Straßenbahn. Fähre. Kopfhörer rein, App starten — und die Stadt
            zieht vorbei, während GPS jede Station automatisch erkennt.
          </p>
          <p className="mt-6 font-mono text-[13px] tracking-[0.02em] text-[var(--mwg-ink-45)]">
            Tour wählen. Kopfhörer rein. Losgehen.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
