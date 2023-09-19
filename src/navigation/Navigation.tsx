import React, {useState} from 'react';
import {Route, Routes} from 'react-router';
import LeftSide from '../components/LeftSide';
import Main from '../screens/Main';
import {useSelector} from "react-redux";
import Player from "../components/AudioPlayer";


const Navigation = () => {
    const { activeSong } = useSelector((state: any) => state.player);
    return (
        <div className="flex">
            <LeftSide/>
            <Routes>
                <Route
                    path="/"
                    element={<Main/>}
                />
            </Routes>
            {activeSong?.title &&
                <Player/>
            }
        </div>
    );
};

export default Navigation;
