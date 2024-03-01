import styled from "styled-components";

interface ScrollableContainerProps {
  height?: number;
}

export const ScrollableContainer = styled.div<ScrollableContainerProps>`
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  max-height: ${(props) => (props.height ? props.height + "vh" : "none")};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;
