import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Search } from "@mui/icons-material";
import CardBox from "./CardBox"

const Container = styled.div`
  width: 80%;
  margin: 600px auto 0;
  background: #fff;
  position: relative;
  padding: 40px;
  border-radius: 40px 40px 0 0;
  z-index: 2;
`;
const SearchBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  border: 1px solid #aaa;
  padding: 20px;
  background: #fff;
  border-radius: 50px;
  margin-bottom: 20px;
  svg {
    color: #ffc300;
    font-size: 28px;
  }
`;
const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.1rem;
  padding-left: 10px;
  color: #001d3d;
`;
const FilterBox = styled.div``;
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 30px 0;
  @media screen and (max-width: 900px) {
    grid-template-columns: auto auto auto;
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: auto auto;
  }
  @media screen and (max-width: 400px) {
    grid-template-columns: auto;
  }
`;

const Landing = ({user}) => {
  const [files, setFiles] = useState([]);
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const [searchItem, setSearchItem] = useState("");

  const handleSubject = (event) => {
    setSubject(event.target.value);
  };
  const handleType = (event) => {
    setType(event.target.value);
  };

  // get files
  useEffect(() => {
    const getfiles = async () => {
      const res = await axios.get("https://apniclass.herokuapp.com/api/files/");
      setFiles(res.data);
    };
    getfiles();
  }, []);

  return (
    <>
      <Container>
        <SearchBox>
          <Search />
          <SearchInput
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchItem(e.target.value)}
          />
        </SearchBox>
        <FilterBox>
          <FormControl
            style={{
              backgroundColor: "#fff",
              width: "130px",
              marginRight: "20px",
            }}
          >
            <InputLabel id="demo-simple-select-label">Subject</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={subject}
              label="Age"
              onChange={handleSubject}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="physics">Physics</MenuItem>
              <MenuItem value="civil">Civil</MenuItem>
              <MenuItem value="mechanical">Mechanical</MenuItem>
              <MenuItem value="computer">Computer</MenuItem>
              <MenuItem value="maths">Maths</MenuItem>
              <MenuItem value="language">Language Lab</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            style={{
              backgroundColor: "#fff",
              width: "130px",
            }}
          >
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Age"
              onChange={handleType}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="notes">Notes</MenuItem>
              <MenuItem value="assignment">Assignment</MenuItem>
              <MenuItem value="practical">Practical</MenuItem>
            </Select>
          </FormControl>
        </FilterBox>
        <Wrapper>
          {files
            .filter((file) => {
              if (subject === "" && type === "" && searchItem === "") {
                return file;
              } else if (
                file.subject === subject &&
                file.stype === type &&
                searchItem === ""
              ) {
                return file;
              } else if (
                subject === "" &&
                file.stype === type &&
                searchItem === ""
              ) {
                return file;
              } else if (
                file.subject === subject &&
                type === "" &&
                searchItem === ""
              ) {
                return file;
              } else if (
                file.fileName
                  .toLowerCase()
                  .includes(searchItem.toLowerCase()) &&
                subject === "" &&
                type === ""
              ) {
                return file;
              }
            })
            .map((file) => (
              <CardBox file={file} key={file._id} user={user}/>
            ))}
        </Wrapper>
      </Container>
    </>
  );
};

export default Landing;
