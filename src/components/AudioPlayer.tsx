import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { nextSong, playPause, prevSong } from "../store/slice/player";
// @ts-ignore
import img from "../assets/images.jpg";
import { BsArrowRepeat, BsShuffle } from "react-icons/bs";
const PlayerContainer = styled.div`
  position: fixed;
  height: 7rem;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  animation: slide-up 0.3s ease;
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.1),
    #2a2a80
  );
  backdrop-filter: blur(8px);
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  z-index: 10;

  @keyframes slide-up {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const TrackInfo = styled.div`
  padding: 5px 0 0 20px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 500px;
`;

const ControlButton = styled.button`
  color: #fff;
  cursor: pointer;
  font-size: 24px;
  margin: 0 8px;
  transition:
    background-color 0.3s,
    border-color 0.3s,
    color 0.3s;
`;

const ControlButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SliderContainer = styled.div`
  display: flex;
  width: 300px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: #fff;
`;

const SliderTime = styled.input`
  width: 90%;
  height: 5px;
  margin-top: 8px;
`;

const SliderVol = styled.input`
  width: 100px;
  height: 5px;
`;
const TimeInfoContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 3px;
  justify-content: center;
  color: #fff;
`;
const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
`;

const Player = () => {
  const dispatch = useDispatch();
  const playerState = useSelector((state: any) => state.player);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [repeat, setRepeat] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [random, setRandom] = useState(false);

  useEffect(() => {
    const currentAudioRef = audioRef.current;
    if (currentAudioRef) {
      currentAudioRef.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (currentAudioRef) {
        currentAudioRef.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (playerState.isActive) {
        audioRef.current.play().then((r) => r);
      } else {
        audioRef.current.pause();
      }
    }
  }, [playerState.isActive]);
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handlePlayPause = () => {
    const audioElement = audioRef.current;

    if (audioElement) {
      if (playerState.isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play().then((r) => r);
      }

      dispatch(playPause(!playerState.isPlaying && !playerState.isActive));
    }
  };

  const handleNextSong = () => {
    dispatch(playPause(false));

    if (!random) {
      dispatch(
        nextSong(
          (playerState.currentIndex + 1) % playerState.currentSongs.length,
        ),
      );
    } else {
      dispatch(
        nextSong(Math.floor(Math.random() * playerState.currentSongs.length)),
      );
    }
  };

  const handlePrevSong = () => {
    if (playerState.currentIndex === 0) {
      dispatch(prevSong(playerState.currentSongs.length - 1));
    } else if (random) {
      dispatch(
        prevSong(Math.floor(Math.random() * playerState.currentSongs.length)),
      );
    } else {
      dispatch(prevSong(playerState.currentIndex - 1));
    }
  };

  const handleTimeChange = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <PlayerContainer>
      <TrackInfo>
        <img
          src={playerState.activeSong?.images?.coverart || img}
          alt="cover art"
          className={`
        ${
          playerState.isPlaying && playerState.isActive
            ? "animate-[spin_3s_linear_infinite]"
            : ""
        }
        hidden sm:block h-16 w-16 mr-4 rounded-full
      `}
        />
        {playerState?.activeSong?.title ||
          playerState?.activeSong?.attributes?.name ||
          playerState?.activeSong?.heading?.title}
      </TrackInfo>
      <audio
        ref={audioRef}
        autoPlay={playerState.isActive}
        src={
          playerState?.activeSong?.hub?.actions[1]?.uri ||
          playerState?.activeSong?.attributes?.previews[0]?.url ||
          playerState?.activeSong?.stores?.apple?.previewurl ||
          playerState?.activeSong?.ringtone
        }
        onEnded={repeat ? () => handleTimeChange(0) : handleNextSong}
        // @ts-ignore
        volume={volume}
      />

      <ControlContainer>
        <ControlButtonContainer>
          <BsArrowRepeat
            size={20}
            color={repeat ? "red" : "white"}
            onClick={() => setRepeat((prev) => !prev)}
            className="hidden sm:block cursor-pointer"
          />
          <ControlButton onClick={handlePrevSong}>
            <i className="bx bx-skip-previous text-3xl"></i>
          </ControlButton>
          <ControlButton onClick={handlePlayPause}>
            {playerState.isPlaying ? (
              <i className="bx bx-pause text-3xl "></i>
            ) : (
              <i className="bx bx-play text-3xl"></i>
            )}
          </ControlButton>
          <ControlButton onClick={handleNextSong}>
            <i className="bx bx-skip-next text-3xl"></i>
          </ControlButton>
          <BsShuffle
            size={20}
            color={random ? "red" : "white"}
            onClick={() => setRandom((prev) => !prev)}
            className="hidden sm:block cursor-pointer"
          />
        </ControlButtonContainer>
        <TimeInfoContainer>
          {Math.floor(currentTime / 60)}:
          {(currentTime % 60).toFixed(0).padStart(2, "0")}
          <SliderTime
            type="range"
            min={0}
            max={100}
            step={1}
            value={currentTime ? currentTime : 0}
            onChange={(e) => handleTimeChange(Number(e.target.value))}
          />
          <span>1:30</span>
        </TimeInfoContainer>
      </ControlContainer>
      <SliderContainer>
        <i className="bx bx-volume-full"></i>
        <SliderVol
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
        />
      </SliderContainer>
    </PlayerContainer>
  );
};

export default Player;
