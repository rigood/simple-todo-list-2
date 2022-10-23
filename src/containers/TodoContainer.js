import React from "react";
import styled from "styled-components";

import { useMatch } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { categoryAtom, todoAtom } from "../atoms";

import TodoCreator from "../components/TodoCreator";
import TodoItem from "../components/TodoItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 50px;
`;

const Header = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;

const List = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 20px;
`;

function TodoContainer() {
  const categories = useRecoilValue(categoryAtom);
  const todos = useRecoilValue(todoAtom);

  const urlMatch = useMatch("/:id");
  const categoryId = urlMatch?.params.id;
  const categoryMatch =
    categoryId &&
    categories.find((category) => String(category.id) === categoryId);

  const todosMatch =
    categoryMatch &&
    todos.filter(
      (todo) => String(todo.categoryId) === String(categoryMatch.id)
    );

  if (!categoryMatch) {
    return (
      <Wrapper>
        <h1>존재하지 않는 카테고리입니다.</h1>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Header> {categoryMatch.value}</Header>
      <TodoCreator categoryId={categoryMatch.id} />
      <List>
        {todosMatch.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </List>
    </Wrapper>
  );
}

export default TodoContainer;
