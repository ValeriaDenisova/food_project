import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import Text from 'components/Text';
import array from 'components/icons/recipe_header.svg';
import Button from 'components/Button';
import s from './RecipeHeader.module.scss';
import { useRecipeHeader } from './useRecipeHeader';



interface  RecipeHeaderProps{
  id?: number;
  loading: boolean;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = observer(({id, loading}) => {
    const {
        token,
        exists,
        handleAdd,
        handleDelete,
        setExists,
        favoritesData
      } = useRecipeHeader({id})

  useEffect(() => {
    setExists(favoritesData.some(item => item.id === id));
  }, [favoritesData, id]);

  return (
    <div className={s.resipeHeader}>
      <div className={s.resipeHeader__left}>
        <Link to={`/`} style={{ textDecoration: 'none' }}>
          <div className={s.back}>
            <img src={array} alt=""/>
          </div>
        </Link>
        <Text className={s.title}>Pancake Breakfast Casserole</Text>
      </div>
      {!loading && token && !exists && <Button className={s.resipeHeader__button} onClick={handleAdd}>Add to Favorites</Button>}
      {!loading && token && exists && <Button className={s.resipeHeader__button} onClick={handleDelete}>Delete to Favorites</Button>}
    </div>

  );
});

export default React.memo(RecipeHeader);
