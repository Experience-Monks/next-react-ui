import {
  Children,
  cloneElement,
  KeyboardEventHandler,
  memo,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react';
import classnames from 'classnames';
import noop from 'no-op';

import styles from './Tabs.module.scss';

enum Keys {
  END = 'End',
  HOME = 'Home',
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight'
}

export type Props = {
  className?: string | null;
  tabListLabel?: string;
  children?: ReactNode;
};

export const Tabs = ({ className, tabListLabel = '', children }: Props) => {
  const containerRef = useRef(null);
  const childrenArray = Children.toArray(children);
  const [active, setActive] = useState(0);

  function previousTab() {
    active - 1 < 0 ? setActive(childrenArray.length - 1) : setActive(active - 1);
  }

  function nextTab() {
    setActive((active + 1) % childrenArray.length);
  }

  function handleKeyup(e: KeyboardEvent) {
    e.preventDefault();
    if (e.key === Keys.LEFT) previousTab();
    else if (e.key === Keys.RIGHT) nextTab();
    else if (e.key === Keys.END) setActive(childrenArray.length - 1);
    else if (e.key === Keys.HOME) setActive(0);
  }

  return (
    <div className={classnames(styles.Tabs, className)} ref={containerRef}>
      <ul className={styles.tabsList} role="tablist" aria-label={tabListLabel}>
        {childrenArray.map((child, index) => {
          const label = (child as ReactElement).props['data-label'];
          if (!label) {
            console.warn('Child component has no data-label prop');
            return null;
          } else {
            return (
              <Tab
                index={index}
                key={`${label}${index}`}
                label={label}
                isActive={active === index}
                onClick={() => setActive(index)}
                onKeyUp={handleKeyup}
              >
                {label}
              </Tab>
            );
          }
        })}
      </ul>

      <div className={styles.tabsContent}>
        {childrenArray.map((child, index) =>
          cloneElement(child as ReactElement, {
            id: `panel-${index}`,
            role: 'tabpanel',
            'aria-live': 'polite',
            'aria-labelledby': `tab-${index}`,
            hidden: index !== active
          })
        )}
      </div>
    </div>
  );
};

type TabProps = {
  isActive: boolean;
  label: string;
  index: number;
  onClick: Function;
  onKeyUp: Function;
  children: ReactNode;
};

export default memo(Tabs);

export const Tab = ({ isActive, label, index, onClick = noop, onKeyUp = noop }: TabProps) => {
  const el = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (isActive) el.current?.focus();
  }, [isActive]);

  return (
    <li
      id={`tab-${index}`}
      ref={el}
      className={classnames(styles.tab, { [styles.active]: isActive })}
      role="tab"
      aria-controls={`panel-${index}`}
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={onClick as MouseEventHandler<HTMLLIElement>}
      onKeyUp={onKeyUp as KeyboardEventHandler<HTMLLIElement>}
    >
      {label}
    </li>
  );
};
