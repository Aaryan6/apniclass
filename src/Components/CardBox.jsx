import { Typography } from "@mui/material";
import styled from "styled-components";

const Card = styled.div`
  /* max-width: 300px; */
  min-width: 250px;
  margin: 20px auto;
  @media screen and (max-width: 400px) {
    min-width: 250px;
    margin: 0 auto;
  }
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const Image = styled.div`
  height: 150px;
  background-image: url("/assets/pdflogo.png");
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
`;
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  border-top: 1px solid #ddd;
`;
const Button = styled.button`
  background: #003566;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  justify-self: end;
  width: 100%;
  height: 40px;
  font-size: 16px;
  border: none;
  margin-top: 10px;
  border-radius: 5px;
`;
const CardBox = ({ file }) => {
  return (
    <Card>
      <a
        href={file.fileLink}
        style={{ textDecoration: "none", color: "inherit" }}
        
      >
        <Image></Image>
      </a>
      <Footer>
        <Typography variant="subtext" component="span" sx={{ flexGrow: 1 }}>
          {file.fileName}
        </Typography>
        <a
          href={file.fileLink}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button>Download</Button>
        </a>
      </Footer>
    </Card>
  );
};

export default CardBox;
