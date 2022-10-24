import React from "react";
import styled from "styled-components";

import { useMatch } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { categoryAtom, sortedTodoAtom, sortAtom } from "../atoms";

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

const Sort = styled.select`
  width: 100px;
  margin-left: auto;
  border: none;
  font-family: inherit;
  color: inherit;
`;

const List = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 20px;
`;

function TodoContainer() {
  const categories = useRecoilValue(categoryAtom);
  const sortedTodos = useRecoilValue(sortedTodoAtom);
  const [sort, setSort] = useRecoilState(sortAtom);

  const urlMatch = useMatch("/:id");
  const categoryId = urlMatch?.params.id;
  const categoryMatch =
    categoryId &&
    categories.find((category) => String(category.id) === categoryId);

  const todosMatch =
    categoryMatch &&
    sortedTodos.filter(
      (todo) => String(todo.categoryId) === String(categoryMatch.id)
    );

  const handleSort = (e) => {
    setSort(e.target.value);
  };

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
      <Sort value={sort} onChange={handleSort}>
        <option value="old">오래된순</option>
        <option value="new">최신순</option>
        <option value="asc">가나다순</option>
        <option value="desc">가나다 역순</option>
      </Sort>
      <List>
        {todosMatch.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </List>
    </Wrapper>
  );
}

export default TodoContainer;
