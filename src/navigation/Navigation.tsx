import React from 'react';
import {Route, Routes} from "react-router";
import LeftSide from "../components/LeftSide";
import Main from "../screens/Main";

const Navigation = () => {
    return (
        <div className='flex'>
            <LeftSide/>
            <Routes>
                <Route path='/' element={<Main/>}>

                </Route>
            </Routes>
        </div>
    );
};

export default Navigation;
