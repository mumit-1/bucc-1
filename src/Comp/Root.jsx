import React, { createContext, useState } from "react";
import Clock from "./Clock";
import Loader from "./Loader";
import { FaMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";
import Calender from "./Calender";
import Weather from "./Weather"; 
import SongPlayer from './SongPlayer';
export const tower = createContext();
const Root = () => {
  const [mode, setMode] = useState(true);
  const [show, setShow] = useState(false);
  const food = {
    mode,
  };
  setTimeout(() => {
    setShow(true);
  }, 1200);
  return (
    <tower.Provider value={food}>
      <div className={`${mode ? "bg-[#132523]" : "bg-gray-200 text-black"}`}>
        <div className="max-w-screen-xl mx-auto lg:h-screen md:h-screen px-2">
          <div className={`${show ? "block" : "hidden"} py-4`}>
            <div className={`  lg:flex md:flex gap-3 `}>
              <div className="flex-1">
                <Clock
                  className={`${mode ? "bg-[#001311]" : "bg-white h-full"}`}
                ></Clock>
              </div>
              <div className="flex lg:mt-0 md:mt-0 mt-3 gap-3">
                <Calender className=""></Calender>
                <div className="w-full">
                  {mode ? (
                    <button
                      onClick={() => setMode(!mode)}
                      className={`btn text-4xl h-20 lg:w-16 md:w-16 w-full  rounded-3xl p-2 border-transparent shadow-lg ${
                        mode ? "bg-[#001311]" : "bg-white border-[#132523]"
                      }`}
                    >
                      <FaMoon />
                    </button>
                  ) : (
                    <button
                      className={`${
                        mode
                          ? "text-white bg-[#001311] "
                          : "bg-white text-black border-[#132523]"
                      } btn  text-4xl h-20 lg:w-16 md:w-16 w-full rounded-3xl p-2 border-transparent shadow-lg `}
                      onClick={() => setMode(!mode)}
                    >
                      {" "}
                      <LuSun />
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="py-3 w-full lg:flex md:flex items-start gap-3">
              <Weather></Weather>
              <div className="lg:mb-0 md:mb-0 lg:mt-0 md:mt-0 mt-3 mb-10">
                <SongPlayer></SongPlayer>
              </div>
            </div>
          </div>

          <div className={`${show ? "hidden" : "block"}`}>
            <Loader></Loader>
          </div>
        </div>
      </div>
    </tower.Provider>
  );
};

export default Root;
