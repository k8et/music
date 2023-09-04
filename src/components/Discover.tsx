import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch} from "../store/store";
import {getSongsByGenre} from "../store/actions/trackActions";
import axios from "axios";
const TrackList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const tracks = useSelector((state: any) => state.tracks);
    const [genre, setGenre] = useState( 'POP')
   useEffect(() => {
        dispatch(getSongsByGenre());
    }, [dispatch]);

    console.log(tracks);

    return (
        <div>

        </div>
    );
};

export default TrackList;
