import { useEffect, useState, useContext } from "react";
import {
  ScheduleContext,
  ScheduleDispatchContext,
} from "../context/ScheduleContext";

const Time = () => {
  const { scheduleObj } = useContext(ScheduleContext);
  const { activeIndex, schedule, selectedTime } = scheduleObj;
  const dispatch = useContext(ScheduleDispatchContext);
  const [timeList, setTimeList] = useState([]);

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
  useEffect(() => {
    if (schedule.length > 0) {
      const { available, unavailable } = schedule[activeIndex];
      const availableTimes = available
        .map(
          (time) => {
            const from = format(time.from_unix);
            const to = format(time.to_unix);
            return getHourList(from, to);
          },
          [scheduleObj]
        )
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
  return (
    <>
      <div className='schedule__content__wrapper'>
        <p className='schedule__content'>Choose time</p>
      </div>
      <div className='schedule__controls'>
        <div className='schedule__content__wrapper'>
          <div className='time__wrapper'>
            {timeList.map(({ time, available }, i) => (
              <div
                key={i}
                className={`time__card ${
                  available ? "" : "time__card__disabled"
                } ${selectedTime === time ? "time__card__selected" : ""}`}
                onClick={() => {
                  if (available) {
                    dispatch({
                      type: "SET_SELECTED_TIME",
                      payload: time,
                    });
                  }
                }}
              >
                <p className='time__card__text'>{time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Time;
