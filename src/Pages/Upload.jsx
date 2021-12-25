import { Menu } from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  LinearProgress,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

const Container = styled.div`
  width: 90%;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Category = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 17px;
`;
const File = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 300px;
  background: #fff;
  border: 1px solid #aaa;
`;
const Submit = styled.button`
  margin: 10px 0;
  padding: 12px;
  flex: 1;
  border: none;
  background: #003566;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
`;
const Label = styled.span`
  margin: 5px;
`;

const Upload = ({user}) => {
  const [subject, setSubject] = useState("");
  const [stype, setStype] = useState("");
  const [file_name, setFile_name] = useState("");
  const [file, setFile] = useState(null);
  const [progressNo, setProgressNo] = useState(0);
  const navigate = useNavigate()
  const [alertMess, setAlertMess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        setProgressNo(progress);
        // switch (snapshot.state) {
        //   case "paused":
        //     console.log("Upload is paused");
        //     break;
        //   case "running":
        //     console.log("Upload is running");
        //     break;
        //   default:
        // }
      },
      (error) => {
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          postFile(downloadURL);
          setAlertMess("File uploaded successfully!");
        });
      }
    );
  };
  const postFile = async (downloadURL) => {
    await axios.post("https://apniclass.herokuapp.com/api/files/", {
      subject: subject,
      stype: stype,
      fileName: file_name,
      fileLink: downloadURL,
    });

    navigate("/")
  };
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
          </Typography>
          <Typography variant="span" component="div"  color="inherit">{user.username}</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Form>
          <Label>File Name</Label>
          <Category
            type="text"
            placeholder="File Name"
            onChange={(e) => setFile_name(e.target.value)}
          />
          <Label>Subject</Label>
          <FormControl
            style={{
              backgroundColor: "#fff",
              width: "130px",
              marginRight: "20px",
            }}
          >
            <InputLabel id="demo-simple-select-label">All</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={subject}
              label="Age"
              onChange={(e) => setSubject(e.target.value)}
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
          <Label>Subject</Label>
          <FormControl
            style={{
              backgroundColor: "#fff",
              width: "130px",
              marginRight: "20px",
            }}
          >
            <InputLabel id="demo-simple-select-label">All</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={stype}
              label="Age"
              onChange={(e) => setStype(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="notes">Notes</MenuItem>
              <MenuItem value="assignment">Assignment</MenuItem>
              <MenuItem value="practical">Practical</MenuItem>
            </Select>
          </FormControl>
          <Label>File</Label>
          <File type="file" onChange={(e) => setFile(e.target.files[0])} />
          <Submit onClick={handleSubmit}>Upload</Submit>
          <LinearProgress variant="determinate" value={progressNo} />
          {alertMess && (
        <Alert severity="success" style={{ marginTop: "10px" }}>
          {alertMess}
        </Alert>
      )}
        </Form>
      </Container>
    </>
  );
};

export default Upload;
