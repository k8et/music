import React from "react";
import { ScrollableContainer } from "../components/ScrollableContainer";

const Charts = () => {
  // const { activeSong, isPlaying } = useSelector((state: any) => state.player);
  // // if (isFetching) {
  // //   return <Loader />;
  // // }
  return (
    <div className="flex flex-col  w-full">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10 w-full justify-center flex xl:justify-start">
        Discover Top Charts
      </h2>

      <ScrollableContainer height={70}>
        {/*<div className="flex flex-wrap xl:justify-start justify-center gap-8">*/}
        {/*  {chartData.tracks.map((track: any, index: any) => (*/}
        {/*    <div*/}
        {/*      className={*/}
        {/*        "p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer shadow-lg rounded-lg w-[250px] track-card"*/}
        {/*      }*/}
        {/*      key={track.key}*/}
        {/*    >*/}
        {/*      <div className="w-full h-42 object-cover rounded-md relative">*/}
        {/*        <div*/}
        {/*          onClick={() => {*/}
        {/*            dispatch(*/}
        {/*              setActiveSong({ song: track, data: chartData, i: index }),*/}
        {/*            );*/}
        {/*          }}*/}
        {/*          className="absolute inset-0 flex items-center justify-center text-white"*/}
        {/*        >*/}
        {/*          <PlayPause*/}
        {/*            activeSong={activeSong}*/}
        {/*            data={track.title}*/}
        {/*            isPlaying={isPlaying}*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*        <img*/}
        {/*          src={track.images.coverarthq}*/}
        {/*          alt={`${track.title} Cover`}*/}
        {/*          className={`w-full h-full object-cover rounded-md ${*/}
        {/*            activeSong?.title === track.title && "opacity-30"*/}
        {/*          }`}*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*      <div className="flex-col flex">*/}
        {/*        <Link*/}
        {/*          to={`/songs/${track?.key}/${encodeURIComponent(*/}
        {/*            track.images.coverarthq,*/}
        {/*          )}/${*/}
        {/*            track.title.charAt(0).toUpperCase() + track.title.slice(1)*/}
        {/*          }`}*/}
        {/*          className="mt-4 font-semibold text-lg text-white truncate"*/}
        {/*        >*/}
        {/*          {track.title.charAt(0).toUpperCase() + track.title.slice(1)}*/}
        {/*        </Link>*/}
        {/*        <Link*/}
        {/*          to={*/}
        {/*            track.artists*/}
        {/*              ? `/artist/${track?.artists[0]*/}
        {/*                  ?.adamid}/${encodeURIComponent(*/}
        {/*                  track?.images?.background,*/}
        {/*                )}/${track?.subtitle}`*/}
        {/*              : "/top-artists"*/}
        {/*          }*/}
        {/*        >*/}
        {/*          <p className="text-14 text-white">{track.subtitle}</p>*/}
        {/*        </Link>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*</div>*/}
      </ScrollableContainer>
    </div>
  );
};

export default Charts;
