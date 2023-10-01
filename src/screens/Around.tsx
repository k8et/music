import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetSongsByCountryQuery } from "../store/actions/trackActions";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSong } from "../store/slice/player";
import PlayPause from "../components/PlayPause";
import { Link } from "react-router-dom";
import { ScrollableContainer } from "../components/ScrollableContainer";
// @ts-ignore
import imgNotFound from "../assets/images.jpg";

const Around = () => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const { activeSong, isPlaying } = useSelector((state: any) => state.player);
  const { data } = useGetSongsByCountryQuery(country);
  useEffect(() => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=at_uviEeJMbnBB1ZwRL6eYFqtmNz4kSM`,
      )
      .then((res) => setCountry(res?.data?.location.country))
      .catch((err) => console.log(err));
  }, [country]);
  if (!data) {
    return <div>Load</div>;
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around you <span className="font-black">{country}</span>
      </h2>
      <ScrollableContainer height={80}>
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {data.map((track: any, index: any) => (
            <div
              className={
                "p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer shadow-lg rounded-lg w-[250px] h-[300px] track-card"
              }
              key={track.key}
            >
              <div className="w-full h-52 object-cover rounded-md relative">
                <div
                  onClick={() => {
                    dispatch(
                      setActiveSong({ song: track, data: data, i: index }),
                    );
                  }}
                  className="absolute inset-0 flex items-center justify-center text-white"
                >
                  <PlayPause
                    activeSong={activeSong}
                    data={track.title}
                    isPlaying={isPlaying}
                  />
                </div>
                <img
                  src={track.photo_url || imgNotFound}
                  alt={`${track.title} Cover`}
                  className={`w-full h-full object-cover rounded-md ${
                    activeSong?.title === track.title && "opacity-30"
                  }`}
                />
              </div>
              <div className="flex-col flex">
                <Link
                  to={`/songs/${track?.key}/${encodeURIComponent(
                    track.images?.coverarthq,
                  )}/${
                    track.title.charAt(0).toUpperCase() + track.title.slice(1)
                  }`}
                  className="mt-4 font-semibold text-lg text-white truncate"
                >
                  {track.title.charAt(0).toUpperCase() + track.title.slice(1)}
                </Link>
                <Link
                  to={
                    track.artists
                      ? `/artist/${track?.artists[0]
                          ?.adamid}/${encodeURIComponent(
                          track?.images?.background,
                        )}/${track?.subtitle}`
                      : "/top-artists"
                  }
                >
                  <p className="text-14 text-white">{track.subtitle}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </ScrollableContainer>
    </div>
  );
};

export default Around;
