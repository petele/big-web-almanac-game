import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

const Timer = (props) => {

  const { numSec = 60, startAt = Date.now() } = props;

  const endAt = startAt + (numSec * 1000);

  const [remaining, setRemaining] = useState(numSec);
  const [percent, setPercent] = useState(1);

  useEffect(() => {
    // function step() {
    //   if (remaining > 0) {
    //     const remainMS = endAt - Date.now();
    //     const remainSec = Math.round(remainMS / 1000);
    //     const pct = remainMS / (numSec * 1000);
    //     const pctRemaining = `${pct * 100}%`;
    //     document.body.style.setProperty("--timer", pctRemaining);
    //     setPercent(pct);
    //     setRemaining(remainSec);
    //     requestAnimationFrame(step);
    //   } else {
    //     document.body.style.setProperty("--timer", "0%");
    //   }
    // }

    // let val = requestAnimationFrame(step);

    // return () => {
    //   cancelAnimationFrame(val);
    // }

    let myInterval = setInterval(() => {
      if (remaining > 0) {
        const remainMS = endAt - Date.now();
        const remainSec = Math.round(remainMS / 1000);
        const pct = remainMS / (numSec * 1000);
        const pctRemaining = `${pct * 100}%`;
        document.body.style.setProperty("--timer", pctRemaining);
        setPercent(pct);
        setRemaining(remainSec);
      } else {
        document.body.style.setProperty("--timer", "0%");
      }
    }, 20);

    if (remaining === 0 && typeof props.onTimerExpired === 'function') {
      props.onTimerExpired();
    }

    return () => {
      clearInterval(myInterval);
    };

  });

  return (
    <p class="timer">
      <span>{remaining}</span> seconds remaining
    </p>
  );
};

export default Timer;
