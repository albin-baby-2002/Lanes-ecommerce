import React from "react";

const Star = () => {
  const width = (19 * 40) / 100;
  return (
    <div className={` w-[${width+""}px] overflow-hidden`} style={{width:width+'px'}}>
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
