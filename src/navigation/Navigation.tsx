import React from "react";
import { Route, Routes } from "react-router";
import LeftSide from "../components/LeftSide";
import Main from "../screens/Main";
import { useSelector } from "react-redux";
import Player from "../components/AudioPlayer";
import RightSide from "../components/RightSide";
import ArtistDetails from "../screens/ArtistDetails";
import SongDetails from "../screens/SongDetails";
import TopArtist from "../screens/TopArtist";
import Charts from "../screens/Charts";
import SearchInput from "../components/SearchInput";
import Search from "../screens/Search";
import Around from "../screens/Around";
import { useMediaQuery } from "react-responsive";

const Navigation = () => {
  const { isOpen } = useSelector((state: any) => state.player);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 764px)" });
  return (
    <div
      className="flex h-full w-full"
      style={{
        background:
          "radial-gradient(circle, rgba(52,52,57,1) 0%, rgba(74,73,88,1) 20%, rgba(85,84,85,1) 53%, rgba(103,81,170,1) 100%)",
      }}
    >
      {!isTabletOrMobile && <LeftSide />}
      <div className="flex justify-between w-full xl:flex-row flex-col">
        <div className="flex-grow w-full p-2 xl:w-1/2">
          <SearchInput />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/artist/:id/:img/:name" element={<ArtistDetails />} />
            <Route path="/songs/:id/:img/:name" element={<SongDetails />} />
            <Route path="/topArtist" element={<TopArtist />} />
            <Route path="/chart" element={<Charts />} />
            <Route path="/search/:searchTerm" element={<Search />} />
            <Route path="/around" element={<Around />} />
          </Routes>
        </div>
        <div className="w-full p-2 xl:w-[500px] lg:pb-0 pb-36">
          <RightSide />
        </div>
      </div>
      {isOpen && <Player />}
    </div>
  );
};

export default Navigation;
