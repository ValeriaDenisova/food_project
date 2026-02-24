import React from 'react';
import { getPages } from 'utils/';
import leftBlock from 'components/icons/left_gray.svg';
import left from 'components/icons/left_black.svg';
import rightBlock from 'components/icons/right_gray.svg';
import right from 'components/icons/right_black.svg';
import s from './Pagination.module.scss';

interface PaginationProps {
  numberStarlings: number;
  active: number;
  onPage: (value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ numberStarlings, active, onPage }) => {
  if (numberStarlings <= 1) return <></>;

  const pages = getPages(numberStarlings, active);
  
  return (
    <div className={s.pagination}>
      <div className="arrayLeft" onClick={() => onPage(active > 1 ? active - 1 : active)}>
        {active == 1 ? (<img src={leftBlock} alt=""/>) : (<img src={left} alt=""/>)}
      </div>
      <div className={s.pagination__number}>
        {pages.map((page: number | string, idx: number) => {
          if (page === '...') {
            return (
              <div
                key={`dots-${idx}`}
                className={s.numberPages}
                style={{ cursor: 'default' }}
              >
                ...
              </div>
            );
          }
          return (
            <div
              key={page}
              className={active === page ? s.active : s.numberPages}
              style={{ cursor: 'pointer' }}
              onClick={() => onPage(typeof page === 'number' ? page : active)}
            >
              {page}
            </div>
          );
        })}
      </div>

      <div
        className="arrayRight"
        onClick={() => onPage(active < numberStarlings ? active + 1 : active)}
      >
        {active == numberStarlings ? (<img src={rightBlock} alt=''/>) : (<img src={right} alt=""/>)}
      </div>
    </div>
  );
};

export default React.memo(Pagination);
