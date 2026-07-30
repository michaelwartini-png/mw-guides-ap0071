import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutIntro } from "@/components/about/AboutIntro";
import { EditorialBlock } from "@/components/editorial/EditorialBlock";
import { AboutCta } from "@/components/about/AboutCta";
import postkartePhoto from "@/public/images/about/wie-alles-begann-postkarte.jpg";
import philosophiePhoto from "@/public/images/about/unsere-philosophie-blick.jpg";
import visionPhoto from "@/public/images/about/unsere-vision-mural.jpg";

export const metadata: Metadata = {
  title: "Über MW Guides",
  description:
    "Seit über 30 Jahren plane ich Reisen entlang der schönsten öffentlichen Verkehrswege der Welt — die Geschichte hinter MW Guides.",
};

/**
 * About page (AP-002.1). Built on the real original text provided by the
 * project lead — only lightly structured into paragraphs, not shortened
 * or rewritten promotionally, per the brief. Aufbau: Hero → Über MW
 * Guides → Wie alles begann → Unsere Philosophie → Unsere Vision → CTA.
 */
export default function UeberPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <AboutHero />

        <AboutIntro
          paragraphs={[
            "Die schönsten Stadtrundfahrten der Welt existieren oft längst. Sie kosten häufig nicht mehr als den Preis eines ganz normalen Tickets. Genau diese Idee steckt hinter MW Guides.",
            "Seit über 30 Jahren plane ich unsere Reisen komplett selbst. Für mich beginnt eine Reise nicht erst am Flughafen oder Bahnhof, sondern lange vorher – mit Landkarten, Fahrplänen und der Suche nach den spannendsten Geschichten eines Ortes.",
            "Dabei ist mir immer wieder etwas aufgefallen: Viele Städte besitzen längst ihre eigene perfekte Stadtrundfahrt. Nicht mit einem Reisebus, sondern mit öffentlichen Verkehrsmitteln. Straßenbahnen, Metros, Schwebebahnen, Fähren oder Züge verbinden oft die wichtigsten Sehenswürdigkeiten einer Stadt – und bieten dabei Ausblicke, die man zu Fuß oder im Auto niemals erleben würde.",
            "Ob die berühmte Tram 28 in Lissabon, die belgische Küstentram, die Schwebebahn in Wuppertal oder eine Metro in einer Weltmetropole – die Fahrt selbst ist häufig schon ein Erlebnis.",
            "Nur eines fehlte bisher.",
            "Jemand, der genau im richtigen Moment erzählt, was sich gerade links oder rechts des Fensters verbirgt.",
          ]}
        />

        <EditorialBlock
          eyebrow="Wie alles begann"
          heading="Eine Idee, die eher zufällig entstand."
          imagePosition="left"
          image={postkartePhoto}
          imageAlt="Historische Postkarte der Wuppertaler Schwebebahn, Vohwinkel–Elberfeld–Barmen"
          paragraphs={[
            "Die Idee zu MW Guides entstand eher zufällig.",
            "Zum 99. Geburtstag meiner Mutter wollte ich Freunden und Familie meine Heimatstadt Wuppertal zeigen. Da ich sie an diesem Tag nicht selbst begleiten konnte, entwickelte ich erstmals eine Audiotour für die Wuppertaler Schwebebahn.",
            "Nur wenige Tage später saß ich in der belgischen Küstentram. Während der Fahrt wurde mir plötzlich klar, dass dieses Konzept überall funktionieren könnte.",
            "Denn die Strecke war bereits da.",
            "Die Sehenswürdigkeiten ebenfalls.",
            "Es fehlte lediglich die passende Geschichte.",
            "So entstand die Idee zu MW Guides.",
          ]}
        />

        <EditorialBlock
          eyebrow="Unsere Philosophie"
          heading="Städte bewusster erlebbar machen."
          imagePosition="right"
          image={philosophiePhoto}
          imageAlt="Blick aus der Wuppertaler Schwebebahn auf die Gleisführung"
          paragraphs={[
            "Wir möchten Städte nicht schneller zeigen.",
            "Wir möchten sie bewusster erlebbar machen.",
            "Unsere Touren begleiten Sie genau dort, wo gerade etwas Besonderes zu sehen ist. Keine endlosen Jahreszahlen, keine trockenen Vorträge und keine starren Reisegruppen.",
            "Stattdessen erzählen wir spannende Geschichten, überraschende Hintergründe, interessante Anekdoten und zeigen Ihnen Orte, an denen viele Menschen sonst einfach vorbeifahren würden.",
            "Dabei entscheiden Sie selbst über Ihr Tempo.",
            "Sie können unterwegs jederzeit aussteigen, später wieder einsteigen und genau die Orte entdecken, die Sie besonders interessieren.",
          ]}
        />

        <EditorialBlock
          eyebrow="Unsere Vision"
          heading="Man muss sie nur neu erzählen."
          imagePosition="left"
          image={visionPhoto}
          imageAlt="Wandgemälde an der Wesendonkstraße in Wuppertal, im Hintergrund die Schwebebahn"
          paragraphs={[
            "Wir sind überzeugt, dass die schönsten Stadtrundfahrten der Welt längst existieren.",
            "Man muss sie nicht neu bauen.",
            "Man muss sie nur neu erzählen.",
            "Deshalb entwickelt MW Guides selbstgeführte Audiotouren für öffentliche Verkehrsmittel in aller Welt – von der Straßenbahn über die Schwebebahn bis hin zu Fähren, Metros und Panoramazügen.",
            "So wird aus einer ganz normalen Fahrt ein unvergessliches Reiseerlebnis.",
          ]}
        />

        <AboutCta
          paragraphs={[
            "Willkommen bei MW Guides.",
            "Steigen Sie ein. Lehnen Sie sich zurück. Und entdecken Sie die Welt – eine Fahrt nach der anderen.",
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
