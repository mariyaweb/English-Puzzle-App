import LoginEventManager from '../event-manager/login-event-manager';
import { IUserData } from './state-types';

export default class State {
  public userData: IUserData | null;

  public eventManager: LoginEventManager;

  constructor() {
    this.userData = null;
    this.loadState();
    this.eventManager = new LoginEventManager();
  }

  private loadState(): void {
    const data = localStorage.getItem('user');
    this.userData = data ? JSON.parse(data) : null;
  }

  public isLogged(): boolean {
    this.loadState();
    const res = !!this.userData;
    this.eventManager.notify(res);
    return res;
  }
}
