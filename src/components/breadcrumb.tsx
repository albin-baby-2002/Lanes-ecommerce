import React from "react";
import { IoIosArrowForward } from "react-icons/io";

//--------------------------------------------------

type TProps = {
  routes: string[];
};

//--------------------------------------------------

const BreadCrumb = ({ routes }: TProps) => {
  return (
    <div className="flex items-center gap-3 py-8">
      {routes.map((val, idx) => {
        return (
          <p key={idx} className="flex items-center gap-1">
            {val} {idx !== routes.length - 1 && <IoIosArrowForward size={20} />}
          </p>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
