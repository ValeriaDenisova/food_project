import React from 'react';
import Subtitle from '../Subtitle';
import Filter from '../Filter';
import Products from '../Products';
// import Pagination from '../Pagination';
import type { RecipeModel } from 'store/models/api/Recipe';
import type { CategoriesModel } from 'store/models/api/Categories';
import type { Option } from 'components/MultiDropdown/MultiDropdown';
import s from './Recipes.module.scss';



interface RecipesProps {
  numberStarlings: number;
  page: number;
  onPage: (value: number) => void;
  data: RecipeModel[];
  onSearch: (value: string) => void;
  categories: CategoriesModel[];
  onChange: (value: Option[]) => void;
  onTitle: (value: Option[]) => string;
  isOpenCategory: boolean;
  onOpenCategory: (value: boolean) => void;
  searchValue: string;
  categoriesFilter: Option[];
  onSearchClick: (value: string) => void;
  loadingRecipes: boolean;
  pageSize: number;
  onPageSize: (value: number) => void;
  total: number;
  isArray: boolean;
  onArray: () => void;
}

const Recipes: React.FC<RecipesProps> = ({ 
  data, 
  onSearch, 
  categories, 
  onChange, 
  onTitle,
  isOpenCategory,
  onOpenCategory,
  searchValue,
  categoriesFilter,
  onSearchClick,
  loadingRecipes,
  pageSize,
  onPageSize,
  total,
  isArray,
  onArray

}) => {
  return (
    <div className={s.recipes}>
      <Subtitle
        text={
          'Find the perfect food and drink ideas for every occasion, from weeknight dinners to holiday feasts.'
        }
      />
      <Filter 
        onSearch={onSearch} 
        categories={categories} 
        onChange={onChange} 
        onTitle={onTitle}
        isOpenCategory={isOpenCategory}
        onOpenCategory={onOpenCategory}
        searchValue={searchValue}
        categoriesFilter={categoriesFilter}
        onSearchClick={onSearchClick}
      />
      <Products 
        data={data}
        loading={loadingRecipes}
        pageSize={pageSize}
        onPageSize={onPageSize}
        total={total}
        isArray={isArray}
        onArray={onArray}
        />
    </div>
  );
};

export default React.memo(Recipes);
