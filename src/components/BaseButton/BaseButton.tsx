import { ForwardedRef, forwardRef, memo, ReactNode, useMemo } from 'react';
import classnames from 'classnames';

import styles from './BaseButton.module.scss';

export type Props = {
  className?: string;
  component?: string | Function;
  children?: ReactNode;
  tabIndex?: number | string;
  disabled?: boolean;
  'aria-label'?: string;
  title?: string;
  onClick?: Function;
  onBlur?: Function;
  onFocus?: Function;
  onKeyDown?: Function;
  onKeyUp?: Function;
  onMouseMove?: Function;
  onMouseEnter?: Function;
  onMouseLeave?: Function;
  onMouseUp?: Function;
  onMouseDown?: Function;
  onTouchEnd?: Function;
  onTouchMove?: Function;
  onTouchStart?: Function;
};

const BaseButton = (
  { className, component: Component = 'button', children, ...buttonProps }: Props,
  ref: ForwardedRef<HTMLElement>
) => {
  const currRole = useMemo(() => (Component === 'button' ? null : 'button'), [Component]);
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Component className={classnames(styles.BaseButton, className)} ref={ref} role={currRole} {...buttonProps}>
      {children}
    </Component>
  );
};

export default memo(forwardRef(BaseButton));
