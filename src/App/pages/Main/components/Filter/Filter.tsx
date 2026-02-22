import React from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import MultiDropdown from 'components/MultiDropdown';
import styles from './Filter.module.scss';

const Filter: React.FC = () => {
  return (
    <div className={styles.filter}>
      <div className={styles.search}>
        <div className={styles.input}>
          <Input onChange={() => {}} placeholder={'Enter dishes'} width={'100%'} />
        </div>
        <Button search={true}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clipPath="url(#clip0_505_662)">
              <path
                d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_505_662">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Button>
      </div>
      <div className={styles.category}>
        <MultiDropdown
          onChange={() => {}}
          getTitle={() => {
            return 'Categories';
          }}
          options={[
            { key: 'salads', value: 'Salads' },
            { key: 'bakery_products', value: 'Bakery products' },
            { key: 'drinks', value: 'Drinks' },
          ]}
          value={[]}
          afterSlot={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.33563 8.74738L3.66436 7.25256L12 14.662L20.3356 7.25256L21.6644 8.74738L12 17.3379L2.33563 8.74738Z"
                fill="#AFADB5"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default Filter;
