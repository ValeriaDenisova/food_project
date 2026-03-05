import { runInAction, makeAutoObservable, toJS, reaction } from 'mobx';
import { normalizeFavorites, type FavoritesApi, type Favorites } from 'entities/api/Favorites';
import ApiStore from '../ApiStore';
import { API_BASE_URL } from 'config/apiConfig';

export default class FavoritesStore {
  recipes: Favorites[] = [];
  loading: boolean = false;
  error: string | null = null;
  add: boolean = false;
  delete: boolean = false;
  token: string | null = null;

  private apiWithAuth: ApiStore;

  constructor() {
    makeAutoObservable(this);
    this.apiWithAuth = new ApiStore(API_BASE_URL, () => localStorage.getItem('token'));
    this.token = localStorage.getItem('token');
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          this.fetchRecipes();
        }
      },
      { fireImmediately: true }
    );
  }

  async fetchRecipes() {
    runInAction(() => {
      this.loading = true;
      this.error = null;
      this.recipes = [];
    });

    try {
      const response = await this.apiWithAuth.requestWithAuth<FavoritesApi[]>({
        method: 'GET',
        endpoint: '/favorites',
        data: {},
      });

      if (response.success) {
        runInAction(() => {
          this.recipes = normalizeFavorites(response.data);
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

  async fetchAdd(id: string | undefined) {
    runInAction(() => {
      this.add = false;
      this.loading = true;
      this.error = null;
    });

    try {
      const response = await this.apiWithAuth.requestWithAuth<unknown>({
        method: 'POST',
        endpoint: `/favorites/add`,
        data: { recipe: id },
      });

      if (response.success) {
        runInAction(() => {
          this.add = true;
        });
        await this.fetchRecipes();
      } else {
        runInAction(() => {
          this.error = `Ошибка: статус ${response.status}`;
        });
      }
    } catch {
      runInAction(() => {
        this.error = 'Ошибка при добавлении любимого рецепта';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async fetchDelete(id: string | undefined) {
    runInAction(() => {
      this.delete = false;
      this.loading = true;
      this.error = null;
    });

    try {
      const response = await this.apiWithAuth.requestWithAuth<unknown>({
        method: 'POST',
        endpoint: `/favorites/remove`,
        data: { recipe: id },
      });

      if (response.success) {
        runInAction(() => {
          this.delete = true;
        });
        await this.fetchRecipes();
      } else {
        runInAction(() => {
          this.error = `Ошибка: статус ${response.status}`;
        });
      }
    } catch {
      runInAction(() => {
        this.error = 'Ошибка при удалении любимого рецепта';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  get cleanRecipes(): Favorites[] {
    return toJS(this.recipes);
  }

  get cleanLoading(): boolean {
    return this.loading;
  }
}

export const favorites = new FavoritesStore();
