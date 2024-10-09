import { UpdateFunc } from './event-manager-types';

export default class EventManager {
  private listeners = new Set<UpdateFunc>();

  public subscribe(listener: UpdateFunc): void {
    this.listeners.add(listener);
  }

  public unsubscribe(listener: UpdateFunc): void {
    this.listeners.delete(listener);
  }

  public notify(level: number, round: number): void {
    Array.from(this.listeners.keys()).forEach((listener) => listener(level, round));
  }
}
