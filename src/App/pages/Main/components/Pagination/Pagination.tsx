import React from 'react';
import { getPages } from 'utils/';
import styles from './Pagination.module.scss';

interface PaginationProps {
  numberStarlings: number;
  active: number;
  onPage: (value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ numberStarlings, active, onPage }) => {
  if (numberStarlings <= 1) return <></>;

  const windowWidth: number = window.innerWidth;

  const pages = getPages(numberStarlings, active);
  return (
    <div className={styles.pagination}>
      <div className="arrayLeft" onClick={() => onPage(active > 1 ? active - 1 : active)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="42"
          viewBox="0 0 38 42"
          fill="none"
        >
          <path
            d="M23.12 31.5599L14.4267 22.8666C13.4 21.8399 13.4 20.1599 14.4267 19.1333L23.12 10.4399"
            stroke={active == 1 ? '#AFADB5' : '#151411'}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className={styles.pagination_number}>
        {windowWidth >= 410 ? (
          pages.map((page: number | string, idx: number) => {
            if (page === '...') {
              return (
                <div
                  key={`dots-${idx}`}
                  className={styles.numberPages}
                  style={{ cursor: 'default' }}
                >
                  ...
                </div>
              );
            }
            return (
              <div
                key={page}
                className={active === page ? styles.active : styles.numberPages}
                style={{ cursor: 'pointer' }}
                onClick={() => onPage(typeof page === 'number' ? page : active)}
              >
                {page}
              </div>
            );
          })
        ) : (
          <div
            className={styles.active}
            style={{ cursor: 'pointer' }}
            onClick={() => onPage(active)}
          >
            {active}
          </div>
        )}
      </div>

      <div
        className="arrayRight"
        onClick={() => onPage(active < numberStarlings ? active + 1 : active)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="42"
          viewBox="0 0 38 42"
          fill="none"
        >
          <path
            d="M14.88 31.5599L23.5733 22.8666C24.6 21.8399 24.6 20.1599 23.5733 19.1333L14.88 10.4399"
            stroke={active == numberStarlings ? '#AFADB5' : '#151411'}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Pagination;
