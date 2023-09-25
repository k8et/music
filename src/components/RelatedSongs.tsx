import React, { FC } from "react";
import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";

interface RelatedSongs {
  data: any;
  artistId: any;
  activeSong: any;
  isPlaying: any;
}

const RelatedSongs: FC<RelatedSongs> = ({
  data,
  artistId,
  activeSong,
  isPlaying,
}) => {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related Songs:</h1>

      <div className="mt-6 w-full flex flex-col">
        {data[0].slice(0, 4).map((song: any, i: any) => (
          <div
            className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
              !activeSong?.title && !song?.title
                ? "bg-transparent"
                : activeSong?.title === song?.title
                ? "bg-[#4c426e]"
                : "bg-transparent"
            } py-2 p-4 rounded-lg cursor-pointer mb-2`}
          >
            <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
            <div className="flex-1 flex flex-row justify-between items-center">
              <img
                className="w-20 h-20 rounded-lg"
                src={
                  artistId
                    ? song.attributes?.artwork?.url
                        .replace("{w}", "125")
                        .replace("{h}", "125")
                    : song.images?.coverart
                }
                alt={song.title}
              />
              <div className="flex-1 flex flex-col justify-center mx-3">
                {!artistId ? (
                  <Link to={`/songs/${song.key}`}>
                    <p className="text-xl font-bold text-white">{song.title}</p>
                  </Link>
                ) : (
                  <p className="text-xl font-bold text-white">
                    {song.attributes?.name}
                  </p>
                )}
                <p className="text-base text-gray-300 mt-1">
                  {artistId ? song.attributes?.albumName : song.subtitle}
                </p>
              </div>
            </div>
            <PlayPause
              activeSong={activeSong}
              data={song.attributes.name}
              isPlaying={isPlaying}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;