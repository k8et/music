import React, { FC } from 'react';
import Discover from '../components/Discover';
import TopCharts from '../components/TopCharts';


const Main: FC = () => {
    return (
        <div className='flex w-screen h-screen bg-red-300'>
            <Discover/>
            <TopCharts/>
        </div>
    );
};

export default Main;
