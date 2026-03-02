import { useCallback, useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import RecipeAddStore from 'store/RecipeAddStore';
import RecipeDeleteStore from 'store/RecipeDeleteStore';
import { useFavorives } from 'hooks/useFavorites';

interface useRecipeHeaderProps{
    id?: number;
}

const recipeAddStore = new RecipeAddStore();
const recipeDeleteStore = new RecipeDeleteStore();


export function useRecipeHeader({id} : useRecipeHeaderProps){

  const { token } = useAuth();
    
    const {favoritesData} = useFavorives();
    
      const [exists, setExists] = useState<boolean>()
    
    
      const handleAdd = useCallback(()=>{
        if(id){
          recipeAddStore.fetchRecipes(id);
          setExists(true);
        }
      },[recipeAddStore, id])
    
    
      const handleDelete = useCallback(()=>{
        if(id){
          recipeDeleteStore.fetchRecipes(id);
          setExists(false);
        }
      },[recipeDeleteStore, id])

      return{
        token,
        exists,
        handleAdd,
        handleDelete,
        setExists,
        favoritesData

      }
}