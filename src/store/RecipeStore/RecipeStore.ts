import { makeAutoObservable, toJS,  runInAction  } from 'mobx';
import { normalizeRecipe, type RecipeApi, type RecipeModel, type RecipeParams } from "store/models/api/Recipe";
import { API_BASE_URL } from 'config/apiConfig'; 
import ApiStore from 'store/ApiStore'; 


export default class RecipeStore{
    
    recipes: RecipeModel[] = [];
    loading: boolean = false;
    error: string | null = null;
    totalPage: number|undefined;

    private api: ApiStore;

    constructor() {
        makeAutoObservable(this);
        this.api = new ApiStore(API_BASE_URL);
    }


        async fetchRecipes(params: Partial<RecipeParams>) {
        runInAction(() => {
            this.loading = true;
            this.error = null;
            this.recipes = [];
            this.totalPage = 0; 
          });

        

        try {
        const response = await this.api.request<{ data: RecipeApi[]; meta: { pagination: { total: number } } }>({
            method: 'GET',
            endpoint: '/recipes',
            headers: {},
            data: params,
        });

        if (response.success) {
            runInAction(() => {
                this.recipes = normalizeRecipe(response.data.data);
                this.totalPage = response.data.meta?.pagination?.total;
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

    get cleanRecipes(): RecipeModel[] {
        return toJS(this.recipes);
    }

    get cleanRecipesLoading(): boolean {
        return this.loading;
    }
    
}

