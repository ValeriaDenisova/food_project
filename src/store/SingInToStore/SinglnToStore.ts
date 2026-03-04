import { makeAutoObservable, runInAction, toJS } from 'mobx';
import {
  normalizeSingInTo,
  type SingInToApi,
  type SingInToHead,
  type SingInTo,
} from 'entities/api/SingInTo';
import { API_BASE_URL } from 'config/apiConfig';
import ApiStore from 'store/ApiStore';

export default class SingInToStore {
  data: SingInTo | null = null;
  loading: boolean = false;
  error: string | null = null;

  private api: ApiStore;

  constructor() {
    makeAutoObservable(this);
    this.api = new ApiStore(API_BASE_URL);
  }

  async fetchRecipes(head: Partial<SingInToHead>) {
    runInAction(() => {
      this.loading = true;
      this.error = null;
      this.data = null;
    });

    try {
      const response = await this.api.request<SingInToApi>({
        method: 'POST',
        endpoint: '/auth/local',
        headers: {},
        data: head,
      });

      if (response.success) {
        runInAction(() => {
          this.data = normalizeSingInTo(response.data);
        });
      } else {
        runInAction(() => {
          this.error = `Ошибка: статус ${response.status}`;
        });
      }
    } catch {
      runInAction(() => {
        this.error = 'Ошибка при авторизации';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  get cleanSingInToUser(): SingInTo | null {
    return toJS(this.data);
  }

  get cleanSingInToError(): string | null {
    return this.error;
  }
}
