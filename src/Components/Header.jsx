import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("/assets/bg.jpg");
  background-size: cover;
  background-position: center center;
  position: fixed;
  top: 0;
  width: 100%;
`;

// content
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  max-width: 800px;
  margin: 0 auto;
  padding-top: 250px;
  @media screen and (max-width: 820px) {
    margin: 0 20px;
  }
`;
const Heading = styled.span`
@media screen and (max-width: 820px) {
  font-size: 3rem;
  }
  font-size: 4rem;
  b {
    font-family: "Alata", sans-serif;
  }
`;
const Desc = styled.span`
  margin-top: 5px;
`;
const Header = () => {
  return (
    <Container>
      <Content>
        <Heading>
          Welcome to <b style={{ color: "#fca311" }}>Apniclass</b>
        </Heading>
        <Desc>
          Here you can easily find your class Notes, Assignment and Practicals.
        </Desc>
      </Content>
    </Container>
  );
};

export default Header;
