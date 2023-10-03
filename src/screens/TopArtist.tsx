import React from "react";
import { useGetTopChartsQuery } from "../store/actions/trackActions";
import { useNavigate } from "react-router";
import { ScrollableContainer } from "../components/ScrollableContainer";
import Loader from "../components/Loader";

const TopArtists = () => {
  const navigate = useNavigate();
  const { data, isFetching } = useGetTopChartsQuery("293401556");
  if (isFetching) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col w-full ">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10 justify-center flex xl:justify-start ">
        Top artists
      </h2>
      <ScrollableContainer height={70}>
        <div className="flex flex-wrap h-full xl:justify-start justify-center gap-6">
          {data.tracks?.map((track: any) => (
            <div
              className="p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer shadow-lg rounded-lg w-[250px] track-card"
              onClick={() =>
                navigate(`/artist/${track?.artists[0].adamid}/' '/' '`)
              }
            >
              <img
                alt="song_img"
                src={track?.images?.coverart}
                className="w-full h-56 rounded-lg"
              />
              <p className="mt-4 font-semibold text-lg text-white truncate">
                {track?.subtitle}
              </p>
            </div>
          ))}
        </div>
      </ScrollableContainer>
    </div>
  );
};

export default TopArtists;
