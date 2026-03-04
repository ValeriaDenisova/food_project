import { makeAutoObservable, toJS, runInAction, reaction } from 'mobx';
import { normalizeRecipeInfo, type RecipeInfoApi, type RecipeInfo } from 'entities/api/RecipeInfo';
import { api } from 'store/ApiStore/ApiStore';
import ApiStore from 'store/ApiStore';
import { favorites } from 'store/FavoritesStore';

export default class RecipeInfoStore {
  recipeInfo: RecipeInfo | null = null;
  loading: boolean = false;
  error: string | null = null;
  id: string | undefined;

  private api: ApiStore;

  constructor(id: string | undefined) {
    makeAutoObservable(this);
    this.api = api;
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

  async fetchRecipes() {
    runInAction(() => {
      this.recipeInfo = null;
      this.loading = true;
      this.error = null;
    });

    try {
      const response = await this.api.request<{ data: RecipeInfoApi }>({
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
