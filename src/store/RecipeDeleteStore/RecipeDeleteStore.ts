import { makeAutoObservable, runInAction } from 'mobx';
import { API_BASE_URL } from 'config/apiConfig'; 
import ApiStore from 'store/ApiStore'; 

export default class RecipeDeleteStore{
    result: boolean = false;
    loading: boolean = false;
    error: string | null = null;

    private api: ApiStore;

    constructor() {
        makeAutoObservable(this);
        this.api = new ApiStore(API_BASE_URL);
    }

     async fetchRecipes(id: number ) {
    
            runInAction(() => {
                this.result = false;
                this.loading = true;
                this.error = null;
             });
    
            try {
                const response = await this.api.request({
                    method: 'POST',
                    endpoint: `/favorites/remove`,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: {recipe: id},
            });
    
             if (response.success) {
                runInAction(() => {
                    this.result = true;
                });
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
}