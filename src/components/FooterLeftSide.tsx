import React from 'react';

const FooterLeftSide = () => {
    return (
        <div className='flex flex-col w-full h-full bg-blackWhite rounded-lg p-6 gap-8'>
            <div className='flex items-center gap-4'>
                <i className='bx bx-planet text-white text-2xl'></i>
                <h3 className='tx-600 text-white'>Around You</h3>
            </div>
            <div className='flex items-center gap-4'>
                <i className='bx bxs-user-voice text-white text-2xl'></i>
                <h3 className='tx-600 text-white'>Top Artists</h3>
            </div>
            <div className='flex items-center gap-4'>
                <i className='bx bx-hash text-white text-2xl'></i>
                <h3 className='tx-600 text-white'>Top Charts</h3>
            </div>
        </div>
    );
};

export default FooterLeftSide;
