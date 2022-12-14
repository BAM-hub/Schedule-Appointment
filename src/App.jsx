import "./App.css";
import { useEffect, useContext } from "react";
import { ScheduleDispatchContext } from "./context/ScheduleContext";
import DateCarousel from "./components/DateCarousel";
import Time from "./components/Time";

const App = () => {
  const dispatch = useContext(ScheduleDispatchContext);

  const getData = async () => {
    const res = await fetch("https://cura-front-end-test.herokuapp.com/");
    const data = await res.json();
    const parsedData = JSON.parse(data);
    console.log(parsedData);
    dispatch({ type: "SET_SCHEDULE", payload: parsedData.schedule });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
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
  );
};

export default App;
