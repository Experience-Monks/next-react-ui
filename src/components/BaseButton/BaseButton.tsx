import { ForwardedRef, forwardRef, FunctionComponent, memo, ReactNode, Ref, useMemo } from 'react';
import classnames from 'classnames';

import styles from './BaseButton.module.scss';

type BaseProps = {
  className?: string | null;
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

type FComponent =
  | string
  | FunctionComponent<
      BaseProps & {
        ref: Ref<HTMLElement> | null;
        role: string | null;
      }
    >;

export type Props = BaseProps & {
  component?: FComponent;
};

const BaseButton = (
  { className = null, component: Component = 'button', children = null, ...buttonProps }: Props,
  ref: ForwardedRef<HTMLElement | HTMLButtonElement>
) => {
  const currRole = useMemo(() => (Component === 'button' ? null : 'button'), [Component]);

  return (
    <Component className={classnames(styles.BaseButton, className)} ref={ref} role={currRole} {...buttonProps}>
      {children}
    </Component>
  );
};

export default memo(forwardRef(BaseButton));
