import { useEffect, useState } from "react";

const useCheckHours = (hours: number) => {
  const [tommorowPickup, setTommorowPickup] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      if (now.getHours() > hours && now.getMinutes() > 0) {
        setTommorowPickup(true);
      } else {
        setTommorowPickup(false);
      }
    };

    const timer = setInterval(checkTime, 1000);

    return () => clearInterval(timer);
  }, [hours]);

  return { tommorowPickup };
};

export default useCheckHours;
