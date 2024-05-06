import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 5);
    targetDate.setHours(targetDate.getHours() + 3);
    targetDate.setMinutes(targetDate.getMinutes() + 30);
    targetDate.setSeconds(targetDate.getSeconds() + 45);

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        clearInterval(intervalId);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="countdown-block">
      <h2 className="countdown__title">Hurry up! Sale ends in:</h2>
      <ul className="countdown">
        <li className="countdown__item">
          <div className="countdown__value">{countdown.days.toString().padStart(1, "0")}</div>
          <span className="countdown__separator">:</span>
        </li>
        <li className="countdown__item">
          <div className="countdown__value">{countdown.hours.toString().padStart(2, "0")}</div>
          <span className="countdown__separator">:</span>
        </li>
        <li className="countdown__item">
          <div className="countdown__value">{countdown.minutes.toString().padStart(2, "0")}</div>
          <span className="countdown__separator">:</span>
        </li>
        <li className="countdown__item">
          <div className="countdown__value">{countdown.seconds.toString().padStart(2, "0")}</div>
        </li>
      </ul>
    </div>
  );
};

export default CountdownTimer;
