import {useState, useCallback } from 'react';
import { useAuth } from 'hooks/useAuth';
import SingInToStore from 'store/SingInToStore';

const singInToStore = new SingInToStore();

export function useHeader(){

    const { token, setToken, username, setUsername } = useAuth();
    
    
      const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
      
      const toggleMenu = useCallback(() => {
        setMenuOpen(prev => !prev);
      },[]);
    
      const [isFavourite, setIsFavourite] = useState<boolean>(false);
    
      const handleFavoriteOpen = useCallback(()=>{
        setIsFavourite(true)
      }, [])
    
      const handleFavoriteClose = useCallback(()=>{
        setIsFavourite(false)
      }, [])
    
      const [isEntrance,setIsEntrance] = useState<boolean>(false);
    
       const handleEntranceOpen = useCallback(()=>{
        setIsEntrance(true)
      }, [])
    
      const handleEntranceClose = useCallback(()=>{
        setIsEntrance(false)
      }, [])
    
    
      const [logitTemporary, setLogitTemporary] = useState<string>('');
      const [passwordTemporary, setPasswordTemporary] = useState<string>('');
      
    
        const handleSingInTo = useCallback(()=>{
          singInToStore.fetchRecipes({
            identifier: logitTemporary, 
            password: passwordTemporary
          })     
        }, [logitTemporary, passwordTemporary])
    
      const user = singInToStore?.cleanSingInToUser;
    

      const error = singInToStore.cleanSingInToError;

      return{
        token,
        username,
        isMenuOpen,
        toggleMenu,
        isFavourite,
        handleFavoriteOpen,
        handleFavoriteClose,
        isEntrance,
        handleEntranceOpen,
        handleEntranceClose,
        setLogitTemporary,
        setPasswordTemporary,
        handleSingInTo,
        error,
        user,
        setToken,
        setUsername
      }
}