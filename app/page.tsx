"use client";

import { useEffect, useState } from "react";
import { LuMoveDown, LuMoveLeft, LuMoveRight, LuMoveUp } from "react-icons/lu";

export default function Home() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isDanger, setIsDanger] = useState(false);
  const [isCountDown, setIsCountDown] = useState(false);
  const [editingPart, setEditingPart] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);

  const pad = (n: number) => (n < 10 ? `0${n}` : n);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        if (!isCountDown) {
          timerUp();
        } else {
          timerDown();
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  useEffect(() => {
    const detectPressedKey = (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.key === " ") {
        e.preventDefault();
        if (isActive) stopTimer();
        else startTimer();
      }
      if (e.key === "ArrowLeft") {
        setEditingPart("minutes");
        if (isActive) stopTimer();
      }
      if (e.key === "ArrowRight") {
        setEditingPart("seconds");
        stopTimer();
      }
      if (e.key === "ArrowUp") {
        if (isActive) stopTimer();
        timerUp();
      }
      if (e.key === "ArrowDown") {
        if (isActive) stopTimer();
        timerDown();
      }
      if (e.key === "f" || e.key === "F") fullScreen();
      if (e.key === "r" || e.key === "R") {
        if (isActive) stopTimer();
        resetTimer();
      }
      if (e.key === "s" || e.key === "S") {
        setIsCountDown(!isCountDown);
      }
      if (e.key === "d" || e.key === "D") {
        setIsDanger(!isDanger);
      }
    };
    document.addEventListener("keydown", detectPressedKey, true);
    return () => {
      document.removeEventListener("keydown", detectPressedKey, true);
    };
  });

  const fullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  const resetTimer = () => {
    setMinutes(0);
    setSeconds(0);
  };

  const timerUp = () => {
    if (editingPart === "minutes") {
      setMinutes((prev) => prev + 1);
      return;
    } else {
      if (seconds === 59) {
        setMinutes((prev) => prev + 1);
        setSeconds(0);
        return;
      }
      setSeconds((prev) => prev + 1);
    }
  };

  const timerDown = () => {
    if (editingPart === "minutes") {
      if (minutes === 0) {
        if (isActive) stopTimer();
        return;
      }
      setMinutes((prev) => prev - 1);
      return;
    } else {
      if (seconds === 0) {
        if (minutes === 0) {
          setIsActive(false);
          return;
        }
        setMinutes((prev) => prev - 1);
        setSeconds(59);
        return;
      }
      setSeconds((prev) => prev - 1);
    }
  };

  const startTimer = () => {
    setEditingPart("");
    setIsActive(true);
  };
  const stopTimer = () => {
    setIsActive(false);
  };

  return (
    <div
      style={{ fontSize: "30vw" }}
      className={`flex flex-col items-center justify-center  space-y-5  font-extrabold min-h-svh`}
    >
      <div
        className={`${
          isDanger ? " text-red-500 focus:outline focus:ring" : ""
        }`}
      >
        <span
          onClick={() => {
            if (isActive) stopTimer();
            setEditingPart("minutes");
          }}
          className={`${
            editingPart === "minutes" && !isActive ? "pulsing-element" : ""
          } font-mono`}
        >
          {pad(minutes)}
        </span>
        <span className="font-mono">:</span>
        <span
          onClick={() => {
            if (isActive) stopTimer();
            setEditingPart("seconds");
          }}
          className={`${
            editingPart === "seconds" && !isActive ? "pulsing-element" : ""
          } font-mono`}
        >
          {pad(seconds)}
        </span>
      </div>
      <div className="absolute bottom-10">
        <div className="flex flex-col items-start justify-center space-y-2">
          <div className="flex items-center justify-center space-x-1 ">
            <button
              onClick={fullScreen}
              className="text-xs border font-extralight py-1 px-2 rounded-md opacity-20 hover:opacity-60"
            >
              F
            </button>{" "}
            <span className="text-xs opacity-20 font-extralight flex items-center justify-center">
              - {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setEditingPart("minutes");
                if (isActive) stopTimer();
              }}
              className="text-xs border font-extralight py-1 px-2 rounded-md opacity-20 hover:opacity-60"
            >
              <LuMoveLeft />
            </button>
            <button
              onClick={() => {
                setEditingPart("seconds");
                stopTimer();
              }}
              className="text-xs border font-extralight py-1 px-2 rounded-md opacity-20 hover:opacity-60"
            >
              <LuMoveRight />
            </button>
            <button
              onClick={() => {
                if (isActive) stopTimer();
                timerUp();
              }}
              className="text-xs border font-extralight py-1 px-2 rounded-md opacity-20 hover:opacity-60"
            >
              <LuMoveUp />
            </button>
            <button
              onClick={() => {
                if (isActive) stopTimer();
                timerDown();
              }}
              className="text-xs border font-extralight py-1 px-2 rounded-md opacity-20 hover:opacity-60"
            >
              <LuMoveDown />
            </button>
            <span className="text-xs opacity-20 font-extralight flex items-center justify-center">
              {" "}
              -{" "}
              {editingPart === "minutes"
                ? "Up / Down to edit Minutes"
                : "Up / Down to Edit Seconds"}
            </span>
          </div>
          <div className="flex items-center justify-center space-x-1 ">
            <button
              onClick={() => {
                if (isActive) stopTimer();
                resetTimer();
              }}
              className="text-xs border font-extralight py-1 px-2 rounded-md opacity-20 hover:opacity-60"
            >
              R
            </button>
            <span className="text-xs opacity-20  font-extralight flex items-center justify-center">
              - Reset Timer
            </span>
          </div>
          <div className="flex items-center justify-center space-x-1 ">
            <button
              onClick={() => setIsCountDown(!isCountDown)}
              className="text-xs border font-extralight py-1 px-2 rounded-md opacity-20 hover:opacity-60"
            >
              S
            </button>
            <span className="text-xs opacity-20 font-extralight flex items-center justify-center">
              - {isCountDown ? "Countdown" : "Stopwatch"}
            </span>
          </div>
          <div className="flex items-center justify-center space-x-1 ">
            <button
              onClick={() => {
                setIsDanger(!isDanger);
              }}
              className="text-xs border font-extralight py-1 px-2 bg-red-500 rounded-md opacity-20 hover:opacity-60"
            >
              D
            </button>
            <span className="text-xs opacity-20 font-extralight flex items-center justify-center">
              - {isDanger ? "In Danger" : "No Danger"}
            </span>
          </div>
          <div className="flex items-center justify-center space-x-1 ">
            <button
              onClick={() => {
                if (isActive) stopTimer();
                else startTimer();
              }}
              className="text-xs border font-extralight py-1 px-2 rounded-md opacity-20 hover:opacity-60"
            >
              Space
            </button>
            <span className="text-xs opacity-20 font-extralight flex items-center justify-center">
              - {isActive ? "Stop" : "Start"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
