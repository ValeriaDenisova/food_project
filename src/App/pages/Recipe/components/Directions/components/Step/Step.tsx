import React from 'react';
import Text from 'components/Text';
import styles from './Step.module.scss';

interface StepProps {
  number: string;
  text: string;
}

const Step: React.FC<StepProps> = ({ number, text }) => {
  return (
    <>
      <Text className={styles.title}>Step {number}</Text>
      <Text className={styles.text}>{text}</Text>
    </>
  );
};

export default Step;
