import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { API_BASE_URL } from 'config/apiConfig'; 
import { normalizeCategories, type CategoriesApi, type CategoriesModel } from "store/models/api/Categories";
import ApiStore from 'store/ApiStore'; 

export default class CategoriesStore{
    categories: CategoriesApi[] = [];
    loading: boolean = false;
    error: string | null = null;

    private api: ApiStore;

    constructor() {
        makeAutoObservable(this);
        this.api = new ApiStore(API_BASE_URL);
    }

     async fetchRecipes() {
        runInAction(() => {
            this.categories = [];
            this.loading = true;
            this.error = null;
        });

        try {
            const response = await this.api.request<{ data: CategoriesApi[]}>({
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

    get cleanCategories(): CategoriesModel[]{
        return toJS(this.categories);
    }

    get categoriesLoader(): boolean{
        return toJS(this.loading);
    }

}