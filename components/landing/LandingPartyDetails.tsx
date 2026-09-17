import { landingParty, type LandingLocale } from "@/content/landing";

const linkClass =
  "text-[var(--mwg-ink)] underline decoration-[var(--mwg-accent)] underline-offset-4 transition-opacity hover:opacity-70";

export function LandingPartyDetails({ locale }: { locale: LandingLocale }) {
  const country = locale === "de" ? landingParty.countryDe : landingParty.countryEn;
  const phoneLabel = locale === "de" ? "Telefon" : "Phone";
  const emailLabel = locale === "de" ? "E-Mail" : "Email";

  return (
    <div className="mt-8 text-[17px] leading-[1.75] text-[var(--mwg-ink-70)]">
      <p className="whitespace-pre-line">
        {`${landingParty.name}\n${landingParty.company}\n${landingParty.street}\n${landingParty.zipCity}\n${country}`}
      </p>
      <p className="mt-5">
        {phoneLabel}:{" "}
        <a href={landingParty.phoneHref} className={linkClass}>
          {landingParty.phone}
        </a>
      </p>
      <p className="mt-2">
        {emailLabel}:{" "}
        <a href={`mailto:${landingParty.email}`} className={linkClass}>
          {landingParty.email}
        </a>
      </p>
    </div>
  );
}
