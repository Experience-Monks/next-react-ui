import classnames from 'classnames';

import styles from './Nav.module.scss';

import BaseLink, { Target } from '@/components/BaseLink/BaseLink';
import Image from '@/components/Image/Image';

import SvgThreeLogo from '@/components/svgs/three-logo.svg';
import routes from '@/data/routes';

const LINKS = [
  { href: 'https://jam3.com', label: 'Jam3', file: 'three-logo.jpeg' },
  { href: 'https://github.com/jam3', label: 'GitHub', file: 'github-icon-64b.png' }
].map((link) => ({
  ...link,
  key: `nav-link-${link.href}-${link.label}`
}));

function Nav() {
  return (
    <nav className={classnames(styles.Nav)}>
      <div className={styles.wrapper}>
        <ul className={styles.routes}>
          <BaseLink tabIndex={0} aria-label="Skip to content" className={styles.skipToContent} href="#start-of-content">
            Skip to content
          </BaseLink>
          {Object.values(routes).map(({ path, title }) => (
            <li key={path}>
              <BaseLink aria-label="Home" href={path}>
                {path === '/' ? <SvgThreeLogo className={styles.threeLogo} /> : title}
              </BaseLink>
            </li>
          ))}
        </ul>

        <ul className={styles.links}>
          {LINKS.map(({ key, href, label, file }) => (
            <li key={key}>
              <BaseLink href={href} target={Target.BLANK} rel="noopener noreferrer" aria-label={label}>
                <Image src={file} alt={label} />
              </BaseLink>
            </li>
          ))}
        </ul>
      </div>

      <section aria-hidden="true" id="start-of-content"></section>
    </nav>
  );
}

export default Nav;
