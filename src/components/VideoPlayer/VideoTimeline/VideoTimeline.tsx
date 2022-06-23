import { memo, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import noop from 'no-op';

import styles from './VideoTimeline.module.scss';

export type Props = {
  className?: string;
  duration: number;
  currentTime?: number;
  step?: number;
  stepFast?: number;
  inputAriaLabel?: string;
  onTimeUpdate: Function;
};

const VideoTimeline = function ({
  className,
  currentTime: currTime = 0,
  duration,
  onTimeUpdate = noop,
  step = 0.1,
  stepFast = 0.5,
  inputAriaLabel = 'Seek Video'
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [currentTime, seCurrentTime] = useState(currTime);
  const [currStep, setCurrStep] = useState(step);

  useEffect(() => {
    seCurrentTime(currTime);
  }, [currTime]);

  function onChange() {
    seCurrentTime(parseFloat(inputRef.current?.value ?? '0'));
    onTimeUpdate(inputRef.current?.value, inputRef.current?.value ?? 0 / duration);
  }

  return (
    <div className={classnames(styles.VideoTimeline, className)}>
      <div className={styles.progress} style={{ width: (currentTime / duration) * 100 + '%' }} />
      <input
        type="range"
        ref={inputRef}
        min="0"
        max={duration}
        step={currStep}
        onChange={onChange}
        value={currentTime}
        onKeyDown={() => setCurrStep(stepFast)}
        onKeyUp={() => setCurrStep(step)}
        onBlur={() => setCurrStep(step)}
        aria-label={inputAriaLabel}
        title={inputAriaLabel}
      />
    </div>
  );
};

export default memo(VideoTimeline);
