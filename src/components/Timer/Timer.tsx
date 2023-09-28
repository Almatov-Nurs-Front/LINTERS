import React, { useEffect, useState } from 'react';
import { NumberRange } from '@TimerTypes';



const Timer = ({ hours = 0, minutes = 0, seconds = 0 }: TimerProps) => {
  const date: Date = new Date(0, 0, 0, hours ?? 0, minutes ?? 0, seconds ?? 0);

  const getTimeString = () => {
    const time = date.toLocaleTimeString().split(':');
    const currTime = [ hours, minutes, seconds ];
    const result = time.map((t, i) => currTime[ i ] === null ? null : t);

    return result.filter(i => i).join(':');
  };

  const [ time, setTime ] = useState(date.toLocaleTimeString());
  const [ timer, setTimer ] = useState(getTimeString());

  const convertTime = (t = time) => {
    // summ all time
    const [ h, m, s ] = t.split(':');
    const fullTime = [ h, m, s ].reduce((acc, curr) => acc + +curr, 0);

    if (fullTime) {
      setTimeout(() => {
        date.setSeconds(+s -1);

        setTime(date.toLocaleTimeString());
        setTimer(getTimeString());
        convertTime(date.toLocaleTimeString());
      }, 1000);
    }
  };

  useEffect(() => {
    convertTime();
  }, []);

  return <span>{timer}</span>;
};

interface TimerProps {
  hours?: NumberRange<0, 25> | null,
  minutes?: NumberRange<0, 61> | null,
  seconds?: NumberRange<0, 61> | null,
}

export default Timer;
