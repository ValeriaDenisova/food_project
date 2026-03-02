import { useState, useEffect, useCallback, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { autorun } from 'mobx';
import RecipeStore from 'store/RecipeStore';
import CategoriesStore from 'store/CategoriesStore';
import type { Option } from 'components/MultiDropdown/MultiDropdown';

const PAGE_SIZE: number = 9;
const BOTTOM: number = 50;
const ARRAY_POSITION = 2500;

const recipeStore = new RecipeStore();
const categoriesStore = new CategoriesStore();

export function useMain(){

      const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);

     const categories = categoriesStore.cleanCategories;
      const params = new URLSearchParams(window.location.search);
    
      const [categoriesFilter, setCategoriesFilter] = useState<Option[]>([]);
    
      const [page, setPage] = useState<number>(1);
      
      const [isOpenCategory, setOpenCategory] = useState<boolean>(false);
      const [filtersCategoryParam, setFiltersCategoryParam] = useState<(number|string)[]>([]);
    
    
      const navigate = useNavigate();
    
    
    
      const [search, setSearch] = useState<string>(() => {
        return params.get('search') || '';
      });
    
      const [temporarySearch, setTemporarySearch] = useState<string>(search)
    
    
      const handleTitle = useCallback((categoriesFilter:Option[])=>{
        if (categoriesFilter.length == 0 ){
          return 'Categories';
        }
        return categoriesFilter.reduce((acc, item)=>{
          return acc + (acc !== '' ? ', ' : '') + item.value 
        }, '')
      }, [categoriesFilter]);
    
    
    
      const [checkCategory, setCheckCategory] = useState<boolean>(false);
  
    
    
      useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (search) {
          params.set('search', search);
        } else {
          params.delete('search'); 
        }
    
        if (categoriesFilter.length > 0) {
          const jsonString = encodeURIComponent(JSON.stringify(categoriesFilter));
          params.set('category', jsonString);
        } else if(checkCategory) {
          params.delete('category');
        }
        navigate(`?${params.toString()}`, { replace: true }); 
      }, [search, navigate, categoriesFilter]);
    
    
    
      useEffect(() => {
          const disposer = autorun(() => {
        if (categoriesStore.categoriesLoader || checkCategory) {
          recipeStore.fetchRecipes({
            pagination: { page: page, pageSize: pageSize },
            populate: 'images',
            filters: {
              category: {
                id: {
                  $eq: filtersCategoryParam,
                },
              },
              name: {
                $containsi: search,
              },
            }
          });
        }
      });
      return () => {
        disposer();
      };
      }, [page, filtersCategoryParam, search, categoriesStore.categoriesLoader, pageSize]);
    
       useEffect(() => {
        categoriesStore.fetchRecipes();
      }, []);
    
      const loadingRecipe = recipeStore.cleanRecipesLoading;

      const total = recipeStore.totalPage ? recipeStore.totalPage : 0;
      const data = recipeStore.cleanRecipes;

      const [load, setLoad] = useState(false);
        const [hasMore, setHasMore] = useState(true);
        const [isArray, setIsArray] = useState<boolean>(false)
      
        const scrollPositionRef = useRef(0);
      
        const loadMore = useCallback(() => {
          if (load || !hasMore) return;
      
          scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
      
      
          setLoad(true);
          setPageSize(pageSize + PAGE_SIZE);
      
          if(pageSize > total-PAGE_SIZE && total>0){
            setHasMore(false)
          }
          
        }, [load, hasMore, pageSize, setPageSize, total, setLoad]);
      
      useEffect(() => {
        if (scrollPositionRef.current !== 0) {
          window.scrollTo({ top: scrollPositionRef.current, behavior: 'auto' });
        }
      }, [data]); 
      
      
      
        const handleScroll = useCallback(() => {
          
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const windowHeight = window.innerHeight;
          const fullHeight = document.documentElement.offsetHeight;
      
          if (scrollTop + windowHeight >= fullHeight - BOTTOM ) {
            loadMore();
          }
        }, [loadMore]);
      
        useEffect(() => {
          window.addEventListener('scroll', handleScroll);
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }, [handleScroll]);
      
          useEffect(() => {
          if (load) {
            const timeout = setTimeout(() => {
              setLoad(false);
            }, 500);
            return () => clearTimeout(timeout);
          }
        }, [load]);
      
        const handleArray = useCallback(()=>{
              setPageSize(PAGE_SIZE);
              window.scrollTo(0, 0);
           setTimeout(() => {
              setHasMore(true);
            }, 1000); 
        }, [setPageSize])
      
        useEffect(() => {
        const handleScroll = () => {
          const scrollPosition = window.scrollY; 
          const triggerPosition = ARRAY_POSITION;
      
          if (scrollPosition > triggerPosition) {
            setIsArray(true);
          } else {
            setIsArray(false);
          }
        };
      
        window.addEventListener('scroll', handleScroll);
        
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
      

      return{
        categories,
        setPage,
        isOpenCategory, 
        setOpenCategory,
        setSearch,
        temporarySearch, 
        setTemporarySearch,
        handleTitle,
        loadingRecipe,
        page,
        setCategoriesFilter,
        categoriesFilter,
        total,
        data,
        setFiltersCategoryParam,
        setCheckCategory,
        setPageSize,
        pageSize,
        isArray,
        handleArray

      }
}