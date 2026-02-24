import React from 'react';
import Subtitle from '../Subtitle';
import Filter from '../Filter';
import Products from '../Products';
import Pagination from '../Pagination';
import type { Product } from '../../../../../hooks/useProducts/type';
import s from './Recipes.module.scss';

interface RecipesProps {
  numberStarlings: number;
  page: number;
  onPage: (value: number) => void;
  data: Product[];
}

const Recipes: React.FC<RecipesProps> = ({ numberStarlings, page, onPage, data }) => {
  return (
    <div className={s.recipes}>
      <Subtitle
        text={
          'Find the perfect food and drink ideas for every occasion, from weeknight dinners to holiday feasts.'
        }
      />
      <Filter />
      <Products data={data} />
      <Pagination numberStarlings={numberStarlings} active={page} onPage={onPage} />
    </div>
  );
};

export default React.memo(Recipes);
