import React from "react";
import styled from "styled-components";
import { FaSun, FaMoon } from "react-icons/fa";

const ToggleButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonColor};
  border: none;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.5;
  }
`;


function ThemeToggle({ toggleTheme, isDarkTheme }) {
  return (
    <ToggleButton onClick={toggleTheme}>
      {isDarkTheme ? <FaSun /> : <FaMoon />}
    </ToggleButton>
  );
}

export default ThemeToggle;


