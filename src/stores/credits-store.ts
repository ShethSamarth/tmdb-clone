import {action, makeAutoObservable, observable} from 'mobx';

import {Cast, Crew} from '../../types';

export interface CreditsStoreType {
  cast: Cast[];
  crew: Crew[];
  setCast: (value: Cast[]) => void;
  setCrew: (value: Crew[]) => void;
}

class CreditsStore implements CreditsStoreType {
  @observable cast: Cast[] = [];
  @observable crew: Crew[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setCast = (value: Cast[]): void => {
    this.cast = value;
  };

  @action
  setCrew = (value: Crew[]): void => {
    this.crew = value;
  };
}

export default new CreditsStore();
