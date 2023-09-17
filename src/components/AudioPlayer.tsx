import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import ReactAudioPlayer from 'react-audio-player';

interface PlayerProps {
    tracks: any[];
    currentTrackIndex: number;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    setCurrentTrackIndex: (index: number) => void;
}

const PlayerContainer = styled.div`
  position: absolute;
  height: 7rem; 
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  animation: slide-up 0.3s ease;
  background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), #2a2a80);
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
  color: #fff;
`;

const ControlButton = styled.button`
  color: #fff;
  cursor: pointer;
  font-size: 24px;
  margin: 0 8px;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;

`;

const ControlButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
`;

const SliderTime = styled.input`
  width: 100%;
  height: 5px;
  margin-top: 8px;
`;

const SliderVol = styled.input`
  width: 100%;
  height: 5px;
  margin-top: 8px;
`;

const Player: React.FC<PlayerProps> = ({
                                           tracks,
                                           currentTrackIndex,
                                           isPlaying,
                                           setIsPlaying,
                                           setCurrentTrackIndex,
                                       }) => {
    const [volume, setVolume] = useState(0.5);
    const [currentTime, setCurrentTime] = useState<any>(0);
    const currentTrack = tracks[currentTrackIndex];
    const audioRef = useRef<ReactAudioPlayer | null>(null);

    useEffect(() => {
        setInterval(() => {
            if (audioRef.current && audioRef.current.audioEl.current && isPlaying) {
                setCurrentTime(audioRef.current.audioEl.current.currentTime || 0);
            }
        }, 1000);
    }, [isPlaying]);
    useEffect(() => {
        setTimeout(() => {
            setCurrentTime(0);
        }, 300);
    }, [currentTrack]);
    const playPauseToggle = () => {
        if (audioRef.current && audioRef.current.audioEl.current) {
            if (isPlaying) {
                audioRef.current.audioEl.current.pause();
            } else {
                audioRef.current.audioEl.current.play();
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
            />
            <div className='flex-col w-full'>
                <ControlButtonContainer>
                    <ControlButton onClick={playPreviousTrack}>◄</ControlButton>
                    <ControlButton onClick={playPauseToggle}>
                        {isPlaying ? <i className='bx bx-pause text-3xl'></i> : <i className='bx bx-play text-3xl'></i>}
                    </ControlButton>
                    <ControlButton onClick={playNextTrack}>►</ControlButton>
                </ControlButtonContainer>
                <SliderContainer>
                    <div>
                        {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(0).padStart(2, '0')}
                        {' / '}
                        <span>1:30</span>
                    </div>
                    <SliderTime
                        type="range"
                        min={0}
                        max={audioRef.current?.audioEl.current?.duration || 0}
                        step={1}
                        value={currentTime ? currentTime : 0}
                        onChange={(e) => handleTimeChange(Number(e.target.value))}
                    />
                </SliderContainer>
            </div>
            <SliderContainer>
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
