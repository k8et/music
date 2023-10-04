import styled from "styled-components";

export const PlayerContainer = styled.div`
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

export const TrackInfo = styled.div`
  padding: 5px 0 0 20px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 500px;
`;

export const ControlButton = styled.button`
  color: #fff;
  cursor: pointer;
  font-size: 24px;
  margin: 0 8px;
  transition:
    background-color 0.3s,
    border-color 0.3s,
    color 0.3s;
`;

export const ControlButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SliderContainer = styled.div`
  display: flex;
  width: 300px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: #fff;
`;

export const SliderTime = styled.input`
  width: 90%;
  height: 5px;
  margin-top: 8px;
`;

export const SliderVol = styled.input`
  width: 100px;
  height: 5px;
`;
export const TimeInfoContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 3px;
  justify-content: center;
  color: #fff;
`;
export const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
`;
