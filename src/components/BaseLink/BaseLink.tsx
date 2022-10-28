/* eslint-disable sonarjs/no-duplicate-string */
import { ForwardedRef, forwardRef, memo, ReactNode, useMemo } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

import styles from './BaseLink.module.scss';

const excludes = ['children', 'download', 'target', 'rel', 'link'];
export enum Target {
  SELF = '_self',
  BLANK = '_blank',
  PARENT = '_parent',
  TOP = '_top'
}

const externalLinkRegex = /^(https:\/\/|http:\/\/|www\.|tel:|mailto:)/;
const externalSiteRegex = /^(https:\/\/|http:\/\/|www\.)/;

export type Props = {
  className?: string;
  children?: ReactNode;
  rel?: string;
  href?: string;
  target?: Target;
  shallow?: boolean;
  tabIndex?: number | string;
  download?: string | boolean;
  title?: string;
  'aria-label'?: string;
  'aria-current'?: string;
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
  onClick?: Function;
};

const BaseLink = (
  { className, href = '#', download, rel, target = Target.BLANK, children, shallow, ...props }: Props,
  ref: ForwardedRef<HTMLElement>
) => {
  const isDownload = useMemo(() => Boolean(download), [download]);
  const Component = useMemo(() => (externalLinkRegex.test(href) || isDownload ? 'a' : Link), [href, isDownload]);

  const componentProps = useMemo(
    () =>
      Object.keys(props).reduce(
        (acc, key) => ([...excludes].indexOf(key) > -1 ? acc : { ...acc, [key]: props[key as keyof typeof props] }),
        {
          className: classnames(styles.BaseLink, className)
        }
      ) as Props,
    [className, props]
  );

  return useMemo(() => {
    componentProps['aria-label'] = props['aria-label'] || props.title;

    if (Component === 'a') {
      componentProps.href = href;

      if (isDownload) {
        componentProps.download = download;
      }

      // set external link attributes
      if (externalSiteRegex.test(href) && !isDownload) {
        componentProps.target = target;
        if (target === Target.BLANK) {
          componentProps.rel = rel || 'noreferrer noopener';
        }
      }

      return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Component ref={ref} {...componentProps}>
          {children}
        </Component>
      );
    } else {
      return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Component ref={ref} href={href}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <a {...componentProps}>{children}</a>
        </Component>
      );
    }
  }, [Component, children, componentProps, download, href, isDownload, props, ref, rel, target]);
};

export default memo(forwardRef(BaseLink));
