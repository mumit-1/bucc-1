import React, {  useState } from "react";
import Clock from "./Clock";
import Loader from "./Loader";
import { FaMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";
import Calender from "./Calender";

const Root = () => {
    const [mode,setMode] = useState(false);
    const [show,setShow] = useState(false);
    setTimeout(()=>{setShow(true)},1200)
  return (
    <div className={`${mode?"bg-black":"bg-white text-black"}`}>
        <div className="max-w-screen-xl mx-auto h-screen px-2">
        
                <div className={`${show? "block" : "hidden"} pt-4 flex gap-3 h-10`}>
                <div className="flex-1">
                    <Clock ></Clock>
                </div>
                <Calender></Calender>
                {
                    mode? <button onClick={()=>setMode(!mode)} className="btn w-16 text-4xl h-20 bg-white/10 backdrop-blur-md rounded-2xl p-2 border-2 border-white/20 shadow-lg"><FaMoon /></button> : <button className={`${mode?"text-white":"text-black"} btn w-16 text-4xl h-20 bg-white/10 backdrop-blur-md rounded-2xl p-2 border-2 border-white/20 shadow-lg`} onClick={()=>setMode(!mode)}> <LuSun /></button>
                }
             </div>
             <div className={`${show? "hidden" : "block"}`} >
                 <Loader></Loader>
             </div>
        
        
        </div>
    </div>
  );
};

export default Root;
