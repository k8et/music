import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import {getSongsByGenre} from '../store/actions/trackActions';
import {genres} from "../utils/mock";
import styled from "styled-components";
import AudioPlayer from "./AudioPlayer";
import {fetchTrackDetails} from "../store/actions/trackLinkActions";
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
const TrackList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const tracks = useSelector((state: any) => state.tracks);
    const [genre, setGenre] = useState<string>('POP');
    const [selectedTrackUri, setSelectedTrackUri] = useState<string | null>(null);
    console.log(selectedTrackUri)
    useEffect(() => {
        dispatch(getSongsByGenre(genre));
    }, [dispatch, genre]);
    const handleTrackClick = async (trackKey: any) => {
        try {
            const trackDetails = await dispatch(fetchTrackDetails(trackKey));
            setSelectedTrackUri(trackDetails.payload);
        } catch (error) {
            console.error('Ошибка при получении трека:', error);
        }
    };
    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGenre(e.target.value);
    };
    return (
        <div className="flex flex-col items-start h-screen w-7/12 bg-amber-50">
            <div className="mb-4">
                <label htmlFor="genreSelect" className="block text-gray-700 font-bold mb-2">
                    Select Genre:
                </label>
                <select
                    id="genreSelect"
                    className="w-full bg-white border border-gray-300 rounded-md py-2 px-4"
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
            <div className="flex flex-wrap gap-8 w-full p-4 bg-fuchsia-300 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
                {tracks.map((track: any) => (
                    <div className="p-4 bg-lightGray3 shadow-lg rounded-lg w-56" key={track.key}
                         onClick={() => handleTrackClick(track.key)}>
                        <img
                            src={track.images.coverarthq}
                            alt={`${track.title} Cover`}
                            className="w-full h-42 object-cover rounded-md"
                        />
                        <div className="flex-col flex">
                            <p className="tx-600 font-semibold">
                                {track.title.charAt(0).toUpperCase() + track.title.slice(1)}
                            </p>
                            <p className="text-1xl">
                                {track.subtitle}
                            </p>
                        </div>
                        {selectedTrackUri && (
                            <AudioPlayer trackUrl={selectedTrackUri} />
                        )}
                    </div>

                ))}
            </div>
            </ScrollableContainer>
        </div>
    );
};

export default TrackList;
