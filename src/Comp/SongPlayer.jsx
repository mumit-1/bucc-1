import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
} from "react-icons/fa";
import { tower } from "./Root";
import { IoMdPlay, IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { IoPlaySkipForwardSharp } from "react-icons/io5";

const SongPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [songOn, setSongOn] = useState(true);
  const [num, setNum] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTimeShow, setCurrentTimeShow] = useState(0);
  const [prevSong, setPrevSong] = useState(null);
  const [chk, setChk] = useState(true);
  const audioRef = useRef(null);
  const { mode } = useContext(tower);
  useEffect(() => {
    fetch("/Song.json")
      .then((res) => res.json())
      .then((data) => setSongs(data));
  }, []);
  const handlePlay = () => {
    if (songOn) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
    setSongOn(!songOn);
  };
  const handlePrev = () => {
    if (prevSong !== null) {
      setNum(prevSong);
      setSongOn(true);
      setChk(true);
    }
  };
  const handleNext = () => {
    const randomNumber = Math.floor(Math.random() * 28) + 1;

    if (num !== randomNumber) {
      setNum(randomNumber);
      setPrevSong(num);
      setSongOn(true);
    } else {
      handleNext();
    }
  };
  const currentSong = songs[num] || {};
  const { id, title, fileUrl } = currentSong;
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  if (!songs.length)
    return <p className="text-center text-white">Loading...</p>;
  const handleVolumeChange = (e) => {
    audioRef.current.volume = e.target.value;
  };

  return (
    <div
      className={`bg-[#001311] lg:max-w-sm  p-6 rounded-2xl shadow-lg ${
        mode ? "bg-[#001311]" : "bg-white border border-[#132523]"
      } rounded-3xl p-2 border-transparent shadow-lg relative`}
    >
      <div className=" mb-14 mt-5">
        <img
          className="w-2/3 lg:w-1/2 md:w-1/2 mx-auto rounded-3xl"
          src="https://i.pinimg.com/474x/99/98/c6/9998c6fb53282508aba3353f81b68a88.jpg"
          alt=""
        />
      </div>
      <div className="flex w-12  flex-col  self-end absolute top-[260px] lg:top-[199px] right-0">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          onChange={handleVolumeChange}
          className={`w-[200px] lg:w-[140px] h-5 ${
            mode ? "bg-gray-700" : "bg-gray-300"
          } rounded-full appearance-none
               cursor-pointer accent-white
               [&::-webkit-slider-thumb]:appearance-none
               [&::-webkit-slider-thumb]:h-5
               [&::-webkit-slider-thumb]:w-5
               [&::-webkit-slider-thumb]:rounded-full
               [&::-webkit-slider-thumb]:bg-[#02ffe2]
               [&::-webkit-slider-thumb]:border
               [&::-webkit-slider-thumb]:border-zinc-900
               [&::-webkit-slider-thumb]:shadow-md
               [&::-moz-range-thumb]:h-4
               [&::-moz-range-thumb]:w-4
               [&::-moz-range-thumb]:rounded-full
               [&::-moz-range-thumb]:bg-white
              -rotate-90 -top-[120px] lg:-top-[90px] -left-[92px] lg:-left-[62px]
               absolute
               block
               `}
        />
        <FaVolumeUp className="block" />
      </div>
      <div className="">
        <div>
          <h2 className="text-xl font-semibold w-80 h-12">
            {title || "Loading..."}
          </h2>
          <div className="">
            <input
              type="range"
              name=""
              id=""
              min="0"
              max={duration || 100}
              value={currentTimeShow}
              onChange={(e) => {
                audioRef.current.currentTime = e.target.value; // Seek on drag
              }}
              className={`w-full h-1.5 ${
                mode ? "bg-gray-700" : "bg-gray-300"
              } rounded-full appearance-none
                 cursor-pointer accent-white
                 [&::-webkit-slider-thumb]:appearance-none
                 [&::-webkit-slider-thumb]:h-5
                 [&::-webkit-slider-thumb]:w-5
                 [&::-webkit-slider-thumb]:rounded-full
                 [&::-webkit-slider-thumb]:bg-[#02ffe2]
                 [&::-webkit-slider-thumb]:border
                 [&::-webkit-slider-thumb]:border-zinc-900
                 [&::-webkit-slider-thumb]:shadow-md
                 [&::-moz-range-thumb]:h-4
                 [&::-moz-range-thumb]:w-4
                 [&::-moz-range-thumb]:rounded-full
                 [&::-moz-range-thumb]:bg-white mt-10`}
            />

            <div className="flex mb-9 justify-between items-center">
              <p>{formatTime(currentTimeShow)}</p>
              <p>{formatTime(duration)}</p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-6 mt-4 text-2xl">
            <button
              onClick={handlePrev}
              className="bg-[#02ffe2] text-black w-12 h-12  pl-2.5 shadow-xl rounded-full"
            >
              <IoMdSkipBackward />
            </button>
            <button
              onClick={handlePlay}
              className="bg-[#02ffe2] text-black w-12 h-12 pl-3 shadow-xl rounded-full"
            >
              {songOn ? <IoMdPlay /> : <FaPause />}
            </button>
            <button
              onClick={handleNext}
              className="bg-[#02ffe2] text-black w-12 h-12 pl-2.5 shadow-xl rounded-full"
            >
              <IoMdSkipForward />
            </button>
          </div>
        </div>
      </div>

      {fileUrl && (
        <audio
          ref={audioRef}
          src={fileUrl}
          onTimeUpdate={() => {
            setCurrentTimeShow(audioRef.current.currentTime);
          }}
          onLoadedMetadata={() => {
            setDuration(audioRef.current.duration);
          }}
        />
      )}
    </div>
  );
};

export default SongPlayer;
