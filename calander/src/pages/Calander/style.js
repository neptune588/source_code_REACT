import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1440px;
  height: 100vh;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CalanderBox = styled.div`
  width: 49%;
`;

const CurDateBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  user-select: none;
  margin-bottom: 10px;
  > div {
    &:nth-child(2) {
      display: flex;
      font-size: 1.8rem;
    }
  }
`;

const ArrowBox = styled.div`
  > svg {
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const DaysOfWeekBox = styled.ul`
  display: flex;
  width: 100%;
  border-top: 2px solid darkgray;
  border-bottom: 2px solid darkgray;
  padding: 10px 0;
  > li {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 1.2rem;
    width: 100%;
  }
`;

const DaysBox = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
`;

const SelectedDateBox = styled.div`
  width: 49%;
`;

export {
  Container,
  Wrapper,
  CalanderBox,
  CurDateBox,
  ArrowBox,
  DaysOfWeekBox,
  DaysBox,
  SelectedDateBox,
};
