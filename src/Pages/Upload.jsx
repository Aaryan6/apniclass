import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  LinearProgress,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
const Type = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 300px;
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
`;
const Label = styled.span`
  margin: 5px;
`;

const Upload = () => {
  const [subject, setSubject] = useState("");
  const [stype, setStype] = useState("");
  const [file_name, setFile_name] = useState("");
  const [file, setFile] = useState(null);
  const [progressNo, setProgressNo] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgressNo(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          postFile(downloadURL);
        });
      }
    );
  };
  const postFile = async (downloadURL) => {
    await axios.post("/api/", {
      subject: subject,
      stype: stype,
      fileName: file_name,
      fileLink: downloadURL,
    });
    console.log(downloadURL + " hi");
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
          <Button color="inherit">Login</Button>
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
          <Category
            type="text"
            placeholder="Subject"
            onChange={(e) => setSubject(e.target.value)}
          />
          <Label>Type</Label>
          <Type
            type="text"
            placeholder="Category"
            onChange={(e) => setStype(e.target.value)}
          />
          <Label>File</Label>
          <File type="file" onChange={(e) => setFile(e.target.files[0])} />
          <Submit onClick={handleSubmit}>Upload</Submit>
          <LinearProgress variant="determinate" value={progressNo} />
        </Form>
      </Container>
    </>
  );
};

export default Upload;
