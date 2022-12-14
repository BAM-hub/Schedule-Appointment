import { useEffect, useState, useContext } from "react";
import {
  ScheduleContext,
  ScheduleDispatchContext,
} from "../context/ScheduleContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useIsTimeAvailable from "../hooks/useIsTimeAvailable";

const Time = () => {
  const { scheduleObj } = useContext(ScheduleContext);
  const { activeIndex, selectedTime } = scheduleObj;
  const dispatch = useContext(ScheduleDispatchContext);

  const { timeList, isTimeWitheinRange } = useIsTimeAvailable(
    activeIndex,
    scheduleObj
  );

  return (
    <>
      <div className='schedule__content__wrapper'>
        <p className='schedule__content'>Choose time</p>
      </div>
      <div className='schedule__controls'>
        <div className='schedule__content__wrapper'>
          {timeList.length === 0 ? (
            <Skeleton
              count={1}
              height={200}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            />
          ) : (
            <div className='time__wrapper'>
              {timeList.map(({ time, available }, i) => (
                <div
                  key={i}
                  className={`time__card ${
                    !isTimeWitheinRange
                      ? "time__card__disabled"
                      : available
                      ? ""
                      : "time__card__disabled"
                  } ${
                    selectedTime === time && isTimeWitheinRange
                      ? "time__card__selected"
                      : ""
                  }`}
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
          )}
        </div>
      </div>
    </>
  );
};

export default Time;
