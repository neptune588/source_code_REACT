import { useState, useEffect } from "react";
import uuid from "react-uuid";

import CalanderDay from "@/components/Day";

import {
  Container,
  Wrapper,
  CalanderBox,
  CurDateBox,
  DaysOfWeekBox,
  DaysBox,
  SelectedDateBox,
} from "@/pages/Calander/style";

import { daysOfWeek, getCurrentDate } from "@/pages/Calander/mockData";

//전체 캘린더 칸수: 42칸

//저번달:
//이번달이 시작하는 요일의 인덱스 미만까지 렌더링
//ex: 화요일시작 -> index 2 -> 저번달은 0, 1인덱스까지만 렌더링

//이번달:
//시작 요일(숫자) 부터 말일(MAX DAY)까지 렌더링

//다음달:
//총 칸수 - 저번달 length + 이번달 length 만큼 렌더링

//총 3개로 분리
//렌더링 될 state
//계산 된 state
//선택 된 state

//year, month, days가 선택되면 실행될 함수
//고려해야 할것

//prev 저번달로 넘어갈때 년수가 까이는지
//current month가 0인 상태에서 prevDays나 prevMonthArrow누르면 year - 1

//next 다음달로 넘어갈때 년수가 증가되는지
//current month가 11인 상태에서 prevDays나 prevMonthArrow누르면 year + 1

export default function Calander() {
  const calanderMaxCell = 7 * 6;

  const [renderDays, setRenderDays] = useState({
    prevDays: [],
    curDays: [],
    nextDays: [],
  });
  const [selectedDate, setSelectedDate] = useState(() => {
    const { currentYear, currentMonth, currentDay } = getCurrentDate();

    return {
      selectedYear: currentYear,
      selectedMonth: currentMonth,
      selectedDay: currentDay,
    };
  });
  const [weekDays] = useState(daysOfWeek);

  //첫 렌더링 될때 필요한 로직

  const calcDays = ({ year, month }) => {
    const prevMonthLastDay = new Date(year, month - 1, 0).getDate();
    const curMonthStartWeekDay = new Date(year, month, 1).getDay();
    const curMonthTotalDay = new Date(year, month + 1, 0).getDate();

    const prevMonthLastRenderDays = Array.from(
      { length: curMonthStartWeekDay },
      (_, index) => {
        const remainIndex =
          curMonthStartWeekDay === 0 ? 0 : curMonthStartWeekDay - 1;
        const day = prevMonthLastDay - remainIndex + index;
        return day;
      }
    );
    const curMonthTotalRenderDays = Array.from(
      { length: curMonthTotalDay },
      (_, index) => {
        const day = index + 1;
        return day;
      }
    );
    const nextMonthTotalRenderDays = Array.from(
      {
        length: calanderMaxCell - (curMonthStartWeekDay + curMonthTotalDay),
      },
      (_, index) => {
        const day = index + 1;
        return day;
      }
    );

    setRenderDays({
      prevDays: prevMonthLastRenderDays,
      curDays: curMonthTotalRenderDays,
      nextDays: nextMonthTotalRenderDays,
    });
  };

  const handlePrevMonthDaysClick = (selectDay) => {
    const curYear = selectedDate.selectedYear;
    const curMonth = selectedDate.selectedMonth;

    const year = curMonth === 0 ? curYear - 1 : curYear;
    const month = curMonth === 0 ? 11 : curMonth - 1;

    setSelectedDate({
      selectedYear: year,
      selectedMonth: month,
      selectedDay: selectDay,
    });
    calcDays({ year, month });
  };

  const handleCurrentMonthDaysClick = (selectDay) => {
    setSelectedDate((prev) => {
      return {
        ...prev,
        selectedDay: selectDay,
      };
    });
  };
  const handleNextMonthDaysClick = (selectDay) => {
    const curYear = selectedDate.selectedYear;
    const curMonth = selectedDate.selectedMonth;

    const year = curMonth === 11 ? curYear + 1 : curYear;
    const month = curMonth === 11 ? 0 : curMonth + 1;

    setSelectedDate({
      selectedYear: year,
      selectedMonth: month,
      selectedDay: selectDay,
    });
    calcDays({ year, month });
  };

  useEffect(() => {
    const { currentYear, currentMonth } = getCurrentDate();
    calcDays({ year: currentYear, month: currentMonth });
  }, []);

  return (
    <Container>
      <Wrapper>
        <CalanderBox>
          <CurDateBox>
            <p>{`${selectedDate.selectedYear}.`}</p>
            <p>{`${selectedDate.selectedMonth + 1}.`}</p>
            <p>{`${selectedDate.selectedDay}`}</p>
          </CurDateBox>
          <DaysOfWeekBox>
            {weekDays.map((day) => {
              return <li key={uuid()}>{day}</li>;
            })}
          </DaysOfWeekBox>
          <DaysBox>
            {renderDays.prevDays.map((day) => {
              return (
                <CalanderDay
                  key={uuid()}
                  day={day}
                  dayClick={() => {
                    handlePrevMonthDaysClick(day);
                  }}
                />
              );
            })}
            {renderDays.curDays.map((day) => {
              return (
                <CalanderDay
                  key={uuid()}
                  dayType={"curMonthDay"}
                  day={day}
                  selectedDay={selectedDate.selectedDay}
                  dayClick={() => {
                    handleCurrentMonthDaysClick(day);
                  }}
                />
              );
            })}
            {renderDays.nextDays.map((day) => {
              return (
                <CalanderDay
                  key={uuid()}
                  day={day}
                  dayClick={() => {
                    handleNextMonthDaysClick(day);
                  }}
                />
              );
            })}
          </DaysBox>
        </CalanderBox>
        <SelectedDateBox>selectedDate</SelectedDateBox>
      </Wrapper>
    </Container>
  );
}
