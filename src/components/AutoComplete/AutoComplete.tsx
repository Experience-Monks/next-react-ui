import { memo, useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import typingAhead from 'typing-ahead';

import styles from './AutoComplete.module.scss';

export type Props = {
  className?: string;
  id: string;
  data: [string];
  autoCompleteResult: Function;
};

type TypingAheadOption = {
  generate: (param: Array<string>) => string;
  find: (term: string, model: string) => Array<string>;
};

const AutoComplete = ({ id, data, className, autoCompleteResult }: Props) => {
  const [model, setModel] = useState<string>('');

  const onInputChange = useCallback(
    ({ target: { value } }) => {
      if (model) {
        autoCompleteResult(value ? (typingAhead as TypingAheadOption).find(value, model) : null);
      }
    },
    [autoCompleteResult, model]
  );

  useEffect(() => {
    setModel((typingAhead as TypingAheadOption).generate(data));
  }, [data]);

  return <input id={id} className={classnames(styles.AutoComplete, className)} onChange={onInputChange} />;
};

export default memo(AutoComplete);
