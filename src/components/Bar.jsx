import React from "react";
import { FaDev } from "react-icons/fa";
import { SiReactquery } from "react-icons/si";

const Bar = () => {
  return (
    <div className="px-8 font-[poppins]">
      <div className="grid gap-8 items-start justify-center tracking-wider">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-yellow-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <button className="relative px-7 py-2 bg-black rounded-lg leading-none flex divide-x divide-gray-600 items-center">
            <span className="flex items-center space-x-5">
              <FaDev className="text-pink-500 h-6 w-6 -rotate-6 animate-vibrate" />
              <span className="pr-6 text-gray-100 ">Playing with the</span>
            </span>
            <a href={"https://tanstack.com/query/v3"} target="_blank">
              <span className="pl-6 text-indigo-400 group-hover:text-gray-100 transition duration-200 flex items-center gap-5">
                <SiReactquery className="text-pink-500 h-6 w-6 animate-roll" />
                ReactQuery &rarr;
              </span>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bar;
