import React from 'react';
import styles from './RecipeDescription.module.scss';

interface RecipeDescriptionProps {
  text: React.ReactNode;
}

const RecipeDescription: React.FC<RecipeDescriptionProps> = ({ text }) => {
  return <div className={styles.recipeDescription}>{text}</div>;
};

export default RecipeDescription;
