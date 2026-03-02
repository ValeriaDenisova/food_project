import {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import RecipeInfoStore from 'store/RecipeInfoStore';

const recipeInfoStore = new RecipeInfoStore();

export function useRecipe(){

    const params = useParams<{ id: string }>();
      const id = params.id;
    
    
      const product = recipeInfoStore.cleanRecipeInfo;
      const loading = recipeInfoStore.cleanLoading;
    
       useEffect(() => {
          recipeInfoStore.fetchRecipes(id, {
          populate: ['images', 'ingradients', 'equipments', 'directions'],
        });
        }, [id]);

        return{
            product,
            loading
        }
}