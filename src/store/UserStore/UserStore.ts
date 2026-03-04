import { runInAction, makeAutoObservable } from 'mobx';
import SingInToStore from 'store/SingInToStore';

export default class UserStore {
  token: string | null;
  singInToStore: SingInToStore;
  username: string | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
    this.token = localStorage.getItem('token');
    this.singInToStore = new SingInToStore();
  }

  entrance = async (login?: string, password?: string) => {
    await this.singInToStore.fetchRecipes({ identifier: login, password });
    runInAction(() => {
      const user = this.singInToStore.cleanSingInToUser;
      this.token = user?.jwt ?? null;
      this.username = user?.user.username;
      if (this.token) localStorage.setItem('token', this.token);
    });
  };

  exit = () => {
    this.token = null;
    this.username = undefined;
    localStorage.removeItem('token');
  };

  get hasToken(): boolean {
    return this.token !== null;
  }

  get tokenValue(): string | null {
    return this.token;
  }

  get userName(): string | undefined {
    return this.username;
  }

  get isError(): boolean {
    return typeof this.singInToStore.cleanSingInToError == 'string';
  }
}

export const user = new UserStore();
