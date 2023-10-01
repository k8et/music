import React from "react";
import HeaderLeftSide from "./HeaderLeftSide";
import FooterLeftSide from "./FooterLeftSide";

const LeftSide = () => {
  return (
    <div className="flex flex-col bg-black h-screen w-[250px] p-3 gap-3 sticky top-0">
      <HeaderLeftSide />
      <FooterLeftSide />
    </div>
  );
};

export default LeftSide;
