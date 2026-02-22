export interface UseProductInfoParams {
  populate: string | string[];
}

export interface ProductInfoType {
  data: {
    cookingTime: number;
    preparationTime: number;
    totalTime: number;
    likes: number;
    servings: number;
    rating: number;
    summary: string;
    images: {
      url: string;
    }[];

    ingradients: {
      id: number;
      name: string;
      amount: number;
    }[];

    equipments: {
      id: number;
      name: string;
    }[];

    directions: {
      id: number;
      description: string;
    }[];
  };
}

export interface UseProductInfoResult {
  product: ProductInfoType | null;
  loading: boolean;
  error: string | null;
}
