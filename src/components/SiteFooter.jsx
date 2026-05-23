import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function SiteFooter({
  authorImage = "./images/me-on-train.webp",
  authorName = "About Here",
  authorQuote = "旅行不必總有驚喜，能記得，就是風景。",
  bannerImage = "./images/olive-island-sunset.webp",
  bannerAlt = "Seto Inland Sea",
}) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative bg-cover bg-center text-white font-serif mt-16"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      {/* 遮罩層 */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 作者介紹區塊 */}
      <div className="relative z-10 h-[200px] flex flex-col justify-center items-center text-center px-4">
        <img
          src={authorImage}
          alt={authorName}
          className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-white shadow-md"
        />
        <h3 className="text-base font-semibold">{authorName}</h3>
        <p className="text-xs mt-1 max-w-sm leading-normal opacity-90">
          {authorQuote}
        </p>
      </div>

      {/* © 標記（固定底部） */}
      <div className="relative z-10 text-center text-[11px] text-white/70 pb-3">
        © 2025 Cody Juan. All rights reserved.
      </div>

      {/* 滑動後顯示的回到最上按鈕 */}
      {showButton && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 bg-white text-[#00403C] rounded-full p-2 shadow-md hover:scale-110 transition-all z-50"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </footer>
  );
}
