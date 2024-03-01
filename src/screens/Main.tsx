import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import {ScrollableContainer} from "../components/ScrollableContainer";
import {setActiveSong} from "../store/slice/player";
import PlayPause from "../components/PlayPause";
import {Link} from "react-router-dom";
import {useGetTopChartsQuery} from "../store/actions/trackActions";

const Main: FC = () => {
    const {data: chartData, isFetching} = useGetTopChartsQuery({pageSize: '20', locale: 'en-US', startFrom: "20"});
    const dispatch = useDispatch();
    const {activeSong, isPlaying} = useSelector((state: any) => state.player);
    if (isFetching) return <Loader/>;
    return (
        <div className="flex flex-col w-full ">
            <div className="w-full flex justify-between items-center xl:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10 w-full justify-center flex xl:justify-start">
                    Recommendation
                </h2>
            </div>
            <ScrollableContainer height={70}>
                <div className="flex flex-wrap xl:justify-start justify-center gap-8">
                    {chartData.tracks.map((track: any, index: any) => (
                        <div
                            className={
                                "p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup cursor-pointer shadow-lg rounded-lg w-[250px] track-card"
                            }
                            key={track.key}
                        >
                            <div className="w-full h-42 object-cover rounded-md relative">
                                <div
                                    onClick={() => {
                                        dispatch(
                                            setActiveSong({song: track, data: chartData, i: index}),
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

export default Main;
