import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import ReactAudioPlayer from "react-audio-player";

interface PlayerProps {
    tracks: any[];
    currentTrackIndex: number;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    setCurrentTrackIndex: (index: number) => void;
}

const PlayerContainer = styled.div`
  background-color: rgba(49, 47, 47, 0.9);
  position: absolute;
  bottom: 0;
  padding: 20px;
  width: 100%;
  border-radius: 10px;
`;

const ControlButton = styled.button`
  background-color: #fff;
  color: #333;
  border: none;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

const TrackInfo = styled.div`
  color: #fff;
  margin-bottom: 10px;
`;

const Player: React.FC<PlayerProps> = ({
                                           tracks,
                                           currentTrackIndex,
                                           isPlaying,
                                           setIsPlaying,
                                           setCurrentTrackIndex,
                                       }) => {
    const [volume, setVolume] = useState(0.5);
    const [currentTime, setCurrentTime] = useState(0);
    const currentTrack = tracks[currentTrackIndex];
    const audioRef = useRef<ReactAudioPlayer | null>(null);

    const playPauseToggle = () => {
        if (audioRef.current && audioRef.current.audioEl.current) {
            if (isPlaying) {
                audioRef.current.audioEl.current.pause(); // Приостанавливаем воспроизведение
            } else {
                audioRef.current.audioEl.current.play(); // Воспроизводим
            }
            setIsPlaying(!isPlaying);
        }
    };

    const playNextTrack = () => {
        if (currentTrackIndex < tracks.length - 1) {
            setIsPlaying(false);
            const nextTrackIndex = currentTrackIndex + 1;
            if (nextTrackIndex < tracks.length) {
                setCurrentTrackIndex(nextTrackIndex);
                setIsPlaying(true);
            }
        }
    };

    const playPreviousTrack = () => {
        if (currentTrackIndex > 0) {
            setIsPlaying(false);
            const previousTrackIndex = currentTrackIndex - 1;
            if (previousTrackIndex >= 0) {
                setCurrentTrackIndex(previousTrackIndex);
                setIsPlaying(true);
            }
        }
    };

    const handleVolumeChange = (newVolume: number) => {
        setVolume(newVolume);
    };

    const handleTimeChange = (newTime: number) => {
        if (audioRef.current && audioRef.current.audioEl.current) {
            audioRef.current.audioEl.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    return (
        <PlayerContainer>
            <TrackInfo>{currentTrack.title}</TrackInfo>
            <ReactAudioPlayer
                ref={audioRef}
                src={currentTrack.hub.actions[1].uri}
                autoPlay={isPlaying}
                volume={volume}
                controls={false}
                onListen={(e: any) => setCurrentTime(e.target.currentTime)}
            />
            <div>
                <ControlButton onClick={playPreviousTrack}>Предыдущий трек</ControlButton>
                <ControlButton onClick={playPauseToggle}>
                    {isPlaying ? 'Пауза' : 'Воспроизвести'}
                </ControlButton>
                <ControlButton onClick={playNextTrack}>Следующий трек</ControlButton>

                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                />

                <input
                    type="range"
                    min={0}
                    max={audioRef.current?.audioEl.current?.duration || 0}
                    step={1}
                    value={currentTime}
                    onChange={(e) => handleTimeChange(parseFloat(e.target.value))}
                />
            </div>
        </PlayerContainer>
    );
};

export default Player;
