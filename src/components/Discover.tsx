import React, {useState} from 'react';
import {genres} from '../utils/mock';
import styled from 'styled-components';
import {useGetSongsByGenreQuery} from '../store/actions/trackActions';
import Player from './AudioPlayer';

interface DiscoverProps {
    tracks: Array<{
        url: string;
        images: {
            coverarthq: string;
        };
        title: string;
        subtitle: string;
        key: string;
    }>;
    setCurrentTrackIndex: (index: number) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    genre: string;
    setGenre: (genre: string) => void;
}

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

const Discover: React.FC<DiscoverProps> = ({
                                               tracks,
                                               setCurrentTrackIndex,
                                               setIsPlaying,
                                               genre,
                                               setGenre,
                                           }) => {

    const playTrack = (trackUrl: string) => {
        const trackIndex = tracks.findIndex((track) => track.key === trackUrl);
        console.log(trackUrl)
        setCurrentTrackIndex(trackIndex);
        setIsPlaying(true);
    };
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
                    {tracks.map((track) => (
                        <div className="p-4 bg-lightGray3 shadow-lg rounded-lg w-56" key={track.key}
                             onClick={() => playTrack(track.key)}>
                            <img
                                src={track.images.coverarthq}
                                alt={`${track.title} Cover`}
                                className="w-full h-42 object-cover rounded-md"
                            />
                            <div className="flex-col flex">
                                <p className="tx-600 font-semibold">
                                    {track.title.charAt(0).toUpperCase() + track.title.slice(1)}
                                </p>
                                <p className="text-1xl">{track.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollableContainer>
        </div>
    );
};

export default Discover;
