import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

const Timer = (props) => {

  const { numSec = 60, startAt = Date.now() } = props;

  const endAt = startAt + (numSec * 1000);

  const [remaining, setRemaining] = useState(numSec);
  const [percent, setPercent] = useState(1);

  useEffect(() => {

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
        clearInterval(myInterval);
        document.body.style.setProperty("--timer", "0%");
        if (typeof props.onTimerExpired === 'function') {
          props.onTimerExpired();
        }
      }
    }, 20);

    return () => {
      clearInterval(myInterval);
    };

  });

  return (
    <p class="timer">
      <span>{remaining}</span> {remaining == 1 ? 'second' : 'seconds'} remaining
    </p>
  );
};

export default Timer;
