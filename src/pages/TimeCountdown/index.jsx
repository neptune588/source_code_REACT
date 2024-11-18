import { useState, useEffect } from "react";

import { Notice, FlexBox, TimeBox, Time } from "@/pages/TimeCountdown/style";
// 2025 02 20 02 00 00
// 2024 11 19 01 03 00

//구현할 형태 day, hour, miuntes, seconds 총 4개로 표기

//년, 월 비교해서 일에 가산하는 형식으로 가야할듯
//setInterval이용해서 매번 newDate()를 호출해서 년도, 월만 일로 환산하면
//되지않을까?

export default function TimeCountdown() {
  const [endTime, setEndTime] = useState(() => {
    const date = new Date("2025-02-20 02:00:00");
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      hour: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    };
  });
  const [startTime, setStartTime] = useState(() => {
    const date = new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      hour: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    };
  });
  const [renderTime, setRenderTime] = useState({
    hour: null,
    day: null,
    minutes: null,
    seconds: null,
  });

  useEffect(() => {
    console.log(endTime, startTime);
  }, []);
  return (
    <>
      <Notice>남은 시간</Notice>
      <FlexBox>
        <TimeBox>
          <p>Day</p>
          <Time>5</Time>
        </TimeBox>
        <TimeBox>
          <p>Hours</p>
          <Time>60</Time>
        </TimeBox>
        <TimeBox>
          <p>Minutes</p>
          <Time>5</Time>
        </TimeBox>
        <TimeBox>
          <p>Seconds</p>
          <Time>5</Time>
        </TimeBox>
      </FlexBox>
    </>
  );
}
