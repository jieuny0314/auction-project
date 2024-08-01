// useCountdown.js
import { useState, useEffect } from "react";

const useCountdown = (endTime) => {
  const calculateRemainingTime = (endTime) => {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    return end - now;
  };

  const [remainingTime, setRemainingTime] = useState(
    calculateRemainingTime(endTime)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = calculateRemainingTime(endTime);
      setRemainingTime(timeLeft);

      // 종료 시간이 지나면 타이머 정지
      if (timeLeft <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return remainingTime;
};

export default useCountdown;
