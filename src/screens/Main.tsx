import React, { FC } from "react";
import Discover from "../components/Discover";
import TopCharts from "../components/TopCharts";

const Main: FC = () => {
  return (
    <div className="flex w-screen h-screen">
      <Discover />
    </div>
  );
};

export default Main;
