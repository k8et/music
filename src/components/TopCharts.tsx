import React from 'react';

const TopCharts = () => {
    const tracks: any = []
    return (
        <div className='flex-col w-5/12'>
            <div className='flex justify-between w-full p-4'>
                <h1>Top Charts</h1>
                <button>See more</button>
            </div>
            <div>
                {tracks.map((item: any,index: any)=>(
                    <div key={index}>
                        <span></span>
                        <img src="" alt="s"/>
                        <div>
                            <h1>{item.title}</h1>
                            <p></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopCharts;