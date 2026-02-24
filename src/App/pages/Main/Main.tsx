import React, { useState } from 'react';
import { useProducts } from 'hooks/useProducts/useProducts';
import MainHeader from './components/MainHeader';
import Recipes from './components/Recipes';
import s from './Main.module.scss';

const PAGE_SIZE: number = 9;

const Main: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const { data, totalPage } = useProducts({
    pagination: { page: page, pageSize: PAGE_SIZE },
    populate: 'images',
  });

  return (
    <>
      <MainHeader />
      <div className="wrapper">
        <div className={s.main}>
          <Recipes
            numberStarlings={totalPage ? totalPage : 1}
            page={page}
            onPage={setPage}
            data={data ? data : []}
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(Main);
