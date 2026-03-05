import { makeAutoObservable, toJS, runInAction, reaction } from 'mobx';
import { normalizeRecipeInfo, type RecipeInfoApi, type RecipeInfo } from 'entities/api/RecipeInfo';
import { rootStore, RootStore } from 'store/globals/root/RootStore';
import { favorites } from 'store/globals/FavoritesStore';
import type { ILocalStore } from 'entities/ILocalStore';

export default class RecipeInfoStore implements ILocalStore {
  recipeInfo: RecipeInfo | null = null;
  loading: boolean = false;
  error: string | null = null;
  id: string | undefined;

  private _rootStore: RootStore;

  private _isDestroyed = false;

  constructor(id: string | undefined) {
    makeAutoObservable(this);
    this._rootStore = rootStore;
    this.id = id;
    reaction(
      () => this.id,
      (newId, previousId) => {
        if (newId !== previousId) {
          this.fetchRecipes();
        }
      }
    );

    this.fetchRecipes();
  }

  private resetState() {
    this.recipeInfo = null;
    this.loading = false;
    this.error = null;
  }

  destroy(): void {
    this._isDestroyed = true;
    this.resetState();
  }

  async fetchRecipes() {
    if (this._isDestroyed) return;
    runInAction(() => {
      this.recipeInfo = null;
      this.loading = true;
      this.error = null;
    });

    try {
      const response = await this._rootStore.api.request<{ data: RecipeInfoApi }>({
        method: 'GET',
        endpoint: `/recipes/${this.id}`,
        headers: {},
        data: { populate: ['images', 'ingradients', 'equipments', 'directions'] },
      });

      if (response.success) {
        runInAction(() => {
          this.recipeInfo = normalizeRecipeInfo(response.data.data);
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

  get cleanRecipeInfo(): RecipeInfo | null {
    return toJS(this.recipeInfo);
  }

  get cleanLoading(): boolean {
    return this.loading;
  }

  get isFavorite(): boolean {
    return favorites.cleanRecipes.some((item) => item.documentId === this.id);
  }
}
