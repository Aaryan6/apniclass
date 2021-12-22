import styled from "styled-components";

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
position: sticky;
bottom: 0;
left: 0;
background: #000814;
color: #fff;
padding: 15px 0;
`
const Uptext = styled.span`
margin: 0 0 5px;
`
const Downtext = styled.span`
`
const Footer = () => {
    return (
        <Container>
            <Uptext>Created by Aaryan Patel.</Uptext>
            <Downtext>Copyright &copy; <b>Apni</b>class 2021.</Downtext>
        </Container>
    )
}

export default Footer
