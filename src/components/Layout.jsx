import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // 如果你有通用導覽列
import SiteFooter from "./SiteFooter";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fdf6ef]">
      {/* 導覽列 */}
      <Navbar />

      {/* 主內容區 */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* 通用作者頁尾 */}
      <SiteFooter
        authorImage="./images/me-on-train.webp"
        bannerImage="./images/olive-island-sunset.webp"
        bannerAlt="View of Shodoshima"
        authorDescription={`四國八天七夜紀錄：\n一個沒開車、拍照不太會，但玩得很開心的大學生。`}
      />
    </div>
  );
}