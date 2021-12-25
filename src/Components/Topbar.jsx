import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
`;

const Topbar = ({user}) => {
    const [offset, setOffset] = useState(window.pageYOffset);
  window.onscroll = () => {
    setOffset(window.pageYOffset);
  };
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
          {user.isAdmin && (
            <Link to="/upload" style={{ textDecoration: "none", color: offset >= 300 ? "#000" : "#fff"}}>
              <Upload>UPLOAD</Upload>
            </Link>
          )}
          <Username style={{color: offset >= 300 ? "#000" : "#fff"}}>
            Hi!{" "}
            <span style={{ color: "#fca311" , fontWeight: "bold" }}>
              {user.username}
            </span>
          </Username>
        </Wrapper>
      </Navbar>
    )
}

export default Topbar
