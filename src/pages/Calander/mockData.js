export const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

export const getCurrentDate = () => {
  const currentDate = new Date();

  return {
    currentYear: currentDate.getFullYear(),
    currentMonth: currentDate.getMonth(),
    currentDay: currentDate.getDate(),
  };
};
