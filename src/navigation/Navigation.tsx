// Navigation.tsx
import React, { FC, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import LeftSide from '../components/LeftSide';
import Main from '../screens/Main';
import Player from '../components/AudioPlayer';
import { useGetSongsByGenreQuery } from '../store/actions/trackActions';

const Navigation: FC = () => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [genre, setGenre] = useState<string>('POP');
    const { data: genreData, error, isLoading } = useGetSongsByGenreQuery(genre);

    const tracks = genreData ? Object.values(genreData.tracks) : [];

    return (
        <div className="flex">
            <LeftSide />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Main
                            setCurrentTrackIndex={setCurrentTrackIndex}
                            setIsPlaying={setIsPlaying}
                            genre={genre}
                            setGenre={setGenre}
                            tracks={tracks}
                        />}
                />
            </Routes>
            {currentTrackIndex && (
                <Player
                    tracks={tracks}
                    currentTrackIndex={currentTrackIndex}
                    setCurrentTrackIndex={setCurrentTrackIndex}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                />
            )}
        </div>
    );
};

export default Navigation;
