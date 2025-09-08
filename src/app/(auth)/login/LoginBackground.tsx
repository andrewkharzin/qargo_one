/* LoginBackground.tsx */
"use client";

import React from "react";
import "./stars.css"; // Custom CSS for stars & comets

const LoginBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0015] to-[#0d001a]" />

      {/* Parallax Stars */}
      <div className="stars-far"></div>
      <div className="stars-medium"></div>
      <div className="stars-close"></div>

      {/* Passing Comets */}
      <div className="comet"></div>
      <div className="comet delay-2000"></div>
      <div className="comet delay-4000"></div>

      {/* Information Flow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 animate-flow-line"></div>
        <div className="absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-30 animate-flow-line animation-delay-1000"></div>
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-35 animate-flow-line animation-delay-2000"></div>
        <div className="absolute top-2/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-25 animate-flow-line animation-delay-3000"></div>
      </div>
    </div>
  );
};

export default LoginBackground;
