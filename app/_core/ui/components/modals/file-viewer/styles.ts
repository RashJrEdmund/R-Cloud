'use client';

import styled from '@emotion/styled';

const StyledEmbedTag = styled.embed`
  min-height: 80vh;
  min-width: min(94vw, 1000px);
  /* max-height: 93vh; */
  display: flex;
  align-items: start;
  justify-content: center;
  margin: 0 auto;

  * {
    background-color: red;
    padding: 5px;
    border: 3px solid red;
    object-fit: fill;
  }

  * {
    margin: 0 auto;
  }
`;

const StyledViewerContainer = styled.div`
  /* position: relative; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;

  .control-left,
  .control-right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    background-color: white;
    transition: 200ms;
    background: linear-gradient(112.1deg, #5d82fa 11.4%, #5d82fa 70.2%);
    opacity: 0;
    cursor: pointer;
    border-radius: 100px;
    transform: translateX(-50%);
  }

  .control-right {
    right: 0;
    left: unset;
    transform: translateX(50%);
  }

  &:hover {
    .control-left,
    .control-right {
      opacity: 0.5;

      &:hover {
        opacity: 1;
      }
    }
  }

  @media only screen and (max-width: 650px) {
    position: relative;
    .control-left,
    .control-right {
      opacity: 0.5;

      &:hover {
        opacity: 1;
      }
    }
  }
`;

export {
  StyledEmbedTag,
  StyledViewerContainer,
};
