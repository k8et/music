import React, { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";
import LeftSide from "./LeftSide";

const SidebarMobile = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(true)}
          />
        ) : (
          <RiCloseLine
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>

      <div
        className={`fixed top-0 h-screen w-60 fixed bg-gradient-to-tl from-black to-[#483D8B] backdrop-blur-lg z-10 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <div onClick={() => setMobileMenuOpen(false)}>
          <LeftSide />
        </div>
      </div>
    </>
  );
};

export default SidebarMobile;
