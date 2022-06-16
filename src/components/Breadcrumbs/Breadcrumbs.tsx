import { memo, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import cleanPath from 'remove-trailing-slash';

import styles from './Breadcrumbs.module.scss';

import BaseLink from '../BaseLink/BaseLink';

export enum BreadStyle {
  ALL = 'all',
  CURRENT = 'current',
  FORWARD = 'forward'
}

export type Props = {
  className?: string;
  breadStyle: BreadStyle;
  routes: [{ route: string; text: string }];
};

const Breadcrumbs = ({ routes, breadStyle = BreadStyle.ALL }: Props) => {
  const [active, setActive] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const pos = routes.map((path) => path.route).indexOf(router.asPath);
    pos < 0 ? setActive(0) : setActive(pos);
  }, [router.asPath, routes]);

  return (
    <nav className={classnames(styles.Breadcrumbs)} aria-label="breadcrumbs">
      {routes
        .map((path, index) => {
          const LinkInstance = <LinkWrapper key={`${index}${path.text}`} {...path} pathname={router.pathname} />;

          if (index <= active + 1 && breadStyle === BreadStyle.FORWARD) {
            return LinkInstance;
          } else if (index <= active && breadStyle === BreadStyle.CURRENT) {
            return LinkInstance;
          } else if (breadStyle === BreadStyle.ALL) {
            return LinkInstance;
          }
          return null;
        })
        .filter((route) => Boolean(route))
        .reduce(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          (prev, curr, index) => [
            prev,
            <span key={index} className={styles.separator} aria-hidden="true">
              {'>'}
            </span>,
            curr
          ],
          ''
        )}
    </nav>
  );
};

export default memo(Breadcrumbs);

type LinkWrapperProps = {
  pathname: string;
  route: string;
  text: string;
};

const LinkWrapper = ({ pathname, text, route }: LinkWrapperProps) => {
  const isActive = cleanPath(route) === cleanPath(pathname);

  return (
    <BaseLink
      className={classnames(styles.link, { [styles.active]: isActive })}
      href={route}
      {...(isActive ? { 'aria-current': 'location' } : {})}
    >
      {text}
    </BaseLink>
  );
};
