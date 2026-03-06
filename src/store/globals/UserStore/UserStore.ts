import { runInAction, makeAutoObservable } from 'mobx';
import type { IRootStore } from '../root/RootStore';

export default class UserStore {
  token: string | null;
  username: string | undefined = undefined;

  private _rootStore: IRootStore;

  constructor(root: IRootStore) {
    makeAutoObservable(this);
    this.token = localStorage.getItem('token');
    this._rootStore = root;
  }

  async entrance(login?: string, password?: string) {
    await this._rootStore.singInToStore.fetchRecipes({ identifier: login, password });
    runInAction(() => {
      const user = this._rootStore.singInToStore.cleanSingInToUser;
      this.token = user?.jwt ?? null;
      this.username = user?.user.username;
      if (this.token) localStorage.setItem('token', this.token);
    });
  }

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
    return typeof this._rootStore.singInToStore.cleanSingInToError == 'string';
  }
}
