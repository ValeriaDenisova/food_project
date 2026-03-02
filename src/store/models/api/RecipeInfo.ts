export interface RecipeInfoParams {
  populate: string | string[];
}


export interface RecipeInfoApi {
    id: number;
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
}


export interface RecipeInfoModel {
    id: number;
    cookingTime: number;
    preparationTime: number;
    totalTime: number;
    likes: number;
    servings: number;
    rating: number;
    summary: string;
    images: string;
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
}


export const normalizeRecipeInfo = (from: RecipeInfoApi): RecipeInfoModel => {
   return {
        id: from.id,
        cookingTime: from.cookingTime,
        preparationTime: from.preparationTime,
        totalTime: from.totalTime,
        likes: from.likes,
        servings: from.servings,
        rating: from.rating,
        summary: from.summary,
        images: from.images[0].url,
        ingradients: from.ingradients,
        equipments: from.equipments,
        directions: from.directions
  };
};



