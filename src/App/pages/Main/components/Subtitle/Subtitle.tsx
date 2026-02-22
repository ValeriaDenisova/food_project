import React from 'react';
import Text from 'components/Text';
import styles from './Subtitle.module.scss';

interface SubtitleProps {
  text: string;
}

const Subtitle: React.FC<SubtitleProps> = ({ text }) => {
  return <Text className={styles.subtitle}>{text}</Text>;
};

export default Subtitle;
