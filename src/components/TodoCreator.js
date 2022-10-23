import React, { useRef } from "react";

import styled from "styled-components";

import { useSetRecoilState } from "recoil";
import { todoAtom } from "../atoms";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Form = styled.form`
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

const Input = styled.input`
  margin-left: 15px;
`;

function TodoCreator({ categoryId }) {
  const setTodos = useSetRecoilState(todoAtom);
  const inputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;
    if (value === "") return;
    const newTodo = {
      categoryId,
      id: Date.now(),
      value,
      isDone: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  return (
    <Form onSubmit={onSubmit}>
      <FontAwesomeIcon icon={faPlus} />
      <Input type="text" ref={inputRef} placeholder="Add Todo" />
    </Form>
  );
}

export default TodoCreator;
