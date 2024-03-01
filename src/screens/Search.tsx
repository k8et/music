import React from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useGetSongsBySearchQuery} from "../store/actions/trackActions";
import {ScrollableContainer} from "../components/ScrollableContainer";
import {setActiveSong} from "../store/slice/player";
import PlayPause from "../components/PlayPause";
import {Link} from "react-router-dom";
import Loader from "../components/Loader";

const Search = () => {
    const {searchTerm} = useParams();
    const {activeSong, isPlaying} = useSelector((state: any) => state.player);
    const {data, isFetching} = useGetSongsBySearchQuery({
        term: searchTerm,
        locale: 'en-US',
        offset: '0',
        limit: '20'
    });
    const dispatch = useDispatch();
    if (isFetching) {
        return <Loader/>;
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
                                "p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup cursor-pointer shadow-lg rounded-lg w-[250px] track-card"
                            }
                            key={track.track.key}
                        >
                            <div className="w-full h-42 object-cover rounded-md relative">
                                <div
                                    onClick={() => {
                                        dispatch(
                                            setActiveSong({song: track.track, data: data, i: index}),
                                        );
                                        console.log(activeSong, "activeSong");
                                    }}
                                    className="absolute inset-0 flex items-center justify-center text-white"
                                >
                                    <PlayPause
                                        activeSong={activeSong}
                                        data={track.track.title}
                                        isPlaying={isPlaying}
                                    />
                                </div>
                                <img
                                    src={track.track.images.coverart}
                                    alt={`${track.track.title} Cover`}
                                    className={`w-full h-full object-cover rounded-md ${
                                        activeSong?.title === track.track.title && "opacity-30"
                                    }`}
                                />
                            </div>
                            <div className="flex-col flex">
                                <Link
                                    to={`/songs/${track.track?.key}/${encodeURIComponent(
                                        track.track.images.coverart,
                                    )}/${track.track.title}`}
                                    className="mt-4 font-semibold text-lg text-white truncate"
                                >
                                    {track.track.title}
                                </Link>
                                <Link
                                    to={
                                        track.track.artists
                                            ? `/artist/${track?.track?.artists[0]
                                                ?.adamid}/${encodeURIComponent(track.track.share.avatar)}/${
                                                track.track.subtitle
                                            }`
                                            : "/top-artists"
                                    }
                                >
                                    <p className="text-14 text-white">{track.track.subtitle}</p>
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
