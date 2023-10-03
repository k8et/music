import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const LeftSide = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 807px)" });
  return (
    <div
      className={`flex flex-col ${
        !isTabletOrMobile ? "bg-black" : "bg-transparent"
      } h-screen w-[100px] p-3 gap-3 sticky top-0 xl:w-[250px]`}
    >
      <div
        className={`${
          !isTabletOrMobile ? "bg-blackWhite" : "bg-transparent"
        } rounded-lg p-6`}
      >
        <Link className="flex items-center gap-4 text-white tx-600" to="/">
          <i className="bx bxs-home-alt-2 text-white text-2xl"></i>
          <h3
            className={`${
              !isTabletOrMobile && "x-600 text-white hidden  xl:block w-full"
            }`}
          >
            Home
          </h3>
        </Link>
      </div>
      <div
        className={`${
          !isTabletOrMobile ? "bg-blackWhite" : "bg-transparent w-[180px]"
        } rounded-lg p-6 flex-col flex gap-8 h-full `}
      >
        <div className="flex items-center gap-4 ">
          <Link
            to="/around"
            className="tx-600 text-white flex items-center gap-4 w-full "
          >
            <i className="bx bx-planet text-white text-2xl"></i>
            <h3
              className={`${
                !isTabletOrMobile && "x-600 text-white hidden xl:block"
              }`}
            >
              Around You
            </h3>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/topArtist"
            className="tx-600 text-white flex items-center gap-4 "
          >
            <i className="bx bxs-user-voice text-white text-2xl"></i>
            <h3
              className={`${
                !isTabletOrMobile && "x-600 text-white hidden  xl:block"
              }`}
            >
              Top Artists
            </h3>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/chart"
            className="tx-600 text-white flex items-center gap-4"
          >
            <i className="bx bx-hash text-white text-2xl"></i>
            <h3
              className={`${
                !isTabletOrMobile && "x-600 text-white hidden  xl:block"
              }`}
            >
              Top Charts
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
