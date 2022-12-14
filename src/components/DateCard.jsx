import { useEffect, useState, useContext } from "react";
import {
  ScheduleContext,
  ScheduleDispatchContext,
} from "../context/ScheduleContext";

const DateCard = ({ index }) => {
  const { scheduleObj } = useContext(ScheduleContext);
  const dispatch = useContext(ScheduleDispatchContext);
  const { activeIndex, schedule } = scheduleObj;
  const {
    availability: { date, day },
    available,
  } = schedule[index];
  const [cardState, setCardState] = useState();
  useEffect(() => {
    const currentDate = new Date();
    const dateToCompare = new Date(
      available[available.length - 1].to_unix * 1000
    );
    let difference = dateToCompare - currentDate;
    let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    if (daysDifference < 0) {
      setCardState("date__card__disabled");
    } else {
      setCardState("date__card");
    }
  }, []);

  const handleActiveIndex = (index) => {
    dispatch({ type: "SET_ACTIVE_INDEX", payload: index });
  };

  return (
    <div
      className={`date_wrapper ${cardState} ${
        activeIndex === index ? "date__card__active" : "date__card"
      }`}
      onClick={() => handleActiveIndex(index)}
    >
      <div className='date__header'>
        <span className='date__header__day schedule__content'>
          {day.substring(0, 3)}
        </span>
      </div>
      <div className='date__content schedule__content'>
        <span className='date__content__day'>{date.split("-")[0]}</span>
      </div>
    </div>
  );
};

export default DateCard;
