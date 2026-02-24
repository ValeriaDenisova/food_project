import React from 'react';
import mainImage from './images/main.png';
import recipes from 'components/icons/Recipes.svg'
import s from './MainHeader.module.scss';

const MainHeader: React.FC = () => {
  return (
    <>
      <div className={s.mainHeader}>
        <img className={s.mainHeader__img} src={mainImage} alt="" />
        <div className={s.title}>
          <img className={s.title__svg} src={recipes} alt="" />
        </div>
      </div>
    </>
  );
};

export default React.memo(MainHeader);
