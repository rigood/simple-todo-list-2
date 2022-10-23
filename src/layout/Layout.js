import React from "react";
import styled from "styled-components";

import DarkModeButton from "../components/DarkModeButton";

const LayoutBlock = styled.div`
  width: 1200px;
  height: 700px;
  display: grid;
  grid-template-columns: 3fr 7fr;
  gap: 20px;
  margin: 0 auto;
  margin-top: 100px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.layoutBgColor};
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
`;

function Layout({ children }) {
  return (
    <LayoutBlock>
      <>
        <DarkModeButton />
        {children}
      </>
    </LayoutBlock>
  );
}

export default Layout;
