import React from "react";
import HeaderLeftSide from "./HeaderLeftSide";
import FooterLeftSide from "./FooterLeftSide";

const LeftSide = () => {
  return (
    <div className="flex flex-col bg-black w-3/12 h-screen p-3 gap-3">
      <HeaderLeftSide />
      <FooterLeftSide />
    </div>
  );
};

export default LeftSide;
