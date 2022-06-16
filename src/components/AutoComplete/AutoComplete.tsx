import { memo, useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';

import styles from './AutoComplete.module.scss';

const typingAhead = require('typing-ahead');

export type Props = {
  className?: string;
  id: string;
  data: [string];
  autoCompleteResult: Function;
};

const AutoComplete = ({ id, data, className, autoCompleteResult }: Props) => {
  const [model, setModel] = useState(null);

  const onInputChange = useCallback(
    ({ target: { value } }) => {
      if (model) {
        autoCompleteResult(value ? typingAhead.find(value, model) : null);
      }
    },
    [autoCompleteResult, model]
  );

  useEffect(() => {
    setModel(typingAhead.generate(data));
  }, [data]);

  return <input id={id} className={classnames(styles.AutoComplete, className)} onChange={onInputChange} />;
};

export default memo(AutoComplete);
