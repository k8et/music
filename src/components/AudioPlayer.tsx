import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledAudioPlayer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background-color: #333;
  color: white;
  border-radius: 4px;
  width: 100%;
  max-width: 400px;
`;

const AudioControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AudioProgressBar = styled.input`
  width: 100%;
`;

const AudioPlayer: React.FC<{ trackUrl: string }> = ({ trackUrl }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;

        if (audio) {
            audio.src = trackUrl;

            audio.addEventListener('loadedmetadata', () => {
                setDuration(Math.floor(audio.duration));
            });

            audio.addEventListener('timeupdate', () => {
                setCurrentTime(Math.floor(audio.currentTime));
            });

            if (isPlaying) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    }, [isPlaying, trackUrl]);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleSeekBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = Number(e.target.value);
        setCurrentTime(newTime);

        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    return (
        <StyledAudioPlayer>
            <AudioControls>
                <button onClick={togglePlayPause}>
                    {isPlaying ? 'Пауза' : 'Воспроизвести'}
                </button>
                <span>{`${Math.floor(currentTime / 60)}:${(currentTime % 60)
                    .toString()
                    .padStart(2, '0')}`}</span>
            </AudioControls>
            <AudioProgressBar
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleSeekBarChange}
            />
            <span>{`${Math.floor(duration / 60)}:${(duration % 60)
                .toString()
                .padStart(2, '0')}`}</span>
            <audio ref={audioRef} preload="metadata" />
        </StyledAudioPlayer>
    );
};

export default AudioPlayer;
