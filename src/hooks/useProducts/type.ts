export interface UseProductsParams {
  sort?: string;
  pagination?: {
    withCount?: boolean;
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  fields?: string[];
  populate?: string | string[];
  filters?: Record<string, any>;
  locale?: string;
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  summary: string;
  calories: number;
  images: {
    url: string;
  }[];
}

export interface UseProductsResult {
  data: Product[] | null;
  totalPage?: number;
  loading: boolean;
  error: string | null;
}
