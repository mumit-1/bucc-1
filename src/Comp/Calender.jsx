import React, { useContext, useEffect, useState } from 'react';
import { tower } from './Root';

const Calender = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const {mode} = useContext(tower);
    const [date, setDate] = useState(0);
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState(0);

     useEffect(()=>{
        setInterval(() => {
            const time = new Date();
            setDate(time.getDate());
            setDay(days[time.getDay()]);
            setMonth(months[time.getMonth()]);
            setYear(time.getFullYear());
          }, 1000);
    },[])
    return (
        <div>
            <div className={` h-20 ${mode?"bg-[#001311]":"bg-white border border-[#132523]"} rounded-3xl p-2 border-transparent shadow-lg`}>
                <div className='flex gap-4 px-3 justify-center items-center'>
                    <div>
                        <p className={`text-2xl `}><span className=' rounded-xl px-1'>{date}</span></p>
                        <p>{day}</p>
                    </div>
                    <div className="w-1 h-12 rounded-xl bg-[#02ffe2]"></div>
                    <div>
                        <p>{month}</p>
                        <p>{year}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calender;