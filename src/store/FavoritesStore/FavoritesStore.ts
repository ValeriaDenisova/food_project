import { makeAutoObservable, toJS,  runInAction } from 'mobx';
import { normalizeFavorites, type FavoritesApi, type FavoritesModel } from 'store/models/api/Favorites';
import { API_BASE_URL } from 'config/apiConfig'; 
import ApiStore from 'store/ApiStore'; 

export default class FavoritesStore{

    recipes: FavoritesModel[] = [];
    loading: boolean = false;
    error: string | null = null;
    
    private api: ApiStore;

    constructor() {
        makeAutoObservable(this);
        this.api = new ApiStore(API_BASE_URL);
    }

    async fetchRecipes(token: string | null | undefined) {
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
                'Authorization': `Bearer ${token}`,
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
    
        get cleanRecipes(): FavoritesModel[] {
            return toJS(this.recipes);
        }
        get cleanLoading(): boolean {
            return this.loading;
        }
}