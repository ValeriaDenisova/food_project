import React, {useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import MainHeader from './components/MainHeader';
import Recipes from './components/Recipes';
import s from './Main.module.scss';
import { useMain } from './useMain';


const Main: React.FC = observer(() => {
  const {
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
      } = useMain();

      useEffect(()=>{
        const keys = categoriesFilter.map((option) => option.key);
        setFiltersCategoryParam(keys);
      }, [categoriesFilter])

        useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const categoriesJSON = params.get('category');
      if (categoriesJSON) {
        try {
          const categoriesFromUrl = JSON.parse(decodeURIComponent(categoriesJSON));
          setCategoriesFilter(categoriesFromUrl);
          setCheckCategory(true);
        } catch (e) {
          console.error('Ошибка при разборе категорий из URL', e);
        }
      }else{
        setCheckCategory(true);
      }
    }, []);

  return (
    <>
      <MainHeader />
      <div className="wrapper">
        <div className={s.main}>
          <Recipes
            numberStarlings={total ?? 1}
            page={page}
            onPage={setPage}
            data={data}
            onSearch={setTemporarySearch}
            categories={categories}
            onChange={setCategoriesFilter}
            onTitle={handleTitle}
            isOpenCategory={isOpenCategory}
            onOpenCategory={setOpenCategory}
            searchValue={temporarySearch}
            categoriesFilter={categoriesFilter}
            onSearchClick={setSearch}
            loadingRecipes={loadingRecipe}
            pageSize={pageSize}
            onPageSize={setPageSize}
            total={total}
            isArray={ isArray}
            onArray={handleArray}
          />
        </div>
      </div>
    </>
  );
});

export default React.memo(Main);
