import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { normalizeCategories, type CategoriesApi, type Categories } from 'entities/api/Categories';
import ApiStore from 'store/ApiStore';
import { api } from 'store/ApiStore/ApiStore';

export default class CategoriesStore {
  categories: CategoriesApi[] = [];
  loading: boolean = false;
  error: string | null = null;

  private api: ApiStore;

  constructor() {
    makeAutoObservable(this);
    this.api = api;
    this.fetchRecipes();
  }

  async fetchRecipes() {
    runInAction(() => {
      this.categories = [];
      this.loading = true;
      this.error = null;
    });

    try {
      const response = await this.api.request<{ data: CategoriesApi[] }>({
        method: 'GET',
        endpoint: `/meal-categories`,
        headers: {},
        data: {},
      });

      if (response.success) {
        runInAction(() => {
          this.categories = normalizeCategories(response.data.data);
        });
      } else {
        runInAction(() => {
          this.error = `Ошибка: статус ${response.status}`;
        });
      }
    } catch {
      runInAction(() => {
        this.error = 'Ошибка при получении рецептов';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  get cleanCategories(): Categories[] {
    return toJS(this.categories);
  }

  get categoriesLoader(): boolean {
    return toJS(this.loading);
  }
}

export const categories = new CategoriesStore();
