import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextSong, playPause, prevSong } from "../store/slice/player";
// @ts-ignore
import img from "../assets/images.jpg";
import { BsArrowRepeat, BsShuffle } from "react-icons/bs";
import {
  ControlButton,
  ControlButtonContainer,
  ControlContainer,
  PlayerContainer,
  SliderContainer,
  SliderTime,
  SliderVol,
  TimeInfoContainer,
  TrackInfo,
} from "../styles/AudioPlayerStyle";

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
        loop={repeat}
        src={
          playerState?.activeSong?.hub?.actions[1]?.uri ||
          playerState?.activeSong?.attributes?.previews[0]?.url ||
          playerState?.activeSong?.stores?.apple?.previewurl ||
          playerState?.activeSong?.ringtone
        }
        onEnded={handleNextSong}
        // @ts-ignore
        volume={volume}
      />

      <ControlContainer>
        <ControlButtonContainer>
          <ControlButton onClick={() => setRepeat((prev) => !prev)}>
            <BsArrowRepeat
              size={20}
              color={repeat ? "red" : "white"}
              className="hidden sm:block cursor-pointer"
            />
          </ControlButton>
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
          <ControlButton onClick={() => setRandom((prev) => !prev)}>
            <BsShuffle
              size={20}
              color={random ? "red" : "white"}
              className="hidden  sm:block cursor-pointer "
            />
          </ControlButton>
        </ControlButtonContainer>
        <TimeInfoContainer>
          {Math.floor(currentTime / 60)}:
          {(currentTime % 60).toFixed(0).padStart(2, "0")}
          <SliderTime
            type="range"
            min={0}
            max={90}
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
