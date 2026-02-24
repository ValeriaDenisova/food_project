import React from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import RecipeHeader from './components/RecipeHeader';
import RecipeInfo from './components/RecipeInfo';
import RecipeDescription from './components/RecipeDescription';
import IngredientsEquipment from './components/IngredientsEquipment';
import Directions from './components/Directions';
import { useProductsInfo } from 'hooks/useProductInfo/useProductInfo';
import s from './Recipe.module.scss';

const Recipe: React.FC = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { product } = useProductsInfo(id);

  return (
    <div className="wrapper">
      <div className={s.recipe}>
        <RecipeHeader />
        <div className={s.recipe__content}>
          {product && (
            <RecipeInfo
              cookingTime={product.data.cookingTime}
              preparationTime={product.data.preparationTime}
              totalTime={product.data.totalTime}
              likes={product.data.likes}
              serving={product.data.servings}
              rating={product.data.rating}
              img={product.data.images[0].url}
            />
          )}
          {product && <RecipeDescription text={parse(product.data.summary)} />}
          {product && (
            <IngredientsEquipment
              ingradients={product.data.ingradients}
              equipments={product.data.equipments}
            />
          )}
          {product && <Directions directions={product.data.directions} />}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Recipe);
