import { memo } from 'react';
import classnames from 'classnames';

import styles from './HambugerButton.module.scss';

import BaseButton from '../BaseButton/BaseButton';

export enum State {
  IDLE = 'idle',
  CLOSE = 'close',
  BACK = 'back'
}

export type Props = {
  className?: string;
  currentState: State;
  onMouseEnter?: Function;
  onMouseLeave?: Function;
  onClick?: Function;
  tabIndex?: number;
  ariaLabel?: string;
};

const bars = [0, 1, 2].map((item) => <span key={item} className={styles.bar} />);

function HambugerButton({
  className,
  currentState = State.IDLE,
  onMouseEnter,
  onMouseLeave,
  onClick,
  tabIndex = 0,
  ariaLabel = 'Menu button'
}: Props) {
  return (
    <BaseButton
      className={classnames(styles.HamburgerButton, className, styles[currentState])}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
    >
      <div className={styles.barsContainer}>{bars}</div>
    </BaseButton>
  );
}

export default memo(HambugerButton);
