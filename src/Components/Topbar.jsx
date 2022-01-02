import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Logout } from "@mui/icons-material";

// navbar
const Navbar = styled.div`
  background: transparent;
  position: fixed;
  top: 0;
  width: 100%;
  color: #fff;
  z-index: 999;
  transition: all .3s ease;
`;
const Wrapper = styled.div`
  padding: ${props=>props.sy >= 300 ? "20px 60px" : "30px 60px"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 820px) {
    padding: ${props=>props.sy >= 300 ? "20px 30px" : "30px 30px"};
  }
  @media screen and (max-width: 400px) {
    padding: ${props=>props.sy >= 300 ? "20px 15px" : "30px 15px"};
  }
`;
const Upload = styled.span``;
const Logo = styled.span`
  font-size: 20px;
`;
const Username = styled.span`
margin-right: 10px;
`;
const Right = styled.div`
display: flex;
align-items: center;
`;
const Login = styled.span`
font-weight: 600;
font-size: 17px;
`;

const Topbar = ({user,message}) => {
    const [offset, setOffset] = useState(window.pageYOffset);
  window.onscroll = () => {
    setOffset(window.pageYOffset);
  };

  // logout
  const handleLogout = () =>{
    localStorage.removeItem("student")
    window.location.reload();
  }
    return (
            <Navbar style={{
        background: offset >= 300 ? "#fff" : "none",
        boxShadow:
          offset > 300
            ? "0px 12px 31px -25px rgba(0,0,0,1)"
            : "0 0 0px 0px #000",
      }}>
        <Wrapper sy={offset}>
          <Link to="/" style={{ textDecoration: "none", color: offset >= 300 ? "#000" : "#fff" }}>
            <Logo>
              <b>Apni</b>Class
            </Logo>
          </Link>
          <Right>
          {user?.isAdmin && (
            <Link to="/upload" style={{ textDecoration: "none",marginRight: "5px" , color: offset >= 300 ? "#000" : "#fff"}}>
              <Upload>UPLOAD</Upload>
            </Link>
          )}
          {user ? (
            <>
          <Username style={{color: offset >= 300 ? "#000" : "#fff"}}>
            Hi!{" "}
            <span style={{ color: "#fca311" , fontWeight: "bold" }}>
              {user?.username}
            </span>
          </Username>
          <Logout onClick={handleLogout} style={{cursor: "pointer", color: offset >= 300 ? "#000" : "#fff"}}/>
          </>
          )
          :
          <Link to="/login" style={{ textDecoration: "none",marginRight: "5px" , color: offset >= 300 ? "#000" : "#fff"}}>
          <Login>{message}</Login>
          </Link>
          }
          </Right>
        </Wrapper>
      </Navbar>
    )
}

export default Topbar
