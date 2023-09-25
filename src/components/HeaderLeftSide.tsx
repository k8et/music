import React from "react";
import { Link } from "react-router-dom";

const HeaderLeftSide = () => {
  return (
    <div className="w-full bg-blackWhite rounded-lg p-6">
      <div className="flex items-center gap-4">
        <i className="bx bx-search text-white text-2xl"></i>
        <h3 className="tx-600 text-white">Search</h3>
      </div>
      <Link className="flex items-center gap-4" to="/">
        <i className="bx bxs-home-alt-2 text-white text-2xl"></i>
        <h3 className="tx-600 text-white">Home</h3>
      </Link>
    </div>
  );
};

export default HeaderLeftSide;
