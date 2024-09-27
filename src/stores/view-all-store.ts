import {action, makeAutoObservable, observable} from 'mobx';

import {Movie} from '../../types';

export interface ViewAllStoreType {
  data: Movie[];
  pageTitle: string | null;
  setData: (value: Movie[]) => void;
  setPageTitle: (value: string | null) => void;
}

class ViewAllStore implements ViewAllStoreType {
  @observable data: Movie[] = [];
  @observable pageTitle: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setData = (value: Movie[]): void => {
    this.data = value;
  };

  @action
  setPageTitle = (value: string | null): void => {
    this.pageTitle = value;
  };
}

export default new ViewAllStore();
