import React from "react";
import { MdOutlineArrowCircleRight } from "react-icons/md";

const LatestProducts = () => {
  return (
    <div className="flex items-end justify-between py-20">
      <div>
        <p className="text-4xl font-bold">New Arrivals</p>
        <p className="mt-2 text-black/60">
          Get your hands on the latest fashion never miss the trend{" "}
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-2xl bg-ceramic px-5 py-3.5">
        <p className="pb-1">Explore now</p>
        <MdOutlineArrowCircleRight size={"24px"} />
      </div>
    </div>
  );
};

export default LatestProducts;
