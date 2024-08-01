import React, { useState, useEffect } from "react";

const AuctionCountdown = ({ endTime, type }) => {
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

  const formatTime = (time) => {
    if (time <= 0) {
      return "경매가 종료되었습니다.";
    }

    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    if (type === "main") {
      return `${days}일 ${hours}시간`;
    } else {
      return `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
    }
  };

  return (
    <div>
      {remainingTime <= 0 ? (
        <p className="text-rose-700 font-bold"> 경매가 종료되었습니다.</p>
      ) : (
        <div className="flex">
          {type === "main" ? (
            "🕦"
          ) : (
            <p className="mr-2 w-[25%] text-gray-500">남은시간</p>
          )}
          <p>{formatTime(remainingTime)}</p>
        </div>
      )}
    </div>
  );
};

export default AuctionCountdown;
