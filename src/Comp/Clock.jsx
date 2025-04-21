import React, { useContext, useEffect, useState } from 'react';
import { tower } from './Root';

const Clock = () => {
    const [hour,setHour] = useState(0);
    const [min,setMin] = useState(0);
    const [sec,setSec] = useState(0);
    const {mode} = useContext(tower);
    useEffect(()=>{
        setInterval(() => {
            const time = new Date();
            setHour(time.getHours());
            setMin(time.getMinutes());
            setSec(time.getSeconds());
          }, 1000);
    },[])

    return (
        <div className={`  ${mode?"bg-[#001311]":"bg-white border border-[#132523]"}  rounded-3xl p-2 border-transparent shadow-lg`}>

             <div className="flex gap-1  mx-auto justify-center  ">
                <div></div>
        <div className=''>
          <p className='text-4xl'>{hour < 10 ? `0${hour}`:`${hour}`} </p>
          <p className=''>Hour</p>
        </div>
        <div className='text-4xl text-[#02ffe2]'>:</div>
        <div className='ml-5'>
          <p  className='text-4xl'>{min < 10 ? `0${min}`:`${min}`} </p>
          <p  className=''>Minute</p>
        </div>
        <div className='text-4xl text-[#02ffe2]'>:</div>
        <div className='ml-5'>
          <p className='text-4xl'>{sec < 10 ? `0${sec}`:`${sec}`} </p>
          <p  className=''>Second</p>
        </div>
      </div>
        </div>
    );
};

export default Clock;