import React, { FC } from 'react';
import SpotifyAuth from "../components/Discover";
interface MainProps{
    handleTrackClick: (trackKey: any) => Promise<void>;
}
const Main: FC<MainProps> = ({handleTrackClick}) => {
    return (
        <div className='w-screen h-screen bg-red-300'>
            <SpotifyAuth handleTrackClick={handleTrackClick}/>
        </div>
    );
};

export default Main;
