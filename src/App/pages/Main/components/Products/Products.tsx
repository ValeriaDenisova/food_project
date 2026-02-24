import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import Card from 'components/Card';
import type { Product } from '../../../../../hooks/useProducts/type';
import s from './Products.module.scss';

interface ProductsProps {
  data: Product[];
}

const Products: React.FC<ProductsProps> = ({ data }) => {
  return (
    <div className={s.ProductsElements}>
      {data?.map((item, index) => {
        const cleanedSummary = item.summary
          .replace(/<a[^>]*>(.*?)<\/a>/g, '<span>$1</span>')
          .replace(/<p[^>]*>(.*?)<\/p>/g, '<div>$1</div>');

        const cleanedName = item.name.replace(/<p[^>]*>(.*?)<\/p>/g, '<span>$1</span>');

        return (
          <Link key={index} to={`/${item.documentId}`} style={{ textDecoration: 'none' }}>
            <Card
              image={item.images[0].url}
              title={parse(cleanedName)}
              subtitle={parse(cleanedSummary)}
              contentSlot={<p className={s.slot}>{item.calories} kcal</p>}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default React.memo(Products);
