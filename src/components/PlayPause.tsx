import React, { FC } from "react";
interface PlayPauseProps {
  activeSong: any;
  data: any;
  isPlaying: any;
}
const PlayPause: FC<PlayPauseProps> = ({ activeSong, data, isPlaying }) => {
  return (
    <div className="flex items-center justify-center text-white">
      {activeSong?.title === data &&
        (isPlaying ? (
          <i className="bx bx-pause text-5xl"></i>
        ) : (
          <i className="bx bx-play text-5xl"></i>
        ))}
    </div>
  );
};

export default PlayPause;
