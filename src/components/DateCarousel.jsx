import "swiper/css";
import { useRef, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import DateCard from "./DateCard";
import Arrow from "./Arrow";
import {
  ScheduleContext,
  ScheduleDispatchContext,
} from "../context/ScheduleContext";

const DateCarousel = () => {
  const { scheduleObj } = useContext(ScheduleContext);
  const dispatch = useContext(ScheduleDispatchContext);
  const { schedule, activeIndex, currentIndex } = scheduleObj;
  const swiperRef = useRef(null);
  const pageCount = Math.ceil(schedule.length - 5);
  const onSlideChange = (activeIndex) => {
    dispatch({ type: "SET_CURRENT_INDEX", payload: activeIndex });
    dispatch({ type: "SET_ACTIVE_INDEX", payload: activeIndex });
  };

  return (
    <div className='schedule__date__picker__wrapper'>
      <div
        className={
          activeIndex === 0 ? "arrow__left arrow__disabled" : "arrow__left"
        }
        onClick={() => swiperRef.current.slidePrev()}
      >
        <Arrow />
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={5}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => {
          onSlideChange(swiper.activeIndex);
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {schedule.map((date, i) => (
          <SwiperSlide key={i}>
            <DateCard index={i} activeIndex={activeIndex} date={date} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={
          activeIndex === pageCount - 1
            ? "arrow__right arrow__disabled"
            : "arrow__right"
        }
        onClick={() => swiperRef.current.slideNext()}
      >
        <Arrow />
      </div>
    </div>
  );
};

export default DateCarousel;
