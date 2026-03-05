import ApiStore from 'store/globals/ApiStore';
import UserStore from 'store/globals/UserStore';
import FavoritesStore from 'store/globals/FavoritesStore';
import CategoriesStore from 'store/globals/CategoriesStore';
import RecipeStore from 'store/globals/RecipeStore';
import SingInToStore from 'store/globals/SingInToStore';
import { initStoreContext } from 'utils/initStoreContext';
import { API_BASE_URL } from 'config/apiConfig';

export class RootStore {
  readonly api: ApiStore;
  readonly user: UserStore;
  readonly favorites: FavoritesStore;
  readonly categories: CategoriesStore;
  readonly resipes: RecipeStore;
  readonly singInToStore: SingInToStore;

  constructor() {
    this.api = new ApiStore(API_BASE_URL);
    this.user = new UserStore(this);
    this.favorites = new FavoritesStore();
    this.categories = new CategoriesStore(this);
    this.resipes = new RecipeStore(this);
    this.singInToStore = new SingInToStore(this);
  }
}

export type IRootStore = RootStore;

export const {
  store: rootStore,
  StoreProvider: RootStoreProvider,
  useStoreContext: useRootStore,
} = initStoreContext(() => new RootStore(), 'rootStore');
