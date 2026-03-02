import React from 'react';
import { observer } from 'mobx-react-lite';
import parse from 'html-react-parser';
import RecipeHeader from './components/RecipeHeader';
import RecipeInfo from './components/RecipeInfo';
import RecipeDescription from './components/RecipeDescription';
import IngredientsEquipment from './components/IngredientsEquipment';
import Directions from './components/Directions';
import Loader from 'components/Loader';
import s from './Recipe.module.scss';
import { useRecipe } from './useRecipe';

const Recipe: React.FC = observer(() => {

  const{product, loading} = useRecipe();

  return (
    <div className="wrapper">
      {loading && <div className={s.loader}><Loader className={s.loader__svg}/></div>}
      {!loading &&<div className={s.recipe}>
        <RecipeHeader 
          id={product?.id} 
          loading={loading}
        />
        <div className={s.recipe__content}>
          {product && (
            <RecipeInfo
              cookingTime={product.cookingTime}
              preparationTime={product.preparationTime}
              totalTime={product.totalTime}
              likes={product.likes}
              serving={product.servings}
              rating={product.rating}
              img={product.images}
            />
          )}
          {product && <RecipeDescription text={parse(product.summary)} />}
          {product && (
            <IngredientsEquipment
              ingradients={product.ingradients}
              equipments={product.equipments}
            />
          )}
          {product && <Directions directions={product.directions} />}
        </div>
      </div>}
    </div>
  );
});

export default React.memo(Recipe);
