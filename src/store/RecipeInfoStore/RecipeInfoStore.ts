import { makeAutoObservable, toJS,  runInAction  } from 'mobx';
import { normalizeRecipeInfo, type RecipeInfoApi, type RecipeInfoModel, type RecipeInfoParams } from "store/models/api/RecipeInfo";
import { API_BASE_URL } from 'config/apiConfig'; 
import ApiStore from 'store/ApiStore'; 

export default class RecipeInfoStore{
    recipeInfo: RecipeInfoModel | null = null;
    loading: boolean = false;
    error: string | null = null;

    private api: ApiStore;

    constructor() {
        makeAutoObservable(this);
        this.api = new ApiStore(API_BASE_URL);
    }

    async fetchRecipes(id: string| undefined, params: Partial<RecipeInfoParams>) {

        runInAction(() => {
            this.recipeInfo = null;
            this.loading = true;
            this.error = null;
         });

        try {
            const response = await this.api.request<{ data: RecipeInfoApi}>({
                method: 'GET',
                endpoint: `/recipes/${id}`,
                headers: {},
                data: params,
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

        get cleanRecipeInfo(): RecipeInfoModel | null {
            return toJS(this.recipeInfo);
        }

        get cleanLoading(): boolean {
            return this.loading;
        }
    }
