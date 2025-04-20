import React, { createContext, useState } from "react";
import Clock from "./Clock";
import Loader from "./Loader";
import { FaMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";
import Calender from "./Calender";
import Weather from "./Weather";
export const tower = createContext();
const Root = () => {
  const [mode, setMode] = useState(false);
  const [show, setShow] = useState(false);
  const food = {
    mode,
  };
  setTimeout(() => {
    setShow(true);
  }, 1200);
  return (
    <tower.Provider value={food}>
      <div className={`${mode ? "bg-[#132523]" : "bg-white text-black"}`}>
        <div className="max-w-screen-xl mx-auto h-screen px-2">
          <div className={`${show ? "block" : "hidden"} py-4`}>
            <div className={`  flex gap-3 `}>
              <div className="flex-1">
                <Clock
                  className={`${mode ? "bg-[#001311]" : "bg-white h-full"}`}
                ></Clock>
              </div>
              <div className="flex  gap-3">
                <Calender></Calender>
                {mode ? (
                  <button
                    onClick={() => setMode(!mode)}
                    className={`btn w-16 text-4xl h-20  rounded-2xl p-2 border-transparent shadow-lg ${
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
                    } btn w-16 text-4xl h-20  rounded-2xl p-2 border-transparent shadow-lg`}
                    onClick={() => setMode(!mode)}
                  >
                    {" "}
                    <LuSun />
                  </button>
                )}
              </div>
            </div>
            <div className="py-3">
              <Weather></Weather>
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
