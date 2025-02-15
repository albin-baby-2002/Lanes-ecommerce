import React from "react";

const CircularLoader = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <linearGradient id="a4">
        <stop offset="0" stopColor="#040002" stopOpacity="0"></stop>
        <stop offset="1" stopColor="#040002"></stop>
      </linearGradient>
      <circle
        fill="none"
        stroke="url(#a4)"
        strokeWidth="15"
        strokeLinecap="round"
        strokeDasharray="0 44 0 44 0 44 0 44 0 360"
        cx="100"
        cy="100"
        r="70"
        style={{ transformOrigin: "center" }}
      >
        <animateTransform
          type="rotate"
          attributeName="transform"
          calcMode="discrete"
          dur="0.5"
          values="360;324;288;252;216;180;144;108;72;36"
          repeatCount="indefinite"
        ></animateTransform>
      </circle>
    </svg>
  );
};

export default CircularLoader;
