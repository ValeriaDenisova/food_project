import React from 'react';
import TextTitle from 'components/TextTitle';
import styles from './IngredientsEquipmentContainer.module.scss';

interface IngredientsEquipmentContainerProps {
  title: string;
  arrayElement: React.ReactNode[];
  width?: string;
}

const IngredientsEquipmentContainer: React.FC<IngredientsEquipmentContainerProps> = ({
  title,
  arrayElement,
  width,
}) => {
  return (
    <div className={styles.ingredientsContainer} style={{ width: width ? width : undefined }}>
      <TextTitle text={title} />
      <div className={styles.contant}>
        {arrayElement.map((element, index) => (
          <React.Fragment key={index}>{element}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default IngredientsEquipmentContainer;
