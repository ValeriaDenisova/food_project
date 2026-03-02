import { useAuth } from 'hooks/useAuth';
import {useEffect} from 'react';
import FavoritesStore from 'store/FavoritesStore';


const favoritesStore = new FavoritesStore();

export function useFavorives(){


   const { token } = useAuth();
  
     useEffect(()=>{
        if(token){
          favoritesStore.fetchRecipes(token);
        }  
      }, [token])
    
      const favoritesData = favoritesStore.cleanRecipes;
      const loading = favoritesStore.cleanLoading;
      return {favoritesData, loading}

}