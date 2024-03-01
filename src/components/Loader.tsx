import { BarWave } from "react-cssfx-loading";
import styled from "styled-components";

const LoaderContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <BarWave color="rgba(32, 6, 45, 0.8)" />
    </LoaderContainer>
  );
};

export default Loader;
