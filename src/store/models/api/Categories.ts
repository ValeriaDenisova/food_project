export interface CategoriesApi{
    id: number;
    title: string;
}

export interface CategoriesModel{
    id: number;
    title: string;
}


export const normalizeCategories = (from: CategoriesApi[]): CategoriesModel[] => {
   return from.map(item => (
    {
    id: item.id,
    title: item.title
  }));
};