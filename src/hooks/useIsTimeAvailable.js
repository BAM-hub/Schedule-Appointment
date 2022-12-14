import { useEffect, useState } from "react";

const useIsDayAvailable = (activeIndex, scheduleObj) => {
  const [timeList, setTimeList] = useState([]);
  const [isTimeWitheinRange, setIsTimeWitheinRange] = useState(false);
  const { schedule } = scheduleObj;
  const format = (date) => {
    const parsedDate = new Date(date * 1000);
    let hours = parsedDate.getHours();
    const AmOrPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours} ${AmOrPm}`;
  };
  const getHourList = (from, to) => {
    const fromHour = from.split(" ")[0];
    const toHour = to.split(" ")[0];
    const fromAmOrPm = from.split(" ")[1];
    const toAmOrPm = to.split(" ")[1];
    const hourList = [];
    if (fromAmOrPm === toAmOrPm) {
      for (let i = fromHour; i <= toHour; i++) {
        hourList.push(`${i} ${fromAmOrPm}`);
      }
    } else {
      for (let i = fromHour; i <= 12; i++) {
        hourList.push(`${i} ${fromAmOrPm}`);
      }
      for (let i = 1; i <= toHour; i++) {
        hourList.push(`${i} ${toAmOrPm}`);
      }
    }
    return hourList;
  };
  const mergeTimes = (availableTimes, unavailableTimes) => {
    const mergedTimes = [];
    for (let i = 0; i < availableTimes.length; i++) {
      if (unavailableTimes.includes(availableTimes[i])) {
        mergedTimes.push({
          time: availableTimes[i],
          available: false,
        });
      } else {
        mergedTimes.push({
          time: availableTimes[i],
          available: true,
        });
      }
    }
    setTimeList(mergedTimes);
  };
  // check if the time is withen the range of 1 day and 30 days
  const isWithinRange = (currentDate, dateToCompare) => {
    dateToCompare = new Date(dateToCompare * 1000);
    let difference = dateToCompare - currentDate;
    let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    if (daysDifference < 1 || daysDifference > 30) {
      return setIsTimeWitheinRange(false);
    } else {
      return setIsTimeWitheinRange(true);
    }
  };
  useEffect(() => {
    if (schedule.length > 0) {
      const { available, unavailable } = schedule[activeIndex];
      const availableTimes = available
        .map((time) => {
          const currentDate = new Date();
          isWithinRange(currentDate, time.from_unix);
          const from = format(time.from_unix);
          const to = format(time.to_unix);
          return getHourList(from, to);
        })
        .flat();
      const unavailableTimes = unavailable
        .map((time) => {
          const from = format(time.from_unix);
          const to = format(time.to_unix);
          return getHourList(from, to);
        })
        .flat();
      mergeTimes(availableTimes, unavailableTimes);
    }
  }, [scheduleObj, activeIndex]);
  return { timeList, isTimeWitheinRange };
};

export default useIsDayAvailable;
