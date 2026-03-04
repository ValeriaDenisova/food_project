import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Text from 'components/Text';
import array from 'components/icons/recipe_header.svg';
import Button from 'components/Button';
import { favorites } from 'store/FavoritesStore';
import { user } from 'store/UserStore';
import RecipeInfoStore from 'store/RecipeInfoStore';
import s from './RecipeHeader.module.scss';

interface RecipeHeaderProps {
  loading: boolean;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = observer(({ loading }) => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [info, setInfo] = useState(() => new RecipeInfoStore(id));
  useEffect(() => {
    const newStore = new RecipeInfoStore(id);
    setInfo(newStore);
  }, [id]);

  return (
    <div className={s.resipeHeader}>
      <div className={s.resipeHeader__left}>
        <Link to={`/`} style={{ textDecoration: 'none' }}>
          <div className={s.back}>
            <img src={array} alt="" />
          </div>
        </Link>
        <Text className={s.title}>Pancake Breakfast Casserole</Text>
      </div>
      {!loading && user.hasToken && !info.isFavorite && (
        <Button
          className={s.resipeHeader__button}
          onClick={() => {
            favorites.fetchAdd(id);
          }}
        >
          Add to Favorites
        </Button>
      )}
      {!loading && user.hasToken && info.isFavorite && (
        <Button
          className={s.resipeHeader__button}
          onClick={() => {
            favorites.fetchDelete(id);
          }}
        >
          Delete to Favorites
        </Button>
      )}
    </div>
  );
});

export default React.memo(RecipeHeader);
