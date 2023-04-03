import React from "react";
import Marquee from "react-fast-marquee";
import "./index.css";

const quotes = [
  "Don't be slow! Our prices are low.",
  "The best for less.",
  "Don't delay—sales today!",
  "Keep calm and buy up.",
  "It's the biggest sale of the year!",
  "Everything you need—on a budget.",
  "Enjoy the best rates!",
  "Hurry before stock runs out!",
];

const MobileMarquee = () => {
  return (
    <div className="marquee-wrapper">
      {quotes.slice(0, 7).map((quote, i) => {
        return (
          <Marquee
            className={`marquee-element marquee-colors-${i}`}
            gradient={false}
            pauseOnClick="true"
            speed={Math.floor(Math.random() * 100) + 80}
          >
            {quote}
          </Marquee>
        );
      })}
    </div>
  );
};

export default MobileMarquee;
