import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import parse from 'html-react-parser';
import RecipeHeader from './components/RecipeHeader';
import RecipeInfo from './components/RecipeInfo';
import RecipeDescription from './components/RecipeDescription';
import IngredientsEquipment from './components/IngredientsEquipment';
import Directions from './components/Directions';
import Loader from 'components/Loader';
import RecipeInfoStore from 'store/RecipeInfoStore';
import s from './Recipe.module.scss';

const Recipe: React.FC = observer(() => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [info, setInfo] = useState(() => new RecipeInfoStore(id));

  useEffect(() => {
    const newStore = new RecipeInfoStore(id);
    setInfo(newStore);
  }, [id]);

  return (
    <div className="wrapper">
      {info.cleanLoading && (
        <div className={s.loader}>
          <Loader className={s.loader__svg} />
        </div>
      )}
      {!info.cleanLoading && (
        <div className={s.recipe}>
          <RecipeHeader loading={info.cleanLoading} />
          <div className={s.recipe__content}>
            {info.cleanRecipeInfo && (
              <RecipeInfo
                cookingTime={info.cleanRecipeInfo.cookingTime}
                preparationTime={info.cleanRecipeInfo.preparationTime}
                totalTime={info.cleanRecipeInfo.totalTime}
                likes={info.cleanRecipeInfo.likes}
                serving={info.cleanRecipeInfo.servings}
                rating={info.cleanRecipeInfo.rating}
                img={info.cleanRecipeInfo.images}
              />
            )}
            {info.cleanRecipeInfo && (
              <RecipeDescription text={parse(info.cleanRecipeInfo.summary)} />
            )}
            {info.cleanRecipeInfo && (
              <IngredientsEquipment
                ingradients={info.cleanRecipeInfo.ingradients}
                equipments={info.cleanRecipeInfo.equipments}
              />
            )}
            {info.cleanRecipeInfo && <Directions directions={info.cleanRecipeInfo.directions} />}
          </div>
        </div>
      )}
    </div>
  );
});

export default React.memo(Recipe);
