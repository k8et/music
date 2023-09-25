import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ArtistCardProps {
  tracksChart: any;
}

const ArtistSlider: FC<ArtistCardProps> = ({ tracksChart }) => {
  return (
    <div className="w-full flex flex-col mt-8">
      <div className="flex flex-row justify-between items-center">
        <h2 className="block text-gray-700 font-bold mb-2 p-2">Top Artists</h2>
        <Link to="/artist">
          <p className="text-gray-300 text-base cursor-pointer p-2">See more</p>
        </Link>
      </div>
      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        centeredSlides
        centeredSlidesBounds
        modules={[FreeMode]}
        direction="horizontal"
        className="mt-4"
      >
        {tracksChart?.slice(0, 5).map((artist: any) => (
          <SwiperSlide
            key={artist?.key}
            style={{ width: "20%", height: "auto" }}
            className="shadow-lg rounded-full animate-slideright"
          >
            <Link to={`/artist/${artist?.artists[0].adamid}`}>
              <img
                src={artist?.images?.background}
                alt="Name"
                className="rounded-full w-full object-cover"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ArtistSlider;
