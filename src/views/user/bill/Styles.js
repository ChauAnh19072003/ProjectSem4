import styled from 'styled-components';

export const HoverShadow = styled.div`
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.3s ease-in-out;

  &:hover::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    box-shadow:
      20px 20px 20px -20px rgba(0, 0, 0, 0.4),
      -20px -20px 20px -20px rgba(0, 0, 0, 0.1),
      0 0 20px -20px rgba(0, 0, 0, 0.1),
      20px 0 20px -20px rgba(0, 0, 0, 0.5),
      0 20px 20px -20px rgba(0, 0, 0, 0.5);
  }
`;
