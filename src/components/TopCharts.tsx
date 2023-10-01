import React, { FC } from "react";
import { useGetTopChartsQuery } from "../store/actions/trackActions";
import { setActiveSong } from "../store/slice/player";
import { useDispatch, useSelector } from "react-redux";
import ArtistSlider from "./ArtistSlider";
import PlayPause from "./PlayPause";
import { Link } from "react-router-dom";

const TopCharts: FC = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state: any) => state.player);
  const { data: chartData } = useGetTopChartsQuery("293401556");
  const tracksChart = chartData ? Object.values(chartData.tracks) : [];
  return (
    <div className="flex-col w-full">
      <div className="flex justify-between w-full p-4">
        <h1 className="text-gray-700 font-bold">Top Charts</h1>
        <button className="text-gray-300 text-base cursor-pointer">
          See more
        </button>
      </div>
      <div>
        {tracksChart.slice(0, 5).map((item: any, i) => (
          <div
            key={item.key}
            className="flex items-center  p-4  justify-between "
            onClick={() => {
              dispatch(setActiveSong({ song: item, data: chartData, i: i }));
            }}
          >
            <div className="flex ml-4 gap-8">
              <img
                src={item.images.coverart}
                alt={item.title}
                className="w-20 object-cover rounded-lg"
              />
              <div className="flex justify-center flex-col">
                <p className="tx-600 font-semibold text-white text-1xl">
                  {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                </p>
                <Link
                  to={`/artist/${item?.artists[0].adamid}/' '/' '`}
                  className="text-14 text-white"
                >
                  {item.subtitle}
                </Link>
              </div>
            </div>
            <PlayPause
              activeSong={activeSong}
              data={item.title}
              isPlaying={isPlaying}
            />
          </div>
        ))}
      </div>
      <ArtistSlider tracksChart={tracksChart} />
    </div>
  );
};

export default TopCharts;
