import { runInAction, makeAutoObservable, toJS, reaction } from 'mobx';
import { normalizeFavorites, type FavoritesApi, type Favorites } from 'entities/api/Favorites';
import { api } from 'store/ApiStore/ApiStore';
import ApiStore from 'store/ApiStore';

export default class FavoritesStore {
  recipes: Favorites[] = [];
  loading: boolean = false;
  error: string | null = null;
  add: boolean = false;
  delete: boolean = false;
  token: string | null = null;

  private api: ApiStore;

  constructor() {
    makeAutoObservable(this);
    this.api = api;
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
      const response = await this.api.request<FavoritesApi[]>({
        method: 'GET',
        endpoint: '/favorites',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
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
      const response = await this.api.request({
        method: 'POST',
        endpoint: `/favorites/add`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
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
      const response = await this.api.request({
        method: 'POST',
        endpoint: `/favorites/remove`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
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
