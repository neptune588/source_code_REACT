import styled from "styled-components";

const Notice = styled.h2`
  margin: 100px 0 20px;
  text-align: center;
  font-size: 2rem;
`;

const FlexBox = styled.ul`
  display: flex;
  width: 760px;
  margin: 0 auto;
  justify-content: space-evenly;
  align-items: center;
`;

const TimeBox = styled.li`
  > p {
    text-align: center;
    margin-bottom: 5px;
    font-size: 1.8rem;
    font-weight: bold;
  }
`;

const Time = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  background-color: #434343;
  border-radius: 10px;
  color: white;
  font-size: 2.6rem;
`;

export { Notice, FlexBox, TimeBox, Time };
