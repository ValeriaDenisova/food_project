import React from 'react';
import styles from './IngredientsEquipmenElement.module.scss';
import Text from '../../../../../../../../components/Text';

interface IngredientsEquipmentElementProps {
  svg: React.ReactNode;
  text: string;
}

const IngredientsEquipmentElement: React.FC<IngredientsEquipmentElementProps> = ({ svg, text }) => {
  return (
    <div className={styles.ingredientsEquipmentElement}>
      {svg}
      <Text>{text}</Text>
    </div>
  );
};

export default IngredientsEquipmentElement;
