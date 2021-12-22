import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Menu, Search } from "@mui/icons-material";
import styled from "styled-components";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import CardBox from "../Components/CardBox";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../Components/Footer";

const Container = styled.div`
  width: 90%;
  margin: 20px auto;
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
  font-size: 1rem;
  padding-left: 10px;
  color: #001d3d;
`;
const FilterBox = styled.div``;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 20px;
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
const Home = () => {
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
      const res = await axios.get("/api/");
      setFiles(res.data);
    };
    getfiles();
  }, []);
  console.log(files);

  return (
    <>
      <AppBar position="static" style={{ background: "#003566" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
              ApniClass
            </Link>
            <Link to="/upload" style={{ textDecoration: "none", color: "#fff" }}>
              Upload
            </Link>
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
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
              width: "100px",
              marginRight: "20px",
              border: "1px solid #aaa",
            }}
          >
            <InputLabel id="demo-simple-select-label">All</InputLabel>
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
            </Select>
          </FormControl>
          <FormControl
            style={{
              backgroundColor: "#fff",
              width: "100px",
              border: "1px solid #aaa",
            }}
          >
            <InputLabel id="demo-simple-select-label">All</InputLabel>
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
              } else if (file.subject === subject && file.stype === type && searchItem === "") {
                return file;
              } else if (subject === "" && file.stype === type && searchItem === "") {
                return file;
              } else if (file.subject === subject && type === "" && searchItem === "") {
                return file;
              } else if (
                file.fileName.toLowerCase().includes(searchItem.toLowerCase())
                && subject === "" && type === ""
              ) {
                return file;
              }
            })
            .map((file) => (<CardBox file={file} key={file._id} />)
            )}
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
