import { useEffect, useState, useReducer } from "react";
import "./App.css";
import DateCarousel from "./components/DateCarousel";
import Time from "./components/Time";
import {
  ScheduleContext,
  ScheduleDispatchContext,
} from "./context/ScheduleContext";

const App = () => {
  const [scheduleObj, dispatch] = useReducer(scheduleReducer, {
    schedule: [],
    activeIndex: 0,
    currentIndex: 0,
    selectedTime: "",
  });
  const getData = async () => {
    const res = await fetch("https://cura-front-end-test.herokuapp.com/");
    const data = await res.json();
    const parsedData = JSON.parse(data);
    dispatch({ type: "SET_SCHEDULE", payload: parsedData.schedule });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScheduleContext.Provider value={{ scheduleObj }}>
      <ScheduleDispatchContext.Provider value={dispatch}>
        <main>
          <section>
            <h1>Schedule Appointment</h1>
            <br />
            <div className='schedule'>
              <div className='schedule__header'>
                <span className='schedule__content'>Fees</span>
                <span className='schedule__content__light'>85$</span>
              </div>
              <div className='schedule__controls'>
                <div className='schedule__content__wrapper'>
                  <p className='schedule__content'>Schedule</p>
                </div>
                <DateCarousel />
                <Time />
              </div>
            </div>
            <br />
            <button className='schedule__button'>Book Appointment</button>
          </section>
        </main>
      </ScheduleDispatchContext.Provider>
    </ScheduleContext.Provider>
  );
};
const scheduleReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVE_INDEX": {
      return {
        ...state,
        activeIndex: action.payload,
      };
    }
    case "SET_CURRENT_INDEX": {
      return {
        ...state,
        currentIndex: action.payload,
      };
    }
    case "SET_SCHEDULE": {
      return {
        ...state,
        schedule: action.payload,
      };
    }
    case "SET_SELECTED_TIME": {
      return {
        ...state,
        selectedTime: action.payload,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};
export default App;
