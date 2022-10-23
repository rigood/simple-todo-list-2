import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { todoAtom } from "../atoms";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEllipsis,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

import { Button, Form, Input } from "./CategoryItem";
import Modal from "./Modal";

const Checkbox = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

function TodoItem({ todo: { id, value, isDone } }) {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [offset, setOffset] = useState({});

  const editRef = useRef();
  const [input, setInput] = useState(value);
  const [todos, setTodos] = useRecoilState(todoAtom);

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedTodos = todos.map((todo) => ({
      ...todo,
      value: todo.id === id ? input : todo.value,
    }));
    setTodos(editedTodos);
    setIsEditing(false);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleDelete = () => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    setIsDeleting(false);
  };

  const handleCheckbox = () => {
    const editedTodos = todos.map((todo) => ({
      ...todo,
      isDone: todo.id === id ? !todo.isDone : todo.isDone,
    }));
    setTodos(editedTodos);
  };

  useEffect(() => {
    if (isEditing) {
      editRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (isDeleting) {
      handleDelete();
    }
  }, [isDeleting]);

  const openDropdown = (e) => {
    e.stopPropagation();
    const coords = e.target.getBoundingClientRect();
    const x = coords.x;
    const y = coords.y;
    setOffset({ x, y });
    setisModalOpen((prev) => !prev);
  };

  return (
    <Form onSubmit={handleSubmit} isEditing={isEditing}>
      <Checkbox
        icon={isDone ? faSquareCheck : faSquare}
        onClick={handleCheckbox}
      />
      {isEditing ? (
        <Input
          type="text"
          value={input}
          ref={editRef}
          onChange={handleInput}
          isEditing={isEditing}
        />
      ) : (
        <Input
          type="text"
          disabled
          value={input}
          ref={editRef}
          onChange={handleInput}
          isDone={isDone}
        />
      )}
      {isEditing ? (
        <Button icon={faCheck} onClick={handleSubmit} />
      ) : (
        <Button icon={faEllipsis} onClick={openDropdown} />
      )}
      {isModalOpen ? (
        <Modal
          offset={offset}
          setisModalOpen={setisModalOpen}
          setIsEditing={setIsEditing}
          setIsDeleting={setIsDeleting}
        />
      ) : null}
    </Form>
  );
}

export default TodoItem;
