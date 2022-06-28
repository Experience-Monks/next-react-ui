import { memo } from 'react';
import classnames from 'classnames';

import styles from './Footer.module.scss';

import BaseLink from '@/components/BaseLink/BaseLink';

import routes from '@/data/routes';

function Footer() {
  return (
    <footer className={classnames(styles.Footer)}>
      <ul>
        {Object.values(routes).map(({ path, title }) => (
          <li key={path}>
            <BaseLink href={path}>{title}</BaseLink>
          </li>
        ))}
      </ul>
    </footer>
  );
}

export default memo(Footer);
