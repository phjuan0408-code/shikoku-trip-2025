import { ChevronDown } from "lucide-react";

export default function Banner({ title, subtitle, meta, imageUrl }) {
  const scrollToMap = () => {
    const mapSection = document.getElementById("shikoku-map");
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative w-full h-[500px] bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="text-center font-serif">
        <h1 className="text-5xl font-bold">{title}</h1>
        {meta && (
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/85 md:text-base">
            {meta}
          </p>
        )}
        <p className="text-lg mt-2">{subtitle}</p>
      </div>

      {/* ⬇️ Scroll to Map 按鈕 */}
      <button
        onClick={scrollToMap}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white opacity-70 hover:opacity-100 transition"
        aria-label="Scroll to map"
      >
        <ChevronDown size={32} className="animate-bounce" />
      </button>
    </div>
  );
}
