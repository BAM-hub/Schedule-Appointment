import { useContext } from "react";
import {
  ScheduleContext,
  ScheduleDispatchContext,
} from "../context/ScheduleContext";
import useIsDayAvailable from "../hooks/useIsDayAvailable";

const DateCard = ({ index }) => {
  const { scheduleObj } = useContext(ScheduleContext);
  const dispatch = useContext(ScheduleDispatchContext);
  const { activeIndex, schedule } = scheduleObj;
  const {
    availability: { date, day },
    available,
  } = schedule[index];
  const { cardState } = useIsDayAvailable(available, date);

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
