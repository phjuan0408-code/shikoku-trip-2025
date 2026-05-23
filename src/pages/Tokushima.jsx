import CityIntro from "../components/CityIntro";
import DayCard from "../components/DayCard";
import ItinerarySection from "../components/ItinerarySection";
import FoodForDay from "../components/FoodForDay";
import HotelCard from "../components/HotelCard";

export default function Ehime() {
  const days = [
    { day: "Day3", image: "./images/day3-2-nav.webp", link: "/day3"  },
    { day: "Day4", image: "./images/day4-nav.webp", link: "/day4"  },
    { day: "Day5", image: "./images/day5-1-nav.webp", link: "/day5"  },
  ];

  return (
    <div className="bg-[#fdf6ef] py-12 px-4 font-serif">
      <CityIntro
        title="About Tokushima"
        subtitle="德島縣 徳島市"
        imageSrc="./images/tokushima/tokushima-bridge.webp"
        imageAlt="Naruto Bridge"
        paragraphs={[
          "德島，是一座站在漩渦入口的城市。面向鳴門海峽，靜靜守著瀨戶內海與太平洋的交界。潮流在此奔湧、旋轉、交織出時而澎湃、時而平靜的風景。壯觀的漩渦並非日日可見，卻也因這份不可預期，更添想像與期待。",
          "每年夏日，阿波舞便喚醒城市的心跳。鼓聲與步伐讓街道騷動，平時靜謐的德島，也有屬於自己的熱情與節奏。",
        ]}
      />
      
      <HotelCard
        name="德島克萊門特JR酒店"
        link="https://maps.app.goo.gl/XURLGF6kovLEU6N39"
      />

      <div
        id="day-cards" 
        className="max-w-5xl mx-auto pt-10 mt-12 px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 font-serif"
      >
        {days.map((item) => (
          <DayCard key={item.day} image={item.image} day={item.day} link={item.link} />
        ))}
      </div>

      <div className="mt-16">
        <ItinerarySection
          title="🏯 德島景點紀錄"
          dates={["2025-01-07-2", "2025-01-08", "2025-01-09-1"] }
        />
      </div>

      <div className="mt-16">
        <FoodForDay dates={["2025-01-07-2", "2025-01-08", "2025-01-09-1"]} title="🍴 德島美食紀錄"/>
      </div>
    </div>
  );
}