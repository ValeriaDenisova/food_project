import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import parse from 'html-react-parser';
import Card from 'components/Card';
import Text from 'components/Text';
import Loader from 'components/Loader';
import arrayTop from 'components/icons/arrayTop.svg';
import { resipes } from 'store/RecipeStore';
import ScrollStore from 'store/ScrollStore';
import s from './Products.module.scss';

const Products: React.FC = observer(() => {
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    if (scrollPositionRef.current !== 0) {
      window.scrollTo({ top: scrollPositionRef.current, behavior: 'auto' });
    }
  }, [resipes.cleanRecipes]);

  const scrollStoreRef = useRef<ScrollStore | null>(null);

  if (!scrollStoreRef.current) {
    scrollStoreRef.current = new ScrollStore(scrollPositionRef);
  }

  useEffect(() => {
    return () => {
      scrollStoreRef.current?.destroy();
    };
  }, []);

  const [isArray, setIsArray] = useState<boolean>(false);

  const handleArray = useCallback(() => {
    resipes.setPageSize(9);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPosition = 2500;

      if (scrollPosition > triggerPosition) {
        setIsArray(true);
      } else {
        setIsArray(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`${s.ProductsElements} ${resipes.cleanRecipes.length === 0 || resipes.cleanRecipesLoading ? s.ProductsElementsNull : ''}`}
      >
        {resipes.cleanRecipesLoading && (
          <div className={s.loader}>
            <Loader className={s.loader__svg} />
          </div>
        )}
        {!resipes.cleanRecipesLoading && resipes.cleanRecipes.length === 0 && (
          <Text className={s.recipesNull}>
            According to these parameters, no recipes were found
          </Text>
        )}
        {!resipes.cleanRecipesLoading &&
          resipes.cleanRecipes.map((item, index) => {
            const cleanedSummary = item.summary
              .replace(/<a[^>]*>(.*?)<\/a>/g, '<span>$1</span>')
              .replace(/<p[^>]*>(.*?)<\/p>/g, '<div>$1</div>');
            return (
              <Link key={index} to={`/${item.documentId}`} style={{ textDecoration: 'none' }}>
                <Card
                  image={item.images}
                  title={item.name}
                  subtitle={parse(cleanedSummary)}
                  contentSlot={<p className={s.slot}>{item.calories} kcal</p>}
                />
              </Link>
            );
          })}
        {isArray && (
          <div className={s.arrayTop}>
            <img src={arrayTop} alt="" onClick={handleArray} />
          </div>
        )}
      </div>
    </>
  );
});

export default React.memo(Products);
