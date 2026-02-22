import React from 'react';
import { Link } from 'react-router-dom';
import Text from 'components/Text';
import styles from './RecipeHeader.module.scss';

const RecipeHeader: React.FC = () => {
  return (
    <div className={styles.resipeHeader}>
      <Link to={`/`} style={{ textDecoration: 'none' }}>
        <div className={styles.back}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
              stroke="#B5460F"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Link>
      <Text className={styles.title}>Pancake Breakfast Casserole</Text>
    </div>
  );
};

export default RecipeHeader;
