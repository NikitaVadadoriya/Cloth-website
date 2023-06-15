import styled from "styled-components";

const Container = styled.div`
  height: 50px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 500;
`;

const Announcement = () => {
  return <Container>
    <marquee>Super Deal! Free Shipping on Orders Over $50 </marquee> </Container>;
};

export default Announcement;
