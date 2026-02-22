import * as React from 'react';
import Text from '../Text/Text';
import styles from './TextTitle.module.scss';

export type TextTitleProps = {
  text: string;
};

const TextTitle: React.FC<TextTitleProps> = ({ text }) => {
  return <Text className={styles.title}>{text}</Text>;
};

export default TextTitle;
