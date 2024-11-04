import { UpdateLoginFunc } from './event-manager-types';

export default class LoginEventManager {
  private listeners = new Set<UpdateLoginFunc>();

  public subscribe(listener: UpdateLoginFunc): void {
    this.listeners.add(listener);
  }

  public unsubscribe(listener: UpdateLoginFunc): void {
    this.listeners.delete(listener);
  }

  public notify(isLogged: boolean): void {
    Array.from(this.listeners.keys()).forEach((listener) => listener(isLogged));
  }
}
