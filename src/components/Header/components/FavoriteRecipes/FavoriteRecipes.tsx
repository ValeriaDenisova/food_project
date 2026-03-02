import React from 'react';
import { observer } from 'mobx-react-lite';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import Card from 'components/Card';
import Text from 'components/Text';
import { useFavorives } from 'hooks/useFavorites';
import Loader from 'components/Loader';
import s from './FavoriteRecipes.module.scss';


interface FavoriteRecipesProps{
    token: string | null | undefined;
    onFavoriteClose: ()=> void;
}

const FavoriteRecipes: React.FC<FavoriteRecipesProps> = observer(({token, onFavoriteClose}) => { 
  const {favoritesData, loading} = useFavorives();

    return(
    <>
        {loading && <div className={s.loader}><Loader className={s.loader__svg}/></div>}
        {!loading && !token && <div className={s.favorite__text}>
            <Text>Log in to your account</Text>
            </div>}
        {!loading && token &&<div className={s.favoriteRecipes}>
            {favoritesData.map((item)=>{


        const cleanedSummary = item.summary
          .replace(/<a[^>]*>(.*?)<\/a>/g, '<span>$1</span>')
         .replace(/<p[^>]*>(.*?)<\/p>/g, '<div>$1</div>');

          return(
              <Link key={item.documentId} to={`/${item.documentId}`} style={{ textDecoration: 'none' } } onClick={onFavoriteClose}>
                <Card
                  image={item.images }
                  title={item.name}
                  subtitle={parse(cleanedSummary)}
                  contentSlot={<p className={s.slot}>{item.calories} kcal</p>}
                />
              </Link>
        )})}
        </div>}
    </>
    )
})

export default React.memo(FavoriteRecipes);