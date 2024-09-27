// @ts-nocheck
import {MMKVLoader} from 'react-native-mmkv-storage';
import {action, makeAutoObservable, observable} from 'mobx';
import {configurePersistable, makePersistable} from 'mobx-persist-store';

const storage = new MMKVLoader().initialize();

configurePersistable({
  storage: {
    setItem: (key, data) => storage.setString(key, data),
    getItem: key => storage.getString(key),
    removeItem: key => storage.removeItem(key),
  },
});

export interface AuthStoreType {
  loggedIn: boolean;
  isGuest: boolean;
  session_id: string | null;
  guest_session_id: string | null;
  expires_at: string | null;
  setLoggedIn: (loggedIn: boolean) => void;
  setIsGuest: (isGuest: boolean) => void;
  setSessionId: (session_id: string | null) => void;
  setGuestSessionId: (guest_session_id: string | null) => void;
  setExpiresAt: (expires_at: string | null) => void;
}

class AuthStore implements AuthStoreType {
  @observable loggedIn = false;
  @observable isGuest = false;
  @observable session_id: string | null = null;
  @observable guest_session_id: string | null = null;
  @observable expires_at: string | null = null;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'AuthStore',
      properties: [
        'loggedIn',
        'isGuest',
        'session_id',
        'guest_session_id',
        'expires_at',
      ],
    });
  }

  @action
  setLoggedIn = (value: boolean): void => {
    this.loggedIn = value;
  };

  @action
  setIsGuest = (value: boolean): void => {
    this.isGuest = value;
  };

  @action
  setSessionId = (value: string | null): void => {
    this.session_id = value;
  };

  @action
  setGuestSessionId = (value: string | null): void => {
    this.guest_session_id = value;
  };

  @action
  setExpiresAt = (value: string | null): void => {
    this.expires_at = value;
  };
}

export default new AuthStore();
