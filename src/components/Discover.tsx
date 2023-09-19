import React, {useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetSongsByGenreQuery } from '../store/actions/trackActions';
import { genres } from '../utils/mock';
import styled from 'styled-components';
import {nextSong, playPause, prevSong, setActiveSong} from "../store/slice/player";
import AudioPlayer from "./AudioPlayer";

const ScrollableContainer = styled.div`
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;



    const Discover: React.FC = () => {
    const [genre, setGenre] = useState<string>('POP');
    const { data: genreData } = useGetSongsByGenreQuery(genre);
    const tracks = genreData ? Object.values(genreData.tracks) : [];
    const dispatch = useDispatch();
        if (!genreData){
            return <div>load</div>
        }
    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGenre(e.target.value);
    };

    return (
        <div className="flex flex-col items-start h-screen w-7/12 bg-amber-50">
            <div className="flex w-full mb-4 justify-between pl-4">
                <label htmlFor="genreSelect" className="block text-gray-700 font-bold mb-2">
                    Select Genre:
                </label>
                <select
                    id="genreSelect"
                    className="bg-white border border-gray-300 rounded-md py-2 px-4"
                    onChange={handleGenreChange}
                    value={genre}
                >
                    {genres.map((item) => (
                        <option key={item} value={item}>
                            {item.replace(/_/g, ' ')}
                        </option>
                    ))}
                </select>
            </div>
            <ScrollableContainer>
                <div
                    className="flex flex-wrap gap-8 w-full p-4 bg-fuchsia-300 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
                >
                    {tracks.map((track: any, index) => (
                        <div
                            className="p-4 bg-lightGray3 shadow-lg rounded-lg w-56 track-card"
                            key={track.key}
                            onClick={() => {
                                dispatch(setActiveSong({ song: track, data: genreData, i: index }));
                            }}
                        >
                            <div className="w-full h-42 object-cover rounded-md relative">
                                <div className="absolute inset-0 flex items-center justify-center text-white">
                                    {/* Content inside the absolute div */}
                                </div>
                                <img
                                    src={track.images.coverarthq}
                                    alt={`${track.title} Cover`}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>
                            <div className="flex-col flex">
                                <p className="tx-600 font-semibold text-white text-1xl">
                                    {track.title.charAt(0).toUpperCase() + track.title.slice(1)}
                                </p>
                                <p className="text-14 text-white">{track.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollableContainer>
        </div>
    );
};

export default Discover;
