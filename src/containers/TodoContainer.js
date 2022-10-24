import React from "react";
import styled from "styled-components";

import { useMatch } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  categoryAtom,
  filteredTodoSelector,
  sortAtom,
  filterAtom,
} from "../recoil";

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

const Controller = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Filter = styled.button.attrs({ type: "button" })`
  padding: 8px 16px;
  margin-right: 10px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.name === props.filter ? props.theme.hoverBgColor : null};
  font-size: 14px;
  cursor: pointer;
`;

const Sort = styled.select`
  width: 100px;
  margin-left: auto;
  border: none;
  outline: none;
  font-size: 14px;
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
  const filteredTodos = useRecoilValue(filteredTodoSelector);
  const [sort, setSort] = useRecoilState(sortAtom);
  const [filter, setFilter] = useRecoilState(filterAtom);

  const urlMatch = useMatch("/:id");
  const categoryId = urlMatch?.params.id;
  const categoryMatch =
    categoryId &&
    categories.find((category) => String(category.id) === categoryId);

  const todosMatch =
    categoryMatch &&
    filteredTodos.filter(
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

  const handleFilter = (e) => {
    setFilter(e.target.name);
  };

  return (
    <Wrapper>
      <Header> {categoryMatch.value}</Header>
      <TodoCreator categoryId={categoryMatch.id} />
      <Controller>
        <Filter name="all" onClick={handleFilter} filter={filter}>
          전체
        </Filter>
        <Filter name="doing" onClick={handleFilter} filter={filter}>
          진행중
        </Filter>
        <Filter name="done" onClick={handleFilter} filter={filter}>
          완료
        </Filter>
        <Sort value={sort} onChange={handleSort}>
          <option value="new">최신순</option>
          <option value="old">오래된순</option>
          <option value="asc">가나다순</option>
          <option value="desc">가나다 역순</option>
        </Sort>
      </Controller>
      <List>
        {todosMatch.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </List>
    </Wrapper>
  );
}

export default TodoContainer;
