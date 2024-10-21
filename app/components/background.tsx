"use client";

import { useEffect, useState } from "react";

const Background = () => {
  const [isDanger, setIsDanger] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", detectPressedKey);
    return () => {
      document.removeEventListener("keydown", detectPressedKey);
    };
  });

  const detectPressedKey = (e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key === "d" || e.key === "D") {
      setIsDanger(!isDanger);
    }
  };

  return (
    <div
      className={`absolute z-0 w-screen h-svh  ${
        isDanger ? "bg-red-600 pulsing-element" : ""
      }`}
    ></div>
  );
};

export default Background;
