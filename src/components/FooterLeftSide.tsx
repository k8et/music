import React from "react";
import { Link } from "react-router-dom";

const FooterLeftSide = () => {
  return (
    <div className="flex flex-col w-full h-full bg-blackWhite rounded-lg p-6 gap-8">
      <div className="flex items-center gap-4">
        <i className="bx bx-planet text-white text-2xl"></i>
        <Link to="/around" className="tx-600 text-white">
          Around You
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <i className="bx bxs-user-voice text-white text-2xl"></i>
        <Link to="/topArtist" className="tx-600 text-white">
          Top Artists
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <i className="bx bx-hash text-white text-2xl"></i>
        <Link to="/chart" className="tx-600 text-white">
          Top Charts
        </Link>
      </div>
    </div>
  );
};

export default FooterLeftSide;
