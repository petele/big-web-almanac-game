import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

const Timer = (props) => {

  const { numSec = 60 } = props;
  const [seconds, setSeconds] = useState(numSec);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        let percentRemaining = `${seconds / numSec * 100}%`;
        setSeconds(seconds - 1);
        document.body.style.setProperty("--timer", percentRemaining);
      }
    }, 1000);

    if (seconds === 0 && typeof props.onTimerExpired === 'function') {
      props.onTimerExpired();
    }
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <p class="timer">
      <span>{seconds}</span> seconds remaining
    </p>
  );
};

export default Timer;
