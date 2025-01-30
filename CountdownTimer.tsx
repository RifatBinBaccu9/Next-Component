"use client";
import { useEffect, useState } from "react";

export default function CountdownTimer() { 
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    let targetDate = localStorage.getItem("countdownTarget");

    if (!targetDate) {
      // Set new countdown (7 days from now) if no stored time exists
      targetDate = (new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toString();
      localStorage.setItem("countdownTarget", targetDate);
    }

    function calculateTimeLeft() {
      const now = new Date().getTime();
      const difference = parseInt(targetDate) - now;

      if (difference <= 0) {
        localStorage.removeItem("countdownTarget"); // Reset when countdown ends
        return { d: 0, h: 0, m: 0, s: 0 };
      }

      return {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / (1000 * 60)) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    }

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 text-xl font-bold">
      <div className="text-3xl">{timeLeft.d}Days</div>
      <div>{timeLeft.h}Hours</div>
      <div>{timeLeft.m}Mins</div>
      <div>{timeLeft.s}Secs</div>
    </div>
  );
}
