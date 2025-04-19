import React, { useEffect, useState } from 'react';

const Clock = () => {
    const [hour,setHour] = useState(0);
    const [min,setMin] = useState(0);
    const [sec,setSec] = useState(0);

    useEffect(()=>{
        setInterval(() => {
            const time = new Date();
            setHour(time.getHours());
            setMin(time.getMinutes());
            setSec(time.getSeconds());
          }, 1000);
    },[])

    return (
        <div className='  bg-white/10 backdrop-blur-md rounded-2xl p-2 border-2 border-white/20 shadow-lg'>

             <div className="lg:flex  md:flex gap-10 w-72 mx-auto justify-center  ">
                <div></div>
        <div className=''>
          <p className='text-4xl'>{hour < 10 ? `0${hour}`:`${hour}`} </p>
          <p className=''>Hour</p>
        </div>
        <div className='text-4xl'>:</div>
        <div className='ml-5'>
          <p  className='text-4xl'>{min < 10 ? `0${min}`:`${min}`} </p>
          <p  className=''>Minute</p>
        </div>
        <div className='text-4xl'>:</div>
        <div className='ml-5'>
          <p className='text-4xl'>{sec < 10 ? `0${sec}`:`${sec}`} </p>
          <p  className=''>Second</p>
        </div>
      </div>
        </div>
    );
};

export default Clock;