import { useState, useEffect } from "react";

import { Notice, FlexBox, TimeBox, Time } from "@/pages/TimeCountdown/style";
// 2025 02 20 02 00 00
// 2024 11 19 01 03 00

//구현할 형태 day, hour, miuntes, seconds 총 4개로 표기

//년, 월 비교해서 일에 가산하는 형식으로 가야할듯
//setInterval이용해서 매번 newDate()를 호출해서 년도, 월만 일로 환산하면
//되지않을까?

export default function TimeCountdown() {
  const [renderTime, setRenderTime] = useState({
    day: null,
    hours: null,
    minutes: null,
    seconds: null,
  });

  const dateCalc = (endDate) => {
    const date = endDate ? new Date(endDate) : new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    };
  };

  const dateConvertToSeconds = (date, dateType) => {
    if (dateType === "day") {
      return date * 24 * 60 * 60;
    }

    if (dateType === "hours") {
      return date * 60 * 60;
    }

    if (dateType === "minutes") {
      return date * 60;
    }
  };

  useEffect(() => {
    const calcTime = setInterval(() => {
      const {
        year: startYear,
        month: startMonth,
        day: startDay,
        hours: startHours,
        minutes: startMinutes,
        seconds: startSeconds,
      } = dateCalc();
      //end 2024 07 08
      //start 2024 04 20
      //13 - 4  -> 9개월 ->
      //04 05 06 07 08 09 10 11 12 01 반복하면서 일수 구하기

      const {
        year: endYear,
        month: endMonth,
        day: endDay,
        hours: endHours,
        minutes: endMinutes,
        seconds: endSeconds,
      } = dateCalc("2025-11-20 03:50:00");

      //년도차이 계산
      const yearCalc = endYear - startYear <= 0 ? 0 : endYear - startYear;
      //년도차이를 달로 환산하여 endmonth에 더해주기 (같은 년도면 0이 더해짐)
      const monthCalc = yearCalc * 12 + (endMonth + 1);
      //그렇게해서 계산된 endmonth - startmonth하면 몇개월차인지 나옴
      const remainMonth = monthCalc - (startMonth + 1);
      //-가나올수도 있지만 반복문을 통해 해당 개월의 일수만큼 더해짐
      //이를 통해 며칠이 차이나는지 알수있게됨
      let remainDay = endDay - startDay;

      //같은년도, 같은달이면 실행x
      for (let i = 1; i <= remainMonth; i++) {
        remainDay += new Date(startYear, startMonth + i, 0).getDate();
      }

      const remainDayConvert = dateConvertToSeconds(remainDay, "day");
      const endHoursConvert = dateConvertToSeconds(endHours, "hours");
      const startHoursConvert = dateConvertToSeconds(startHours, "hours");
      const endMinutesConvert = dateConvertToSeconds(endMinutes, "minutes");
      const startMinutesConvert = dateConvertToSeconds(startMinutes, "minutes");

      const remainTotal =
        remainDayConvert +
        (endHoursConvert - startHoursConvert) +
        (endMinutesConvert - startMinutesConvert) +
        (endSeconds - startSeconds);

      //전체 초 / 24시간 * 60분 * 60초 나눠주면 몫으로 일수 나옴ㄴ
      const resultDay = Math.trunc(remainTotal / (24 * 60 * 60));

      const remainHours = remainTotal % (24 * 60 * 60);
      //전체 초 / 24시간 * 60분 * 60초의 나머지 부분을 3600초로 나눴을때의 몫이 시간
      const resultHours = Math.trunc(remainHours / (60 * 60));
      //이후 60분으로 나눴을때의 몫이 분
      const resultMinutes = Math.trunc((remainHours % (60 * 60)) / 60);
      // 60분으로 나눴을때의 나머지가 초
      const resultSeconds = (remainHours % (60 * 60)) % 60;

      setRenderTime({
        day: resultDay,
        hours: resultHours,
        minutes: resultMinutes,
        seconds: resultSeconds,
      });

      //차이가없어지면 인터벌종료
      if (remainTotal <= 0) {
        clearInterval(calcTime);
      }
    }, 1000);

    return () => {
      clearInterval(calcTime);
    };
  }, []);

  return (
    <>
      <Notice>남은 시간</Notice>
      <FlexBox>
        <TimeBox>
          <p>Day</p>
          <Time>{renderTime.day}</Time>
        </TimeBox>
        <TimeBox>
          <p>Hours</p>
          <Time>{renderTime.hours}</Time>
        </TimeBox>
        <TimeBox>
          <p>Minutes</p>
          <Time>{renderTime.minutes}</Time>
        </TimeBox>
        <TimeBox>
          <p>Seconds</p>
          <Time>{renderTime.seconds}</Time>
        </TimeBox>
      </FlexBox>
    </>
  );
}
