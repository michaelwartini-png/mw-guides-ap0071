export function PlatformLogo({ source }: { source: "google" | "tripadvisor" }) {
  if (source === "google") {
    return (
      <span className="inline-flex items-center gap-0.5 text-[13px] font-medium leading-none">
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#34A853]">l</span>
        <span className="text-[#EA4335]">e</span>
      </span>
    );
  }
  return <span className="text-[13px] font-semibold leading-none text-[#00AF87]">Tripadvisor</span>;
}
