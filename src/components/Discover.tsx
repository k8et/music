import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { getSongsByGenre } from '../store/actions/trackActions';
import axios from 'axios';

const genres = [
    'POP',
    'HIP_HOP_RAP',
    'DANCE',
    'ELECTRONIC',
    'SOUL_RNB',
    'ALTERNATIVE',
    'ROCK',
    'LATIN',
    'FILM_TV',
    'COUNTRY',
    'AFRO_BEATS',
    'WORLDWIDE',
    'REGGAE_DANCE_HALL',
    'HOUSE',
    'K_POP',
    'FRENCH_POP',
    'SINGER_SONGWRITER',
    'REG_MEXICO',
];

const TrackList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const tracks = useSelector((state: any) => state.tracks);
    const [genre, setGenre] = useState<string>('POP');

    useEffect(() => {
        dispatch(getSongsByGenre(genre));
    }, [dispatch, genre]);

    console.log(tracks);

    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGenre(e.target.value);
    };

    return (
        <div className="flex items-center h-screen">
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
                    {genres.map((genreOption) => (
                        <option key={genreOption} value={genreOption}>
                            {genreOption}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-3 bg-blue-400 gap-4">
                {tracks.map((track: any) => (
                    <div className="p-4 bg-lightGray3 shadow-lg rounded-lg w-56" key={track.key}>
                        <img
                            src={track.images.coverarthq}
                            alt={`${track.title} Cover`}
                            className="w-full h-42 object-cover rounded-md"
                        />

                        {/* Track details */}
                        <div className="">
                            <p className="text-xl font-semibold">{track.title}</p>
                            <p className="text-gray-500">{track.artist}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrackList;
