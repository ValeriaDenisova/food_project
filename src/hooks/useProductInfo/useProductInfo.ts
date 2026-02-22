import axios from 'axios';
import { useState, useEffect } from 'react';
import type { ProductInfoType, UseProductInfoParams, UseProductInfoResult } from './type';

export function useProductsInfo(id?: string): UseProductInfoResult {
  const [product, setProduct] = useState<ProductInfoType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const params: UseProductInfoParams = {
    populate: ['images', 'ingradients', 'equipments', 'directions'],
  };

  useEffect(() => {
    axios
      .get(`https://front-school-strapi.ktsdev.ru/api/recipes/${id}`, { params })
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Error fetching product');
        setLoading(false);
      });
  }, [id]);

  return { product, loading, error };
}
