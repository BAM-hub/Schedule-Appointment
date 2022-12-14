import { useState, useEffect } from "react";

const useIsDayAvailable = (available) => {
  const [cardState, setCardState] = useState();
  const isAvailable = (currentDate, dateToCompare) => {
    let difference = dateToCompare - currentDate;
    let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    if (daysDifference < 0) {
      setCardState("date__card__disabled");
    } else {
      setCardState("date__card");
    }
  };
  useEffect(() => {
    const currentDate = new Date();
    const dateToCompare = new Date(
      available[available.length - 1].to_unix * 1000
    );
    isAvailable(currentDate, dateToCompare);
  }, []);
  return { cardState, setCardState };
};
export default useIsDayAvailable;
