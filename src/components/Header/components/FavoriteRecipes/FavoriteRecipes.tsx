import React from 'react';
import { observer } from 'mobx-react-lite';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import Card from 'components/Card';
import Text from 'components/Text';
import Loader from 'components/Loader';
import { favorites } from 'store/globals/FavoritesStore';
import { useUserStore } from 'store/hooks/globalStores';
import s from './FavoriteRecipes.module.scss';

interface FavoriteRecipesProps {
  onFavoriteClose: () => void;
}

const FavoriteRecipes: React.FC<FavoriteRecipesProps> = observer(({ onFavoriteClose }) => {
  const user = useUserStore();
  return (
    <>
      {favorites.cleanLoading && (
        <div className={s.loader}>
          <Loader className={s.loader__svg} />
        </div>
      )}
      {!favorites.cleanLoading && !user.hasToken && (
        <div className={s.favorite__text}>
          <Text>Log in to your account</Text>
        </div>
      )}

      {!favorites.cleanLoading && user.hasToken && (
        <div className={s.favoriteRecipes}>
          {favorites.cleanRecipes.map((item) => {
            const cleanedSummary = item.summary
              .replace(/<a[^>]*>(.*?)<\/a>/g, '<span>$1</span>')
              .replace(/<p[^>]*>(.*?)<\/p>/g, '<div>$1</div>');

            return (
              <Link
                key={item.documentId}
                to={`/${item.documentId}`}
                style={{ textDecoration: 'none' }}
                onClick={onFavoriteClose}
              >
                <Card
                  image={item.images}
                  title={item.name}
                  subtitle={parse(cleanedSummary)}
                  contentSlot={<p className={s.slot}>{item.calories} kcal</p>}
                />
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
});

export default FavoriteRecipes;
