import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSong } from "../store/slice/player";
import PlayPause from "../components/PlayPause";
import { Link } from "react-router-dom";
import { ScrollableContainer } from "../components/ScrollableContainer";
// @ts-ignore
import imgNotFound from "../assets/images.jpg";
import Loader from "../components/Loader";

const Around = () => {
    const dispatch = useDispatch();
    const [country, setCountry] = useState("");
    const [data, setData] = useState<any>(null);
    const { activeSong, isPlaying } = useSelector((state: any) => state.player);
    useEffect(() => {
        axios
            .get(
                `https://shazam-api6.p.rapidapi.com/shazam/top_tracks_city?country_code=RU`,
                {
                    headers: {
                        'X-RapidAPI-Key': '85a9970cb2msh8160968b53a049dp15a532jsnb7e972328843',
                        'X-RapidAPI-Host': 'shazam-api6.p.rapidapi.com'
                    }
                }
            )
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get(
                `https://geo.ipify.org/api/v2/country?apiKey=at_uviEeJMbnBB1ZwRL6eYFqtmNz4kSM`,
            )
            .then((res) => setCountry(res?.data?.location.country))
            .catch((err) => console.log(err));
    }, []);

    if (!data) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10 w-full justify-center flex xl:justify-start">
               <div> Around you <span className="font-black">{country}</span></div>
            </h2>
            <ScrollableContainer height={70}>
                <div className="flex flex-wrap xl:justify-start justify-center gap-8">
                    {data?.result?.tracks.map((track: any, index: any) => (
                        <div
                            className={
                                "p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup cursor-pointer shadow-lg rounded-lg w-[250px] h-[300px] track-card"
                            }
                            key={track.key}
                        >
                            <div className="w-full h-52 object-cover rounded-md relative">
                                <div
                                    onClick={() => {
                                        dispatch(
                                            setActiveSong({ song: track, data: data?.result?.tracks, i: index }),
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
                                    src={ track.images.coverart || imgNotFound}
                                    alt={`${track.title} Cover`}
                                    className={`w-full h-full object-cover rounded-md ${
                                        activeSong?.title === track.title && "opacity-30"
                                    }`}
                                />
                            </div>
                            <div className="flex-col flex">
                                <Link
                                    to={`/songs/${track?.key}/${encodeURIComponent(
                                        track.images.coverart || imgNotFound,
                                    )}/${
                                        track.title.charAt(0).toUpperCase() + track.title.slice(1)
                                    }`}
                                    className="mt-4 font-semibold text-lg text-white truncate"
                                >
                                    {track.title.charAt(0).toUpperCase() + track.title.slice(1)}
                                </Link>
                                <Link to={`/topArtist`}>
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
