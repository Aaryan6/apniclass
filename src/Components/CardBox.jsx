import { Typography } from "@mui/material";
import axios from "axios";
import styled from "styled-components";

const Card = styled.div`
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
const ActionsButton = styled.div`
  display: flex;
  align-items: center;
  button {
    background: #e42807;
  }
  a {
    width: 100%;
    margin-left: 5px;
    button {
      background: #2287ec;
    }
  }
`;
const CardBox = ({ file, user }) => {
  const handleClick = async (fileId) => {
    try {
      await axios.delete(`https://apniclass.herokuapp.com/api/files/${fileId}`);
      console.log("Deleted file");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

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
        {file.openUrl && (
          <a
            href={file.openUrl}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button>Open</Button>
          </a>
        )}
        <a
          href={file.fileLink}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button>Download</Button>
        </a>
{user?.isAdmin &&
        <ActionsButton>
          <Button onClick={() => handleClick(file._id)}>Delete</Button>
          <Button style={{ marginLeft: "5px" }}>Edit</Button>
        </ActionsButton>
 }
      </Footer>
    </Card>
  );
};

export default CardBox;
