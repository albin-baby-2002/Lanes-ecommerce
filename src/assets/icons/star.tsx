import React from "react";

const Star = ({ score }: { score: number }) => {
  const width = 19 * score;
  return (
    <div
      className="overflow-hidden"
      style={{
        width:
          score >= 0.8 && score !== 1
            ? Math.min(13.3, width)
            : Math.max(width, 8) + "px",
      }}
    >
      <svg
        width="19"
        height="17"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.65059 0.255005L12.2698 5.89491L18.4431 6.6431L13.8886 10.8769L15.0846 16.9793L9.65059 13.956L4.21655 16.9793L5.41263 10.8769L0.858134 6.6431L7.03139 5.89491L9.65059 0.255005Z"
          fill="#FFC633"
        />
      </svg>
    </div>
  );
};

export default Star;