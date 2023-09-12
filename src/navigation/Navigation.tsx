import React, {FC, useState} from 'react';
import {Route, Routes} from "react-router";
import LeftSide from "../components/LeftSide";
import Main from "../screens/Main";
import {fetchTrackDetails} from "../store/actions/trackLinkActions";
import AudioPlayer from "../components/AudioPlayer";
import {AppDispatch} from "../store/store";
import {useDispatch} from "react-redux";

const Navigation:FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [selectedTrackUri, setSelectedTrackUri] = useState<string | null>(null);
    const handleTrackClick = async (trackKey: any) => {
        try {
            const trackDetails = await dispatch(fetchTrackDetails(trackKey));
            setSelectedTrackUri(trackDetails.payload);
        } catch (error) {
            console.error('Ошибка при получении трека:', error);
        }
    };
    return (
        <div className='flex'>
            <LeftSide/>
            <Routes>
                <Route path='/' element={<Main handleTrackClick={handleTrackClick}/>}>

                </Route>
            </Routes>
            {selectedTrackUri && (
                <AudioPlayer trackUrl={selectedTrackUri} />
            )}
        </div>
    );
};

export default Navigation;
