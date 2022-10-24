import React, { useRef } from "react";

import styled from "styled-components";

import { useSetRecoilState } from "recoil";
import { categoryAtom } from "../recoil";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const Form = styled.form`
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  opacity: 0.5;
  &:hover,
  &:focus-within {
    opacity: 1;
    background-color: ${(props) => props.theme.hoverBgColor};
  }
`;

export const Input = styled.input`
  margin-left: 15px;
`;

function CategoryCreator() {
  const setCategories = useSetRecoilState(categoryAtom);
  const inputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;
    if (value === "") return;
    const newCategory = {
      id: Date.now(),
      value,
    };
    setCategories((prev) => [...prev, newCategory]);
    inputRef.current.value = "";
  };

  return (
    <Form onSubmit={onSubmit}>
      <FontAwesomeIcon icon={faPlus} />
      <Input type="text" ref={inputRef} placeholder="Add category" />
    </Form>
  );
}

export default CategoryCreator;
