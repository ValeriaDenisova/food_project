import React from 'react';
import Subtitle from '../Subtitle';
import Filter from '../Filter';
import Products from '../Products';
import styles from './Recipes.module.scss';
import Pagination from '../Pagination';
import type { Product } from '../../../../../hooks/useProducts/type';

interface RecipesProps {
  numberStarlings: number;
  page: number;
  onPage: (value: number) => void;
  data: Product[];
}

const Recipes: React.FC<RecipesProps> = ({ numberStarlings, page, onPage, data }) => {
  return (
    <div className={styles.recipes}>
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

export default Recipes;
