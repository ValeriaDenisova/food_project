import React from 'react';
import styles from './IngredientsEquipmentSeparator.module.scss';

const IngredientsEquipmentSeparator: React.FC = () => {
  return (
    <div className={styles.separatop}>
      <div className={styles.circle}></div>
      <div className={styles.line}></div>
    </div>
  );
};

export default IngredientsEquipmentSeparator;
