import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import Card from 'components/Card';
import styles from './Products.module.scss';
import type { Product } from '../../../../../hooks/useProducts/type';

interface ProductsProps {
  data: Product[];
}

const Products: React.FC<ProductsProps> = ({ data }) => {
  return (
    <div className={styles.ProductsElements}>
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
              contentSlot={<p className={styles.slot}>{item.calories} kcal</p>}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Products;
