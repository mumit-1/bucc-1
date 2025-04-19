import React, { useEffect, useState } from 'react';

const Calender = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
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
            <div className=' h-20 bg-white/10 backdrop-blur-md rounded-2xl p-2 border-2 border-white/20 shadow-lg'>
                <div className='flex gap-4 px-3 justify-center items-center'>
                    <div>
                        <p className='text-3xl'>{date}</p>
                        <p>{day}</p>
                    </div>
                    <div className="w-1 h-12 rounded-xl bg-gray-400"></div>
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