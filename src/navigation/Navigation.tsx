import React, { useState } from "react";
import { Route, Routes } from "react-router";
import LeftSide from "../components/LeftSide";
import Main from "../screens/Main";
import { useSelector } from "react-redux";
import Player from "../components/AudioPlayer";
import TopCharts from "../components/TopCharts";
import ArtistDetails from "../screens/ArtistDetails";

const Navigation = () => {
  const { activeSong } = useSelector((state: any) => state.player);
  return (
    <div
      className="flex h-full w-full"
      style={{
        background:
          "radial-gradient(circle, rgba(52,52,57,1) 0%, rgba(74,73,88,1) 20%, rgba(85,84,85,1) 53%, rgba(103,81,170,1) 100%)",
      }}
    >
      <LeftSide />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/artist/:id" element={<ArtistDetails />} />
      </Routes>
      <TopCharts />
      {activeSong?.title && <Player />}
    </div>
  );
};

export default Navigation;
