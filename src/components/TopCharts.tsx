import React, {FC} from 'react';
import {useGetTopChartsQuery} from "../store/actions/trackActions";
import {setActiveSong} from "../store/slice/player";
import {useDispatch} from "react-redux";

const TopCharts: FC = () => {
    const dispatch = useDispatch();
    const { data: chartData } = useGetTopChartsQuery('293401556');
    const tracksChart = chartData? Object.values(chartData.tracks) : [];
    return (
        <div className="flex-col w-5/12">
            <div className="flex justify-between w-full p-4">
                <h1>Top Charts</h1>
                <button>See more</button>
            </div>
            <div>
                {tracksChart.map((item: any,index) => (
                    <div
                        key={item.key} className="flex items-center p-4 border-b justify-between "
                        onClick={() => {
                            dispatch(setActiveSong({ song: item, data: chartData, i: index }));
                        }}
                    >
                        <div className="flex ml-4 gap-8">
                            <img src={item.images.coverart} alt={item.title} className="w-20 object-cover rounded-full" />
                            <div className='flex justify-center flex-col'>
                                <p className="tx-600 font-semibold text-white text-1xl">
                                    {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                                </p>
                                <p className="text-14 text-white">{item.subtitle}</p>
                            </div>
                        </div>
                        <i className='bx bx-play text-3xl'></i>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopCharts;
