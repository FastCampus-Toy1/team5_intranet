import { styled } from "styled-components";

export default function Search({handleSearch}) {

  function setSearchKeyword(keyword) {
    handleSearch(keyword);
  }

  return (
    <SearchInput placeholder="검색" onChange={(e) => setSearchKeyword(e.target.value)} />
  );
}

const SearchInput = styled.input`
  width: 250px;
  height: 30px;
  margin-top: 2px;
  margin-right: 20px;
`;
