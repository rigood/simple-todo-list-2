import React from "react";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const Button = styled.div`
  width: 50px;
  height: 50px;
  position: fixed;
  top: 30px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: ${(props) => props.theme.btnColor};
  &:hover {
    background-color: ${(props) => props.theme.btnHoverBgColor};
    cursor: pointer;
  }
`;

function DarkModeButton() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleButton = () => setIsDark((prev) => !prev);

  return (
    <>
      <Button isDark={isDark} onClick={toggleButton}>
        <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
      </Button>
    </>
  );
}

export default DarkModeButton;
