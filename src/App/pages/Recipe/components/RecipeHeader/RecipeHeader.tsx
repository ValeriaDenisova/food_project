import React from 'react';
import { Link } from 'react-router-dom';
import Text from 'components/Text';
import array from 'components/icons/recipe_header.svg'
import s from './RecipeHeader.module.scss';

const RecipeHeader: React.FC = () => {
  return (
    <div className={s.resipeHeader}>
      <Link to={`/`} style={{ textDecoration: 'none' }}>
        <div className={s.back}>
          <img src={array} alt=""/>
        </div>
      </Link>
      <Text className={s.title}>Pancake Breakfast Casserole</Text>
    </div>
  );
};

export default React.memo(RecipeHeader);
