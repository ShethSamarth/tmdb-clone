import {action, makeAutoObservable, observable} from 'mobx';

import {TvShow} from '../../types';

export interface TvViewAllStoreType {
  data: TvShow[];
  pageTitle: string | null;
  setData: (value: TvShow[]) => void;
  setPageTitle: (value: string | null) => void;
}

class TvViewAllStore implements TvViewAllStoreType {
  @observable data: TvShow[] = [];
  @observable pageTitle: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setData = (value: TvShow[]): void => {
    this.data = value;
  };

  @action
  setPageTitle = (value: string | null): void => {
    this.pageTitle = value;
  };
}

export default new TvViewAllStore();
