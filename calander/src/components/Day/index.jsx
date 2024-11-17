import styled from "styled-components";

const List = styled.li`
  border: 1px solid gray;
  border-top: none;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  width: 100%;
  color: ${({ $dayType }) =>
    $dayType === "curMonthDay" ? "black" : "#606060"};
  background-color: ${({ $selected }) =>
    $selected ? "skyblue" : "transparent"};
  &:nth-child(7n + 1) {
    border-left: 1px solid gray;
  }

  > button {
    padding: 15px 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

export default function CalanderDay({
  dayType = null,
  day,
  dayClick,
  selectedDay = null,
}) {
  return (
    <List
      $dayType={dayType}
      $selected={dayType === "curMonthDay" && day === selectedDay}
    >
      <button type="button" onClick={dayClick}>
        {day}
      </button>
    </List>
  );
}
