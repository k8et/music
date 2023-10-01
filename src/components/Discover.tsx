import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetSongsByGenreQuery } from "../store/actions/trackActions";
import { genres } from "../utils/mock";
import { setActiveSong } from "../store/slice/player";
import PlayPause from "./PlayPause";
import { Link } from "react-router-dom";
import { ScrollableContainer } from "./ScrollableContainer";

const Discover: React.FC = () => {
  const [genre, setGenre] = useState<string>("POP");
  const { data: genreData } = useGetSongsByGenreQuery(genre);
  const tracks = genreData ? Object.values(genreData.tracks) : [];
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state: any) => state.player);
  if (!genreData) {
    return <div>load</div>;
  }
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  };
  console.log(tracks, "tracks");
  return (
    <div className="flex flex-col w-full ">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <label
          htmlFor="genreSelect"
          className="block text-gray-700 font-bold mb-2"
        >
          Select Genre:
        </label>
        <select
          id="genreSelect"
          className="bg-lightGray2 text-white rounded-md py-2 px-4"
          onChange={handleGenreChange}
          value={genre}
        >
          {genres.map((item) => (
            <option key={item} value={item}>
              {item.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>
      <ScrollableContainer height={80}>
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {tracks.map((track: any, index) => (
            <div
              className={
                "p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer shadow-lg rounded-lg w-[250px] track-card"
              }
              key={track.key}
            >
              <div className="w-full h-42 object-cover rounded-md relative">
                <div
                  onClick={() => {
                    dispatch(
                      setActiveSong({ song: track, data: genreData, i: index }),
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
                  src={track.images.coverarthq}
                  alt={`${track.title} Cover`}
                  className={`w-full h-full object-cover rounded-md ${
                    activeSong?.title === track.title && "opacity-30"
                  }`}
                />
              </div>
              <div className="flex-col flex">
                <Link
                  to={`/songs/${track?.key}/${encodeURIComponent(
                    track.images.coverarthq,
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

export default Discover;
