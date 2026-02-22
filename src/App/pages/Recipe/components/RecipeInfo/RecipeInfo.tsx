import React from 'react';
import styles from './RecipeInfo.module.scss';
import RecipeInfoElement from './components/RecipeInfoElement';

interface RecipeInfoProps {
  cookingTime: number;
  preparationTime: number;
  totalTime: number;
  likes: number;
  serving: number;
  rating: number;
  img: string;
}

const RecipeInfo: React.FC<RecipeInfoProps> = ({
  cookingTime,
  preparationTime,
  totalTime,
  likes,
  serving,
  rating,
  img,
}) => {
  return (
    <div className={styles.recipeInfo}>
      <div className={styles.img}>
        <img src={img} alt="" />
      </div>
      <div className={styles.info_container}>
        <div className={styles.info}>
          <RecipeInfoElement title={'Preparation'} info={`${preparationTime} minutes`} />
          <RecipeInfoElement title={'Cooking'} info={`${cookingTime} minutes`} />
          <RecipeInfoElement title={'Total'} info={`${totalTime} minutes`} />
          <RecipeInfoElement title={'Likes'} info={`${likes}`} />
          <RecipeInfoElement title={'Servings'} info={`${serving} servings`} />
          <RecipeInfoElement title={'Ratings'} info={`${rating}`} />
        </div>
      </div>
    </div>
  );
};

export default RecipeInfo;
