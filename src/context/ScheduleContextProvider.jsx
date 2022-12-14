import { useReducer } from "react";
import { ScheduleContext, ScheduleDispatchContext } from "./ScheduleContext";

export const ScheduleProvider = ({ children }) => {
  const [scheduleObj, dispatch] = useReducer(scheduleReducer, {
    schedule: [],
    activeIndex: 0,
    currentIndex: 0,
    selectedTime: "",
  });
  return (
    <ScheduleContext.Provider value={{ scheduleObj }}>
      <ScheduleDispatchContext.Provider value={dispatch}>
        {children}
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
