import React from 'react';
import styles from './RecipeInfoElement.module.scss';
import Text from 'components/Text';

interface RecipeInfoElementProps {
  title: string;
  info: string;
}

const RecipeInfoElement: React.FC<RecipeInfoElementProps> = ({ title, info }) => {
  return (
    <div className={styles.recipeInfoElement}>
      <Text className={styles.title}>{title}</Text>
      <Text className={styles.info}>{info}</Text>
    </div>
  );
};

export default RecipeInfoElement;
