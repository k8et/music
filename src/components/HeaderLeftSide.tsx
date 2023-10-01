import React from "react";
import { Link } from "react-router-dom";

const HeaderLeftSide = () => {
  return (
    <div className="w-full bg-blackWhite rounded-lg p-6 pr-40 ">
      <Link className="flex items-center gap-4" to="/">
        <i className="bx bxs-home-alt-2 text-white text-2xl"></i>
        <h3 className="tx-600 text-white">Home</h3>
      </Link>
    </div>
  );
};

export default HeaderLeftSide;
