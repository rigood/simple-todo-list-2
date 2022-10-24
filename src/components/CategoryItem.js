import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";

import { useMatch, useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { categoryAtom, todoAtom } from "../recoil";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCheck, faEllipsis } from "@fortawesome/free-solid-svg-icons";

import Modal from "./Modal";

export const Button = styled(FontAwesomeIcon)`
  display: none;
  cursor: pointer;
`;

export const Form = styled.form`
  display: flex;
  position: relative;
  margin-bottom: 10px;
  margin-right: 10px;
  padding: 10px;
  padding-right: 15px;
  border-radius: 5px;
  opacity: 0.8;
  ${(props) =>
    !props.isEditing &&
    css`
      &:hover {
        opacity: 1;
        background-color: ${(props) => props.theme.hoverBgColor};
      }
      &:hover ${Button} {
        display: block;
      }
    `}
  ${(props) =>
    props.isEditing &&
    css`
      ${Button} {
        display: block;
      }
    `}
`;

export const Input = styled.input`
  flex: 1;
  margin-left: 15px;
  margin-right: 10px;
  border-bottom: ${(props) => (props.isEditing ? "1px solid lightgray" : null)};
  text-decoration: ${(props) => (props.isDone ? "line-through" : null)};
  opacity: ${(props) => (props.isDone ? 0.5 : 1)};
`;

function CategoryItem({ category: { id, value } }) {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [offset, setOffset] = useState({});

  const editRef = useRef();
  const [input, setInput] = useState(value);
  const [categories, setCategories] = useRecoilState(categoryAtom);
  const [todos, setTodos] = useRecoilState(todoAtom);

  const navigate = useNavigate();
  const handleFormClick = () => {
    navigate(`/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedCategories = categories.map((category) => ({
      ...category,
      value: category.id === id ? input : category.value,
    }));
    setCategories(editedCategories);
    setIsEditing(false);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleDelete = () => {
    const newCategories = categories.filter((category) => category.id !== id);
    setCategories(newCategories);
    const newTodos = todos.filter((todo) => todo.categoryId !== id);
    setTodos(newTodos);
    setIsDeleting(false);
    navigate("/");
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
    <Form
      onSubmit={handleSubmit}
      onClick={handleFormClick}
      isEditing={isEditing}
    >
      <FontAwesomeIcon icon={faBars} />
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

export default CategoryItem;
