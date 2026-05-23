import Banner from "../components/Banner";
import JapanTripMap from "../components/JapanTripMap";

export default function Home() {
  return (
    <div>
      <Banner
        title="JAPAN TRIPS"
        subtitle="從四國到名古屋，把每趟旅行都留在地圖上。"
        imageUrl="./images/home-banner.webp"
      />

      <div className="mx-auto mt-6 max-w-5xl px-4 text-center font-serif text-lg leading-relaxed text-[#504339]">
        <p>從瀨戶內海邊的四國，到北阿爾卑斯山腳下的名古屋與日本中部，每一段旅程都用地圖收起來。</p>
      </div>

      <div id="shikoku-map" className="mt-2">
        <JapanTripMap />
      </div>
    </div>
  );
}
