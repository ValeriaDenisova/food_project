import { runInAction } from 'mobx';
import { resipes } from 'store/RecipeStore';

export default class ScrollStore {
  hasMore: boolean = true;
  isArray: boolean = false;
  load: boolean = false;
  readonly PAGE_SIZE: number = 9;
  readonly BOTTOM: number = 50;
  readonly ARRAY_POSITION = 2500;
  scrollPositionRef: React.RefObject<number>;
  prevScrollTop: number = 0;
  total: number = 0;

  constructor(scrollPositionRef: React.RefObject<number>) {
    this.scrollPositionRef = scrollPositionRef;
    window.addEventListener('scroll', () => this.handleScroll());
  }

  loadMore = () => {
    runInAction(() => {
      if (this.load || !this.hasMore) return;

      this.scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;

      this.load = true;
      resipes.setPageSize(resipes.getPageSize + this.PAGE_SIZE);

      if (resipes.getPageSize > this.total && this.total > 0) {
        this.hasMore = false;
      }
      this.loadNew();
    });
  };

  handleScroll = () => {
    runInAction(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > this.prevScrollTop) {
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.offsetHeight;

        if (scrollTop + windowHeight >= fullHeight - this.BOTTOM) {
          this.total = resipes.total && resipes.total > 0 ? resipes.total : this.total;
          if (!(resipes.getPageSize > this.total && this.total > 0)) {
            this.hasMore = true;
          }
          this.loadMore();
        }
      }
      this.prevScrollTop = scrollTop;
    });
  };

  loadNew = () => {
    runInAction(() => {
      if (this.load) {
        const timeout = setTimeout(() => {
          this.load = false;
        }, 500);
        return () => clearTimeout(timeout);
      }
    });
  };

  destroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
