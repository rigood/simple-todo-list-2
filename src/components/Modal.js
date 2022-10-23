import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9998;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Wrapper = styled.div`
  position: fixed;
  top: ${(props) => `${props.offset.y + 20}px`};
  left: ${(props) => `${props.offset.x - 100}px`};
  z-index: 9999;
  overflow: hidden;
  width: 120px;
  height: 80px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  z-index: 9999;
  height: 50%;
  padding-left: 15px;
  span {
    margin-left: 10px;
  }
  &:hover {
    background-color: linen;
  }
`;

function Modal({ offset, setisModalOpen, setIsEditing, setIsDeleting }) {
  const clickOverlay = (e) => {
    e.stopPropagation();
    setisModalOpen((prev) => !prev);
  };

  const clickEdit = () => {
    setIsEditing(true);
    setisModalOpen((prev) => !prev);
  };

  const clickDelete = () => {
    setIsDeleting(true);
    setisModalOpen((prev) => !prev);
  };

  return (
    <>
      <Overlay onClick={clickOverlay} />
      <Wrapper offset={offset}>
        <Menu onClick={clickEdit}>
          <FontAwesomeIcon icon={faPencil} />
          <span>Edit</span>
        </Menu>
        <Menu onClick={clickDelete}>
          <FontAwesomeIcon icon={faTrash} />
          <span>Delete</span>
        </Menu>
      </Wrapper>
    </>
  );
}

export default Modal;
