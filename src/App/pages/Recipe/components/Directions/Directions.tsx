import React from 'react';
import Step from './components/Step';
import TextTitle from 'components/TextTitle';
import styles from './Directions.module.scss';

interface DirectionsProps {
  directions: {
    id: number;
    description: string;
  }[];
}

const Directions: React.FC<DirectionsProps> = ({ directions }) => {
  return (
    <div className={styles.directions}>
      <TextTitle text={'Directions'} />
      <div className={styles.stenContant}>
        {directions?.map((direction, index) => (
          <Step key={direction.id} number={`${index}`} text={direction.description} />
        ))}
      </div>
    </div>
  );
};

export default Directions;
