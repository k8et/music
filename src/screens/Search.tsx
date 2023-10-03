import React from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useGetSongsBySearchQuery } from "../store/actions/trackActions";
import { ScrollableContainer } from "../components/ScrollableContainer";
import { setActiveSong } from "../store/slice/player";
import PlayPause from "../components/PlayPause";
import { Link } from "react-router-dom";

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state: any) => state.player);
  const { data, isFetching } = useGetSongsBySearchQuery(searchTerm);
  const dispatch = useDispatch();
  if (isFetching) {
    return <div>Load</div>;
  }
  return (
    <div className="flex flex-col w-full">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>

      <ScrollableContainer height={70}>
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {data.tracks.hits.map((track: any, index: any) => (
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
                      setActiveSong({ song: track, data: data, i: index }),
                    );
                    console.log(activeSong, "activeSong");
                  }}
                  className="absolute inset-0 flex items-center justify-center text-white"
                >
                  <PlayPause
                    activeSong={activeSong}
                    data={track.heading.title}
                    isPlaying={isPlaying}
                  />
                </div>
                <img
                  src={track.images.default}
                  alt={`${track.heading.title} Cover`}
                  className={`w-full h-full object-cover rounded-md ${
                    activeSong?.title === track.heading.title && "opacity-30"
                  }`}
                />
              </div>
              <div className="flex-col flex">
                <Link
                  to={`/songs/${track?.key}/${encodeURIComponent(
                    track.images.default,
                  )}/${track.heading.title}`}
                  className="mt-4 font-semibold text-lg text-white truncate"
                >
                  {track.heading.title}
                </Link>
                <Link
                  to={
                    track.artists
                      ? `/artist/${track?.artists[0]
                          ?.adamid}/${encodeURIComponent(track.share.avatar)}/${
                          track.heading.subtitle
                        }`
                      : "/top-artists"
                  }
                >
                  <p className="text-14 text-white">{track.heading.subtitle}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </ScrollableContainer>
    </div>
  );
};

export default Search;
