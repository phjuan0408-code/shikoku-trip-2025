import Banner from "../components/Banner";
import ShikokuMap from "../components/ShikokuMap";

export default function ShikokuHome() {
  return (
    <div>
      <Banner
        title="SHIKOKU"
        subtitle="沒有驚喜萬分，卻讓人難以忘懷。"
        imageUrl="./images/home-banner.webp"
      />

      <div className="mx-auto mt-6 max-w-5xl space-y-4 px-4 text-center font-serif text-gray-700">
        <p>本網站記錄了我們在日本四國地區旅行的體驗，包括高松、德島、愛媛等地的景點、美食與人文風景。</p>
        <p>請透過下方地圖探索各城市的故事，並感受我們在旅途中捕捉的瞬間。</p>
      </div>

      <div id="shikoku-map" className="mb-10">
        <ShikokuMap />
      </div>
    </div>
  );
}
