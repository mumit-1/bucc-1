import React from 'react';
import { PropagateLoader } from 'react-spinners';
const Loader = () => {
    return (
        <div className='h-screen w-10 mx-auto pt-44'>
               <PropagateLoader />
        </div>
    );
};

export default Loader;