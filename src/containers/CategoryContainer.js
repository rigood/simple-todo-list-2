import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { categoryAtom } from "../atoms";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import CategoryItem from "../components/CategoryItem";
import CategoryCreator from "../components/CategoryCreator";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 40px 30px;
`;

const Header = styled.div`
  margin-bottom: 30px;
  padding: 0 10px;
  cursor: pointer;
  span {
    margin-left: 10px;
  }
`;

const List = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
`;

function CategoryContainer() {
  const categories = useRecoilValue(categoryAtom);

  const navigate = useNavigate();
  const clickHome = () => navigate("/");

  return (
    <Wrapper>
      <Header onClick={clickHome}>
        <FontAwesomeIcon icon={faHome} />
        <span>HOME</span>
      </Header>
      <List>
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </List>
      <CategoryCreator />
    </Wrapper>
  );
}

export default CategoryContainer;
