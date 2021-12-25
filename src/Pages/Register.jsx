// import axios from "axios";
// import { useRef } from "react";
// import { useNavigate } from "react-router";
import { Alert } from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  max-width: 350px;
  margin: 0 auto;
`;
const Logo = styled.span`
  font-size: 35px;
  font-weight: 700;
  color: #003566;
  margin-bottom: 20px;
  font-family: "Alata", sans-serif;
`;
const Form = styled.form`
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  @media screen and (max-width: 400px) {
    width: 90%;
  }
  box-shadow: 0px 3px 28px 0px rgba(160, 160, 160, 0.56);
  -webkit-box-shadow: 0px 3px 28px 0px rgba(160, 160, 160, 0.56);
  -moz-box-shadow: 0px 3px 28px 0px rgba(160, 160, 160, 0.56);
  input {
    padding: 10px;
    font-size: 15px;
    outline: none;
    border: 1px solid #ddd;
    border-radius: 5px;
    flex: 1;
    margin: 10px 0;
  }
`;
const Username = styled.input``;
const Password = styled.input``;
const CPassword = styled.input``;
const Submit = styled.button`
  padding: 10px;
  font-size: 15px;
  outline: none;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #003566;
  color: #fff;
  margin-top: 10px;
  cursor: pointer;
`;
const Option = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  margin: 10px 0 0 1px;
`;
const Button = styled.span`
  color: #0d6cfb;
  margin-left: 5px;
`;

const Register = () => {
  const navigate = useNavigate()
  const username = useRef()
  const password = useRef()
  const cpassword = useRef()
  const [alertMess, setAlertMess] = useState(null)
  const handleSubmit = async(e) =>{
      e.preventDefault();
      if(password.current.value===cpassword.current.value){
      const user = {
        username: username.current.value,
        password: password.current.value,
      }
      try {
        await axios.post("http://localhost:5000/api/users/register", user)
        navigate("/login")
      } catch (error) {
        console.log(error)
      }
    }else{
      setAlertMess("Password dont't match!")
    }
  }
  return (
    <Container>
      <Logo><b>Apni</b>class</Logo>
      <Form onSubmit={handleSubmit}>
        <Username type="text" placeholder="Username" ref={username}/>
        <Password
          type="password"
          placeholder="Password (at least 6 character)"
          ref={password}
        />
        <CPassword type="password" placeholder="Confirm Password" ref={cpassword}/>
        <Submit type="submit">Create Account</Submit>
        <Option>
          Already have an account? <Link to="/login" style={{textDecoration: "none"}}><Button>Sign in</Button></Link>
        </Option>
      </Form>
      {alertMess &&
      <Alert severity="warning" style={{marginTop: "10px"}}>{alertMess}</Alert>
}
    </Container>
  );
};

export default Register;
