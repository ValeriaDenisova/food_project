import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Product, UseProductsParams, UseProductsResult } from './type';

export function useProducts(params: UseProductsParams): UseProductsResult {
  const [data, setData] = useState<Product[] | null>(null);
  const [totalPage, setTotalPage] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('https://front-school-strapi.ktsdev.ru/api/recipes', { params })
      .then((res) => {
        setData(res.data.data || null);
        setTotalPage(res.data.meta?.pagination?.pageCount);
      })
      .catch((err) => {
        setError(err.message || 'Ошибка при загрузке данных');
        setData(null);
        setTotalPage(undefined);
      })
      .finally(() => setLoading(false));
  }, [JSON.stringify(params)]);
  return { data, totalPage, loading, error };
}
