import { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { useNavigate } from "react-router-dom";
import japanGeo from "../data/japan-prefectures-lite.json";

const chubuUrl = "https://phjuan0408-code.github.io/my-nagoya-trip/";

const regions = [
  {
    id: "shikoku",
    title: "四國",
    href: "/shikoku",
    color: "#cf6f58",
    prefectures: ["香川県", "徳島県", "愛媛県", "高知県"],
    coordinates: [133.52, 33.73],
  },
  {
    id: "chubu",
    title: "名古屋與日本中部",
    href: chubuUrl,
    external: true,
    color: "#5f8fb8",
    prefectures: ["愛知県", "岐阜県", "長野県", "富山県"],
    coordinates: [137.35, 35.65],
  },
];

export default function JapanTripMap() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const regionByPrefecture = useMemo(() => {
    const map = new Map();
    regions.forEach((region) => {
      region.prefectures.forEach((prefecture) => map.set(prefecture, region));
    });
    return map;
  }, []);

  function openRegion(region) {
    if (!region) return;
    if (region.external) {
      window.location.href = region.href;
      return;
    }
    navigate(region.href);
  }

  return (
    <div className="relative mx-auto w-full max-w-6xl overflow-hidden px-2 pb-12 md:px-4">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1800, center: [137.4, 37.1] }}
        width={980}
        height={680}
        className="h-auto w-full"
      >
        <Geographies geography={japanGeo}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = geo.properties.name;
              const region = regionByPrefecture.get(name);
              const isActive = Boolean(region);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHovered(region?.title || name)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => openRegion(region)}
                  style={{
                    default: {
                      fill: region?.color || "#ded8cf",
                      stroke: "#fff8f0",
                      strokeWidth: 0.55,
                      outline: "none",
                      opacity: isActive ? 1 : 0.68,
                    },
                    hover: {
                      fill: isActive ? "#dfb65e" : "#d8d2c8",
                      stroke: "#fff8f0",
                      strokeWidth: 0.75,
                      outline: "none",
                      cursor: isActive ? "pointer" : "default",
                      opacity: 1,
                    },
                    pressed: {
                      fill: isActive ? "#b45f4d" : "#d8d2c8",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>

        {regions.map((region) => (
          <Marker key={region.id} coordinates={region.coordinates}>
            <g
              role="button"
              tabIndex={0}
              className="cursor-pointer"
              onClick={() => openRegion(region)}
            >
              <text
                y={region.id === "shikoku" ? 18 : 10}
                textAnchor="middle"
                className="select-none font-serif text-[17px] font-bold md:text-[19px]"
                fill="#2f2722"
                paintOrder="stroke"
                stroke="#fff8f0"
                strokeWidth={3}
              >
                {region.title}
              </text>
            </g>
          </Marker>
        ))}
      </ComposableMap>

      {hovered && (
        <div className="pointer-events-none absolute bottom-6 left-6 rounded-md bg-white/90 px-3 py-2 text-sm font-semibold text-[#504339] shadow">
          {hovered}
        </div>
      )}
    </div>
  );
}
