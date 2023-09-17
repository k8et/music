// Main.tsx
import React, { FC } from 'react';
import Discover from '../components/Discover';
import TopCharts from '../components/TopCharts';

interface MainProps {
    tracks: any;
    setCurrentTrackIndex: (index: number) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    genre: string;
    setGenre: any
}

const Main: FC<MainProps> = ({
    tracks,
                                 setCurrentTrackIndex,
                                 setIsPlaying,
                                 genre,
    setGenre
                             }) => {
    return (
        <div className='flex w-screen h-screen bg-red-300'>
            <Discover
                tracks={tracks}
                setCurrentTrackIndex={setCurrentTrackIndex}
                setIsPlaying={setIsPlaying}
                genre={genre}
                setGenre={setGenre}
            />
            <TopCharts />
        </div>
    );
};

export default Main;
