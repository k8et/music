import React, { FC } from "react";
import { ScrollableContainer } from "../components/ScrollableContainer";
import { useGetTracksQuery} from "../store/actions/trackActions";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setActiveSong} from "../store/slice/player";
const Main: FC = () => {
    const dispatch = useDispatch()
    const { data: tracks } = useGetTracksQuery(20);
    console.log(tracks,"tracks")
    if (!tracks) {
        return <div>Loading...</div>;
    }

  return (
    <div className="flex flex-col w-full ">
      <div className="w-full flex justify-between items-center xl:flex-row flex-col mt-4 mb-10">
        <label
          htmlFor="genreSelect"
          className="block text-gray-700 font-bold mb-2"
        >
          Select Genre:
        </label>
        {/*<select*/}
        {/*  id="genreSelect"*/}
        {/*  className="bg-lightGray2 text-white rounded-md py-2 px-4"*/}
        {/*  onChange={handleGenreChange}*/}
        {/*  value={genre}*/}
        {/*>*/}
        {/*  {genres.map((item) => (*/}
        {/*    <option key={item} value={item}>*/}
        {/*      {item.replace(/_/g, " ")}*/}
        {/*    </option>*/}
        {/*  ))}*/}
        {/*</select>*/}
      </div>
      <ScrollableContainer height={70}>
        <div className="flex flex-wrap xl:justify-start justify-center gap-8">
          {tracks.tracks.map((track: any, index: any ) => (
            <div
              className={
                "p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup cursor-pointer shadow-lg rounded-lg w-[250px] track-card"
              }
              key={track.id}
            >
              <div className="w-full h-42 object-cover rounded-md relative">
                <div
                  onClick={() => {
                    dispatch(
                      setActiveSong({ song: track, data: tracks, i: index }),
                    );
                  }}
                  className="absolute inset-0 flex items-center justify-center text-white"
                >
                  {/*<PlayPause*/}
                  {/*  activeSong={activeSong}*/}
                  {/*  data={track.title}*/}
                  {/*  isPlaying={isPlaying}*/}
                  {/*/>*/}
                </div>
                <img
                  src={track.image_url}
                  // alt={`${track.title} Cover`}
                  // className={`w-full h-full object-cover rounded-md ${
                  //   activeSong?.title === track.title && "opacity-30"
                  // }`}
                 alt={"s"}/>
              </div>
              <div className="flex-col flex">
                {/*<Link*/}
                {/*  to={`/songs/${track?.key}/${encodeURIComponent(*/}
                {/*    track.images.coverarthq,*/}
                {/*  )}/${*/}
                {/*    track.title.charAt(0).toUpperCase() + track.title.slice(1)*/}
                {/*  }`}*/}
                {/*  className="mt-4 font-semibold text-lg text-white truncate"*/}
                {/*>*/}
                {/*  {track.title.charAt(0).toUpperCase() + track.title.slice(1)}*/}
                {/*</Link>*/}
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
                  <p className="text-14 text-white">{track.name}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </ScrollableContainer>
    </div>
  );
};

export default Main;
